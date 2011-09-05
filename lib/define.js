/**
 * define file
 */
(function (Kernel, Module, modules, Utils) {
    var NOOP = Utils.NOOP,
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

    Kernel.define = define;

})(Fea.Kernel, Fea.Kernel.Module, Fea.Kernel.Storage.modules, Fea.Utils);
