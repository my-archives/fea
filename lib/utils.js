/**
 * utils file
 */
(function (Fea) {
    var TOSTRING = Object.prototype.toString,
        n = 0,
        Utils = {};

    // Empty function
    Utils.NOOP = function () {};

    // Generate unique ID
    Utils.guid = function (prefix) {
        prefix = prefix || 'F';
        return prefix + (n++);
    };

    // Extend Object/Class
    Fea.extend = Utils.extend = function (target, source) {
        for (var k in source) {
            if (source.hasOwnProperty(k)) {
                target[k] = source[k];
            }
        }
        return target;
    };

    Utils.isObject = function (obj) {
        return TOSTRING.call(obj) === '[object Object]';
    };

    Fea.Utils = Utils;

})(Fea);
