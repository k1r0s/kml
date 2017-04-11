var htmlparser = require("htmlparser2");
var assert = require("assert");

var textResult = "";
var currentTag = "";

var parserOpts = {
	onopentag: function(tagname, attrs){
		if(currentTag){
			textResult += "<" + currentTag.replace(":tag:", tagname) + ">";
		}else{
			textResult += "<" + tagname + ">";
		}
		currentTag = "";
	},
	onattribute: function(attr, val){
		if(!currentTag) currentTag = ":tag:";
		currentTag += " " + attr + "=\"" + val + "\"";
	},
	onclosetag: function(tagname){
		textResult += "</" + tagname + ">";
	},
	ontext: function(t){
		textResult += t;
	},
	onprocessinginstruction: function(text, d){
		textResult += "<" + d + ">";
	}
};

describe("transform current markup", function(){
    it("tests..", function(){
		var test1 = '<span ::each="culo" sdasdasdasdsa><label><?= asd?></label></span>';

        var parser = new htmlparser.Parser(parserOpts);
		parser.write(test1);
		parser.end();
		
		assert(test1, textResult);

    });
});
