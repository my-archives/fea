(function (Fea) {
    // https://github.com/ded/domready/blob/master/ready.js
    // http://javascript.nwbox.com/

    var fns = [], fn, f = false,
        ready,
        doc = document,
        root = doc.documentElement,
        ieHack = root.doScroll,
        domLoaded = 'DOMContentLoaded',
        add = 'addEventListener',
        rem = 'removeEventListener',
        readyStateChange = 'onreadystatechage',
        loaded = /^loade|complete/.test(doc.readyState);

    function flush(f) {
        loaded = 1;
        while (f = fns.shift()) {
            f();
        }
    }

    function poll() {
        try {
            root.doScroll('left');
        } catch (e) {
            return setTimeout(poll, 50);
        }
        fn();
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

    Fea.domReady = (ready = ieHack) ? function (fn) {
        (self == top && window.frameElement == null) ?
            poll() : (loaded ? fn() : fns.push(fn));
    } : function (fn) {
        loaded ? fn() : fns.push(fn);
    };

})(Fea);
