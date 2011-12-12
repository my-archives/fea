/**
 * define file
 * Define a module
 */
(function (Fea, Module, Storage, Utils) {
    var NOOP = Utils.NOOP,
        modules = Storage.modules,
        hasOwn = Object.prototype.hasOwnProperty;

    function define(name, fn, infos) {
        fn = fn || NOOP;
        infos = infos || {};
        if (hasOwn.call(modules, name)) {
            modules[name].setFn(fn).setInfos(infos);
        } else {
            modules[name] = new Module(name, fn, infos);
        }
        return modules[name];
    }

    Fea.define = define;

})(Fea, Fea.Kernel.Module, Fea.Kernel.Storage, Fea.Utils);
