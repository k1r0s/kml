var CustomParser = require("../lib/CustomParser");
var assert = require("assert");

describe("transform current markup", function(){
    it("basic construct", function(){
		var test =
        `
            <span>Hi there</span>
        `;

        var parser = new CustomParser();
		parser.write(test);
		var result = parser.end();

		assert(test, result);

    });
    it("complex construct", function(){
		var test =
        `
            <span>
                <p another="atr">This is an example</p>
				<%=asd%>

				some text
            </span>
        `;

        var parser = new CustomParser();
		parser.write(test);
		var result = parser.end();

		assert(test, result);

    });
    it("more complex construct", function(){
		var test =
        `
			<div>
				<span>
	                <p another="atr">This is an example</p>
					<%=asd%>

					some text
	            </span>
				<section>
					hellooooooooooaksjalñdkfjas <strong>world</strong>
				</section>
			</div>
        `;

        var parser = new CustomParser();
		parser.write(test);
		var result = parser.end();

		assert(test, result);

    });
});
