/**
 * pagelet
 */
(function (Fea) {
    var guid = Fea.Utils.guid,
        isObject = Fea.Utils.isObject,
        isArray = Fea.Utils.isArray,
        loader = Fea.loader,
        ajax = Fea.ajax;

    function Pagelet(options) {
        this.options = {
            id: options.id || guid('Pagelet'),
            js: options.js || [],
            css: options.css || [],
            content: options.content || null
        };

        this.init();
    }

    Pagelet.prototype = {

        constructor: Pagelet,

        toString: function () {
            return '[object Pagelet]';
        },

        init: function () {
            this.initStorage();
            this.start();
        },

        state: 0,

        start: function () {
            this._loadCSS();
            this._loadContent();
            this.once('pagelet:loadJS', this._loadJS);
        },

        _loadCSS: function () {
            var css = this.options.css, c = isArray(css) ? css : [css], l = c.length, i = 0, o;
            if (l) {
                for (; i < l; i++) {
                    loader(isObject(c[i]) ? c[i] : {
                        url: c[i],
                        type: 'css'
                    });
                }
            }
        },
        
        _loadJS: function () {
            var js = this.options.js, j = isArray(js) ? js : [js], l = j.length, i = 0, o;
            if (l) {
                for (; i < l; i++) {
                    loader(isObject(j[i]) ? j[i] : {
                        url: j[i]
                    });
                }
            }
        },

        _loadContent: function () {
            var p = this,
                c = this.options.content,
                t = isObject(c),
                ele = document.getElementById(this.options.id),
                cb;

            if (t) {
                // ajax load content/template
                cb = c.success;

                c.success = function (data) {
                    cb && cb(data);
                    p.fire('pagelet:loadJS', data);
                };

                ajax(c);
            } else {
                ele.innerHTML = c;
                p.fire('pagelet:loadJS', p._loadJS);
            }
        }

    };

    Fea.extend(Pagelet.prototype, Fea.Eventx.EventTarget.prototype);

    Fea.Pagelet = Pagelet;

})(Fea);
