var CustomParser = require("../lib/CustomParser");
var assert = require("assert");

describe("transform current markup", function(){
    it("tests..", function(){
		var test1 =
        `
            <span>
                <p another="atr">This is an example</p>
				<%=asd%>

				some text
            </span>
        `;

        var parser = new CustomParser();
		parser.write(test1);
		var result = parser.end();

		assert(test1, result);

    });
});
