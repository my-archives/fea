/**
 * pagelet
 */
(function (Fea) {
    var guid = Fea.Utils.guid,
        isObject = Fea.Utils.isObject,
        isArray = Fea.Utils.isArray,
        loader = Fea.loader,
        ajax = Fea.ajax,
        LOADJS = 'pagelet:js',
        LOADCONTENT = 'pagelet:content';

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
            this.once(LOADCONTENT, this._loadContent);
            this.once(LOADJS, this._loadJS);
            this._loadCSS();
        },

        _loadCSS: function () {
            var p = this,
                css = p.options.css,
                c = isArray(css) ? css : [css],
                l = c.length, i = 0, o,
                f = function () {
                    (i === l) && p.fire(LOADCONTENT);
                };
            if (l) {
                for (; i < l; i++) {
                    loader(isObject(c[i]) ? c[i] : {
                        url: c[i],
                        type: 'css',
                        charset: p.options.charset,
                        callback: f
                    });
                }
            } else {
                f();
            }
        },
        
        _loadJS: function () {
            var js = this.options.js, j = isArray(js) ? js : [js], l = j.length, i = 0, o;
            if (l) {
                for (; i < l; i++) {
                    loader(isObject(j[i]) ? j[i] : {
                        url: j[i],
                        charset: this.options.charset
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
                    p.fire(LOADJS);
                    c = null;
                };

                ajax(c);
            } else {
                c && (ele.innerHTML = c);
                p.fire(LOADJS);
            }
        }

    };

    Fea.extend(Pagelet.prototype, Fea.Eventx.EventTarget.prototype);

    Fea.Pagelet = Pagelet;

})(Fea);
