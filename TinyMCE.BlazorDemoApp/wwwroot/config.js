(function () {
  const MyCustomNamespace = {
    config: {
      init_instance_callback: (editor) => {
        console.log('init_instance_callback invoked though JsConfSrc', editor);
      }
    }
  };

  window.MyCustomNamespace = MyCustomNamespace;
})();
