var HtmlInterpreter = require("../lib/HtmlInterpreter");
var assert = require("assert");

describe("Interpreter", function(){
    it("tests..", function(){
        var initial =
        `
            <span>
                <p another="atr">This is an example</p>
            </span>
        `;

        var spected =
        `
            <span some="4">
                <p another="atr">This is an example</p>
            </span>
        `;

        HtmlInterpreter.on("element", "span", function(element, parent){
            element.setAttribute("some", "4");
        });

        var result = HtmlInterpreter.read(initial);

        assert(spected, result);
    });
});
