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

window.tinymceBlazorWrapper = {
  updateValue: (id, value) => {
    if (tinymce.get(id).getContent() !== value) {
      tinymce.get(id).setContent(value);
    }
  },
  init: (el, blazorConf, dotNetRef) => {
    const getGlobal = () => (typeof window !== 'undefined' ? window : global);
    const getTiny = () => {
      const global = getGlobal();
      return global && global.tinymce ? global.tinymce : null;
    }
    const getJsObj = (cConf) => {
      const jsConf = window[cConf.jsConf];
      return (jsConf !== null && typeof jsConf === 'object') ? jsConf : {};
    };
    const tinyConf = { ...getJsObj, ...blazorConf.conf };
    if (blazorConf.toolbar !== null) {
      tinyConf.toolbar = blazorConf.toolbar;
    }
    if (blazorConf.plugins !== null) {
      tinyConf.plugins = blazorConf.plugins;
    }
    tinyConf.inline = blazorConf.inline;
    tinyConf.target = el;
    tinyConf.setup = (editor) => {
      dotNetRef.invokeMethodAsync('Ready');
      editor.on('init', (e) => {
        // set the initial value on init
        dotNetRef.invokeMethodAsync('GetValue').then(value => {
          editor.setContent(value);
        });
      });
      editor.on('input change undo redo', (e) => {
        dotNetRef.invokeMethodAsync('UpdateModel', editor.getContent());
      });
    }

    if (getTiny()) {
      getTiny().init(tinyConf);
    } else {
      if (el && el.ownerDocument) {
        // inject tiny here
        console.log('loading src ' + blazorConf.src);
        window.tinymceBlazorLoader.load(el.ownerDocument, blazorConf.src, () => {
          console.log('finished loading');
          getTiny().init(tinyConf);
        });
      }
    }
  }
}