/**
 * loader
 */
(function (Fea) {
    var doc = document,
        head = doc.getElementsByTagName('head')[0] || doc.documentElement,
        isWebKit = navigator.userAgent.indexOf('AppleWebKit') !== -1,
        urlReg = /\.css(?:\?|$)/i,
        CHARSET = 'UTF-8',
        STag = 'script',
        LTag = 'link',
        CSS = 'css';

    function Loader(options) {
        var obj = {
            charset: CHARSET,
            callback: null
        };

        Fea.extend(obj, options);

        load(obj);
    }

    function load(opts) {
        var isCSS = urlReg.test(opts.url) || opts.type === CSS,
            frag = doc.createDocumentFragment(),
            node = doc.createElement(isCSS ? LTag : STag),
            callback = opts.callback || function() {};

        opts.callback = cb;

        isCSS ? injectCss(node, opts, frag) : injectJs(node, opts, frag);

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

    function injectJs(node, obj, frag) {
        node.src = obj.url;
        node.setAttribute('async', true);
        obj.id && node.setAttribute('id', obj.charset);
        obj.charset && node.setAttribute('charset', obj.charset);
        obj.type && node.setAttribute('type', obj.type);
        obj.callback && scriptOnload(node, obj.callback);

        frag.appendChild(node);
        head.insertBefore(frag, head.firstChild);
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

    function injectCss(node, obj, frag) {
        node.rel = 'stylesheet';
        node.type = 'text/css';
        node.href = obj.url;
        obj.id && node.setAttribute('id', obj.charset);
        obj.charset && node.setAttribute('charset', obj.charset);

        obj.callback && styleOnload(node, obj.callback);

        frag.appendChild(node);
        head.appendChild(frag);
    }

    function styleOnload(node, callback) {
        if (node.attachEvent) { // for IE6-9 and Opera
            node.attachEvent('onload', callback);
        }  else { // polling for Firefox, Chrome
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
                node.sheet && (isLoaded = true);
            } else if (node.sheet) { // for Firefox
                try {
                    node.sheet.cssRules && (isLoaded = true);
                } catch (ex) {
                    if (ex.name === 'NS_ERROR_DOM_SECURITY_ERR') {
                        isLoaded = true;
                    }
                }
            }

            setTimeout(isLoaded ? callback : p, 1);
        };
    }

    Fea.loader = Loader;

})(Fea);
