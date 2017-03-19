var Helpers = require("../lib/index").Helpers;
var EJS = require("ejs");
var assert = require("assert");

EJS.delimiter = "?";

describe("Helpers should transform template content to EJS syntax", function(){
    it("::each helper", function(){
        var raw = "<li ::each=\"item in items\"> <?= item ?> </li>";

        var pre = Helpers.each(raw);

        console.log(pre);

        // var temp = EJS.render(pre, { items: ["one", "two", "three"] });

        // assert.equal(temp, " <li ::each> one </li>  <li ::each> two </li>  <li ::each> three </li> ");
    });

    it("::on helper", function(){
        var raw = "<button ::on-click=\"sayHello()\"> Go! </button>";

        var pre = Helpers.on(raw);

        console.log(pre);
    });


});
