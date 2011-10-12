/**
 * app file
 * The Application core manages modules
 */
(function (Kernel, Storage, Sandbox, define, Utils, BigPipe) {
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
        this.env = config || {};

        this.setBigPipe();
    }

    App.prototype = {

        constructor: App,

        toString: function () {
            return '[object App]';
        },

        setBigPipe: function () {
            this.BigPipe = this.env.BIGPIPE ? new BigPipe({
                encoding: this.env.ENCODING || 'UTF-8'
            }) : null;
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
                mod._init();
            }
            (callback || NOOP).call(mod, mod.SDB, mod);
            return this;
        },

        useAll: function (names) {
            var k;
            if (names && TOSTRING.call(names) === '[object Array]') {
                for (k = 0; hasOwn.call(registered, names[k]) && this.use(names[k]); k++) {}
            } else {
                for (k in registered) {
                    this.use(k);
                }
            }
            return this;
        }
    };

    Kernel.App = App;
})(Fea.Kernel, Fea.Kernel.Storage, Fea.Kernel.Sandbox, Fea.Kernel.define, Fea.Utils, Fea.BigPipe);
