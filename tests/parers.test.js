var Parsers = require("../lib/index").Parsers;
var EJS = require("ejs");
var assert = require("assert");

EJS.delimiter = "?";

describe("parsers should transform template content to EJS syntax", function(){
    it("::each parser", function(){
        var raw = "<li ::each=\"item in items\"> <?= item ?> </li>";

        var pre = Parsers.each(raw);

        var temp = EJS.render(pre, { items: ["one", "two", "three"] });

        assert.equal(temp, " <li ::each> one </li>  <li ::each> two </li>  <li ::each> three </li> ");
    });
});
