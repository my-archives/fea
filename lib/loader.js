/**
 * loader
 */
(function (Fea) {
    var doc = document,
        head = doc.getElementsByTagName('head')[0],
        isWebKit = navigator.userAgent.indexOf('AppleWebKit') !== -1,
        urlReg = /\.css(?:\?|$)/i,
        Empty = Fea.Utils.Empty,
        CHARSET = 'UTF-8',
        STag = 'script',
        LTag = 'link',
        CSS = 'css';

    function Loader(options) {
        var obj = {
            charset: CHARSET,
            callback: Empty
        };

        Fea.extend(obj, options);

        load(obj);
    }

    function load(opts) {
        var isCSS = urlReg.test(opts.url) || opts.type === CSS,
            node = document.createElement(isCSS ? LTag : STag),
            callback = opts.callback;

        opts.callback = cb;

        isCSS ? injectCss(node, opts) : injectJs(node, opts);

        function cb() {
            callback();
            if (isCSS) return;

            try {
                // Reduces memory leak.
                if (node.clearAttributes) {
                    node.clearAttributes();
                } else {
                    for (var p in node) delete node[p];
                }
            } catch (x) {}

            head.removeChild(node);
        }
    }

    function isFileReady(readyState) {
        return (!readyState || readyState === 'loaded' || readyState === 'complete');
    }

    function injectJs(node, obj) {
        //node.setAttribute('src', obj.url);
        node.setAttribute('async', true);
        node.src = obj.url;
        obj.id && node.setAttribute('id', obj.charset);
        obj.charset && node.setAttribute('charset', obj.charset);

        scriptOnload(node, obj.callback);

        head.insertBefore(node, head.firstChild);
    }

    function scriptOnload(node, callback, f) {
        if (node.addEventListener) {
            node.addEventListener('load', callback, false);
            node.addEventListener('error', callback, false);
        } else { // for IE6-8
            node.attachEvent('onreadystatechange', f = function () {

                if (isFileReady(node.readyState)) {

                    // handle memory leak in IE
                    node.detachEvent('onreadystatechange', f);
                    callback();
                }
            });
        }
    }

    function injectCss(node, obj) {
        node.rel = 'stylesheet';
        node.type = 'text/css';
        node.href = obj.url;
        obj.id && node.setAttribute('id', obj.charset);
        obj.charset && node.setAttribute('charset', obj.charset);

        styleOnload(node, obj.callback);

        head.appendChild(node);
    }

    function styleOnload(node, callback) {
        if (node.attachEvent) { // for IE6-9 and Opera
            node.attachEvent('onload', callback);
        }  else { // polling for Firefox, Chrome, Safari, only IE has onload for link-tag
            // http://www.zachleat.com/web/load-css-dynamically/
            // http://yearofmoo.com/2011/03/cross-browser-stylesheet-preloading/
            // https://github.com/seajs/seajs/blob/master/src/util-dom.js

            setTimeout(poll(node, callback), 0);
        }
    }

    function poll(node, callback) {
        var isLoaded = false;
        return function p() {
            if (isLoaded) return;

            if (isWebKit) {
                if (node.sheet) {
                    isLoaded = true;
                }
            } else if (node.sheet) { // for Firefox
                try {
                    if (node.sheet.cssRules) {
                        isLoaded = true;
                    }
                } catch (ex) {
                    if (ex.name === 'NS_ERROR_DOM_SECURITY_ERR') {
                        isLoaded = true;
                    }
                }
            }

            if (isLoaded) {
                setTimeout(callback, 1);
            } else {
                setTimeout(p, 1);
            }
        };
    }

    Fea.Loader = Loader;

})(Fea);
