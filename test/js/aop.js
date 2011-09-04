var Aop = require('../../lib/aop').Aop,
    Method = Aop.Method,
    Halt = Aop.Halt,
    Prevent = Aop.Prevent,
    AlterArgs = AlterArgs,
    AlterReturn = AlterReturn,
    Advice = Aop.Advice,
    Handler = Aop.Handler;

var appMethod = new Method({
    handle: function () {
        console.log(arguments);
        console.log('hi app')
        return 'hello world';
    }
}, 'handle');

var h = new Handler(appMethod);

h.before(function () {
    console.log('before 1');
});

h.inject(3, function () {
    console.log('before and after');
});

h.exec();
