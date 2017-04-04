var Advices = require("../utils/advices");
var assert = require("assert");

describe("parseExpression should be able to read attrs from node strings", function(){
    it("having ::each=\"item in items\" should retrieve values and place at meta.args", function(){
        var meta = {
            args: ["<li ::each=\"item in items\"> <?= item ?> </li>"],
            methodName: "each"
        };
        eval(Advices.parseExpression.toString());

        parseExpression();

        assert(meta.args[1] === "::each=\"item in items\"");
        assert(meta.args[3] === "item in items");
    });
});
