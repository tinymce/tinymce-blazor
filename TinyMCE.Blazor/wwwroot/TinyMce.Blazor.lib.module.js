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
      if (!doc.getElementById(state.scriptId)) {
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

const updateTinyVal = (id, val) => {
  if (getTiny() && getTiny().get(id).getContent() !== val) {
    getTiny().get(id).setContent(val);
  }
};

const chunkMap = (() => {
  const map = new Map();
  const next = (streamId, editorId, val, index, size) => {
    const acc = (map.has(streamId) ? map.get(streamId) : "") + val;
    if (index === size) {
      updateTinyVal(editorId, acc);
      map.delete(streamId);
    } else {
      map.set(streamId, acc);
    }
  };
  return {
    push: next
  };
})();

window.tinymceBlazorWrapper = {
  updateMode: (id, disable) => {
    getTiny().get(id).setMode(disable ? 'readonly' : 'design');
  },
  updateValue: (id, streamId, value, index, chunks) => {
    chunkMap.push(streamId, id, value, index, chunks);
  },
  init: (el, blazorConf, dotNetRef) => {
    const chunkSize = 30000;
    const update = (format, content) => {
      const updateFn = format === 'text' ? 'UpdateText' : 'UpdateModel';
      const chunks = Math.floor(content.length / chunkSize) + 1;
      const streamId = (Date.now() % 100000) + '';
      for (let i = 0; i < chunks; i++) {
        const chunk = content.substring(chunkSize * i, chunkSize * (i + 1));
        dotNetRef.invokeMethodAsync(updateFn, streamId, i + 1, chunk, chunks);
      }
    };
    const getJsObj = (objectPath) => {
      const jsConf = (objectPath !== null && typeof objectPath === 'string') ? objectPath.split('.').reduce((acc, current) => {
        return acc !== undefined ? acc[current] : undefined;
      }, window) : undefined;
      return (jsConf !== undefined && typeof jsConf === 'object') ? jsConf : {};
    };
    const tinyConf = { ...getJsObj(blazorConf.jsConf), ...blazorConf.conf };
    tinyConf.inline = blazorConf.inline;
    tinyConf.readonly = blazorConf.disabled;
    tinyConf.target = el;
    tinyConf._setup = tinyConf.setup;
    tinyConf.setup = (editor) => {
      editor.on('init', (e) => {
        // set the initial value on init
        dotNetRef.invokeMethodAsync('GetValue').then(value => {
          editor.setContent(value);
        });
      });
      editor.on('change', (e) => {
        dotNetRef.invokeMethodAsync('OnChange');
      })
      editor.on('input', (e) => {
        dotNetRef.invokeMethodAsync('OnInput');
      })
      editor.on('setcontent', (e) => update('text', editor.getContent({ format: 'text' })));
      editor.on(blazorConf.modelEvents, (e) => {
        update('html', editor.getContent());
        update('text', editor.getContent({ format: 'text' }));
      });
      if (tinyConf._setup && typeof tinyConf._setup === 'function') {
        tinyConf._setup(editor);
      }
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
  },
  destroy: (el, id) => {
    if (getTiny() && getTiny().get(id)) {
      getTiny().get(id).off();
      getTiny().get(id).remove();
    }
  }
}