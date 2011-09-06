/**
 * app file
 * The Application core manages modules
 */
(function (Kernel, Storage, Sandbox, define, Utils) {
    var modules = Storage.modules,
        registered = Storage.registered,
        NOOP = Utils.NOOP,
        guid = Utils.guid,
        hasOwn = Object.prototype.hasOwnProperty,
        TOSTRING = Object.prototype.toString;

    /**
     * Application Core
     * @class App
     * @param {Object} config
     */
    function App(config) {
        this.id = guid('A');
    }

    App.prototype = {

        constructor: App,

        toString: function () {
            return '[object App]';
        },

        add: function (name, fn, infos) {
            registered[name] = define(name, fn, infos);
            return this;
        },

        use: function (name, callback) {
            if (!hasOwn.call(registered, name)) {
                throw new Error('The ' + name + ' module is not registered');
            }

            var mod = registered[name];
            if (!mod.started) {
                mod.fn(mod.SDB || new Sandbox(this));
                mod._init(callback || NOOP);
            }
            return this;
        },

        startAll: function (names) {
            var k;
            if (names && TOSTRING.call(names) === '[object Array]') {
                for (k = 0; hasOwn.call(registered, names[k]) && this.start(names[k]); k++) {}
            } else {
                for (k in registered) {
                    this.start(k);
                }
            }
            return this;
        }
    };

    Kernel.App = App;
})(Fea.Kernel, Fea.Kernel.Storage, Fea.Kernel.Sandbox, Fea.Kernel.define, Fea.Utils);
