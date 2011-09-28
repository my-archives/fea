(function (Fea) {
    // https://github.com/ded/domready/blob/master/ready.js
    // http://javascript.nwbox.com/

    var fns = [], fn, f = false,
        doc = document,
        root = doc.documentElement,
        ieHack = root.doScroll,
        domLoaded = 'DOMContentLoaded',
        add = 'addEventListener',
        rem = 'removeEventListener',
        readyStateChange = 'onreadystatechange',
        loaded = /^loade|complete/.test(doc.readyState);

    function start(f) {
        loaded ? f() : fns.push(f);
    }

    function flush(f) {
        loaded = 1;
        while ((f = fns.shift())) {
            f();
        }
    }

    function poll(fn) {
        !function p() {
            try {
                root.doScroll('left');
            } catch (e) {
                return setTimeout(p, 50);
            }
            fn();
        }();
    }

    // for Firefox Chrome Opera
    doc[add] && doc[add](domLoaded, fn = function () {
        doc[rem](domLoaded, fn, f);
        flush();
    }, f);

    // for IE6-8
    ieHack && doc.attachEvent(readyStateChange, (fn = function () {
        if (doc.readyState === 'complete') {
            doc.detachEvent(readyStateChange, fn);
            flush();
        }
    }));

    Fea.domReady = ieHack ? function (fn) {
        (self != top && window.frameElement == null) ? start(fn) : poll(fn);
    } : function (fn) {
        start(fn);
    };

})(Fea);
