var Helpers = require("../lib/index").Helpers;
var EJS = require("ejs");
var assert = require("assert");

EJS.delimiter = "?";

describe.skip("Helpers should transform template content to EJS syntax", function(){
    it("::each helper", function(){
        var raw = '<li ::each="item in items"> <?= item ?> </li>';
        var context = { items: ["one", "two", "three"] };

        var pre = Helpers.each(raw, "__eachtest");
        var html = EJS.render(pre, context);

        var preResult = '<? for(var __eachtest = 0; __eachtest < items.length; __eachtest++){ ?> <li __eachtest::each="item in items"> <?= items[__eachtest] ?> </li> <? } ?>';
        var htmlResult = '<li __eachtest::each="item in items"> one </li>  <li __eachtest::each="item in items"> two </li>  <li __eachtest::each="item in items"> three </li>';

        assert.equal(pre, preResult);
        assert.equal(html.trim(), htmlResult);
    });

    it("::on helper", function(){
        var raw = '<button ::on-click="sayHello()"> Go! </button>';
        var context = { $$on: function(){} };

        var pre = Helpers.on(raw, "__ontest");
        var html = EJS.render(pre, context);

        var preResult = '<button __ontest::on-click="sayHello()"> Go! </button> <? $$on("click", "__ontest", function(){ sayHello() }) ?>';
        var htmlResult = '<button __ontest::on-click="sayHello()"> Go! </button>';

        assert.equal(pre, preResult);
        assert.equal(html.trim(), htmlResult);
    });


});
