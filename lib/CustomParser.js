var Parser = require("htmlparser2").Parser;
var Class = require("kaop/Class");

module.exports = CustomParser = Class.inherits(Parser, {
	result: "",
	currentTag: "",
	currentNode: "",
	opened: {},
	parsed: [],
	tagContent: "",

	__onopentag: function(tagname, attrs){
		var openingTag;
		if(this.currentTag){
			openingTag = "<" + this.currentTag.replace(":tag:", tagname) + ">";
		}else{
			openingTag = "<" + tagname + ">";
		}
		this.opened[tagname] = openingTag;
		this.result += openingTag;
		this.currentTag = "";
	},

	__onattribute: function(attr, val){
		if(!this.currentTag) this.currentTag = ":tag:";
		this.currentTag += " " + attr + "=\"" + val + "\"";
	},

	__onclosetag: function(tagname){
		var closingTag = this.tagContent + "</" + tagname + ">";
		this.result += closingTag;
		var closedTag = this.opened[tagname] + closingTag;
		this.parsed.push(closedTag);
		delete this.opened[tagname];
		this.tagContent = "";
		for (var parent in this.opened) {
			this.opened[parent] += closedTag;
		}
	},

	__ontext: function(t){
		this.tagContent += t;
	},

	__onprocessinginstruction: function(text, d){
		this.tagContent += "<" + d + ">";
	},


	constructor: ["override", function(parent){
		parserOpts = {};

		parserOpts.onopentag = this.__onopentag.bind(this);
		parserOpts.onattribute = this.__onattribute.bind(this);
		parserOpts.onclosetag = this.__onclosetag.bind(this);
		parserOpts.ontext = this.__ontext.bind(this);
		parserOpts.onprocessinginstruction = this.__onprocessinginstruction.bind(this);

		parent(parserOpts);

	}],
	end: ["override", function(parent){
		parent();
		return this.result;
	}]
});
