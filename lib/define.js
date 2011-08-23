/**
 * define file
 */
(function (Kernel, Module, modules, Utils) {
    var NOOP = Utils.NOOP;

    function define(name, fn) {
        if (!modules.hasOwnProperty(name)) {
            modules[name] = new Module(name, fn || NOOP);
        }
    }

    Kernel.define = define;
})(Fea.Kernel, Fea.Kernel.Module, Fea.Kernel.Storage.modules, Fea.Utils);
