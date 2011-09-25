/**
 * loader
 */
(function (Fea) {
    var doc = document,
        head = doc.getElementsByTagName('head')[0],
        urlReg = /\.css(?:\?|$)/i;

    function Loader(options) {
         
    }

    function load(url, callback, charset) {
    }

    function isFileReady(readyState) {
        return (!readyState || readyState === 'loaded' || readyState === 'complete');
    }

    function injectJs(obj) {
        var script = doc.createElement('script'),
            done;

        script.src = obj.url;
        script.setAttribute('async', true);
        obj.id && script.setAttribute('id', obj.charset);
        obj.charset && script.setAttribute('charset', obj.charset);

        scriptOnload(script, obj.callback, done);
    }

    function scriptOnload(node, callback, done) {
        if (node.addEventListener) {
            node.addEventListener('load', callback, false);
            node.addEventListener('error', callback, false);
        } else { // for IE6-8
            node.attachEvent('onreadystatechage', function () {

                if (!done && isFileReady(node.readyState)) {
                    done = 1;
                    callback();

                    // handle memory leak in IE
                    node.onreadystatechage = null;
                }
            });
        }
    }

    /*
    function injectCss(obj) {
        var link = doc.createElement('link');

        link.href = obj.url;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        obj.id && script.setAttribute('id', obj.charset);
        obj.charset && script.setAttribute('charset', obj.charset);

        styleOnload(link, obj.callback);
    }

    function styleOnload(node, callback) {
        if (node.attachEvent) { // for IE6-9 and Opera
            node.attachEvent('onload', callback);
        }  else { // polling for Firefox, Chrome, Safari
            setTimeout(function () {
                poll(node, callback);
            }, 0);
        }
    }
    */

    Fea.Loader = Loader;

})(Fea);
