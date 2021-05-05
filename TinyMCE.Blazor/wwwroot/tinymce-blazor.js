console.log('loading js tinymce-blazor');

const CreateScriptLoader = () => {
  let unique = 0;

  const uuid = (prefix) => {
    const time = Date.now();
    const random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
  };
  const state = {
    scriptId: uuid('tiny-script'),
    listeners: [],
    scriptLoaded: false
  };

  const injectScript = (scriptId, doc, url, injectionCallback) => {
    const scriptTag = doc.createElement('script');
    scriptTag.referrerPolicy = 'origin';
    scriptTag.type = 'application/javascript';
    scriptTag.id = scriptId;
    scriptTag.src = url;

    const handler = () => {
      scriptTag.removeEventListener('load', handler);
      injectionCallback();
    };
    scriptTag.addEventListener('load', handler);
    if (doc.head) {
      doc.head.appendChild(scriptTag);
    }
  };

  const load = (doc, url, cb) => {
    if (state.scriptLoaded) {
      cb();
    } else {
      state.listeners.push(cb);
      if (!doc.getElementById(state.sriptId)) {
        injectScript(state.scriptId, doc, url, () => {
          state.listeners.forEach((fn) => fn());
          state.scriptLoaded = true;
        });
      }
    }
  }

  return {
    load
  }
}

if (!window.tinymceBlazorLoader) {
  window.tinymceBlazorLoader = CreateScriptLoader();
}

const getGlobal = () => (typeof window !== 'undefined' ? window : global);

const getTiny = () => {
  const global = getGlobal();
  return global && global.tinymce ? global.tinymce : null;
};

const updateVal = (id, val) => {
  if (getTiny() && getTiny().get(id).getContent() !== val) {
    tinymce.get(id).setContent(val);
  }
};

// Using the JSinterop we can assume the calls are in order, if this changes update the chunkMap impl
const chunkMap = (() => {
  const map = new WeakMap();
  const next = (streamId, edId, index, val, size) => {
    const acc = (map.has(streamId) ? map.get(streamId) : []).push(val);
    if (index === size) {
      updateVal(edId, acc.join(''));
      map.delete(streamId);
    } else {
      map.set(streamId, acc)
    }
  };

  return {
    push: next
  };
})();

window.tinymceBlazorWrapper = {
  updateValue: (id, streamId, value, index, chunks) => {
    console.log('rcvd chunk: ', value, index, chunks);
    chunkMap.push(streamId, id, value, index, chunks);
    
  },
  init: (el, blazorConf, dotNetRef) => {
    const chunkSize = 20;
    const update = (format, content) => {
      const updatefn = format === 'text' ? 'UpdateText' : 'UpdateModel';
      const chunks = Math.floor(content.length / chunkSize) + 1;
      const streamId = (Date.now() % 1000000) + '';
      console.log('chunking: ', content);
      for (let i = 0; i < chunks; i++) {
        const chunk = content.substring(chunkSize * i, chunkSize * (i + 1));
        console.log('sending chunk: ', chunk);
        dotNetRef.invokeMethodAsync(updatefn, streamId, i + 1, chunk, chunks);
      }
    };
    const getJsObj = (objectPath) => {
      const jsConf = (objectPath !== null && typeof objectPath === 'string') ? objectPath.split('.').reduce((acc, current) => {
        return acc !== undefined ? acc[current] : undefined;
      }, window) : undefined;
      return (jsConf !== undefined && typeof jsConf === 'object') ? jsConf : {};
    };
    const tinyConf = { ...getJsObj(blazorConf.jsConf), ...blazorConf.conf };
    console.log('blazor conf: ', blazorConf);
    tinyConf.inline = blazorConf.inline;
    tinyConf.target = el;
    tinyConf.setup = (editor) => {
      dotNetRef.invokeMethodAsync('Ready');
      editor.on('init', (e) => {
        dotNetRef.invokeMethodAsync('GetValue').then(value => {
          editor.setContent(value);
        });
      });
      editor.on(blazorConf.modelEvents, (e) => {
        update('text', editor.getContent({ format: 'text' }));
        update('html', editor.getContent());
        //dotNetRef.invokeMethodAsync('UpdateModel', editor.getContent());
      });
    }

    if (getTiny()) {
      getTiny().init(tinyConf);
    } else {
      if (el && el.ownerDocument) {
        // inject tiny here
        window.tinymceBlazorLoader.load(el.ownerDocument, blazorConf.src, () => {
          getTiny().init(tinyConf);
        });
      }
    }
  }
}