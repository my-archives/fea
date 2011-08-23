/**
 * define file
 */
(function (Kernel, Module, mods, Until) {
    var NOOP = Until.NOOP;

    function define(name, fn) {
        if (!mods.hasOwnProperty(name)) {
            mods[name] = new Module(name, fn || NOOP);
        }
    }

    Kernel.define = define;
})(Fea.Kernel, Fea.Kernel.Module, Fea.Kernel.Storage.mods, Fea.Until);
