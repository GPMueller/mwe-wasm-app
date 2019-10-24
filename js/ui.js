$(document).ready(function()
{
    $('form').attr('onsubmit', 'return false;');
    // var canvas = document.getElementById("webgl-canvas");
    
    Module_Backend().then(function(Module) {
        // window.FS = Module.FS
        // window.backend = new backend(Module, canvas);
        // var version = backend.core.backendVersion();
        Module._print_hi();
        var x = Module._return_x();
        document.getElementById('label-libversion').textContent="Version " + x;
    });
});