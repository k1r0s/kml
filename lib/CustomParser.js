var Parser = require("htmlparser2").Parser;
var Class = require("kaop/Class");

module.exports = CustomParser = Class.inherits(Parser, {

    pendingNode: null,

	list: [],
	lifoTags: [],

	constructor: ["override", function(parent, str){

        var parserOpts = {};

		parserOpts.onopentag = this.__onopentag;
		parserOpts.onopentag = this.__onopentag;
		parserOpts.onclosetag = this.__onclosetag;
		parserOpts.ontext = this.__ontext;
		parserOpts.onprocessinginstruction = this.__onprocessinginstruction;

		parent(parserOpts);

		this.write(this.removeWhiteSpaces(str));
		this.end();
	}],

    removeWhiteSpaces: function(str){
        return str.replace(/\s+(?=[^a-z])/g, "").trim();
    },

    writeHead: function(tag, attrs){
        var template = "<:tag: :attrs:>";

        template = template.replace(":tag:", tag);
        template = template.replace(":attrs:", this.writeAttrs(attrs));

        return template;
    },

    writeAttrs: function(attrs){
        var _attrs = "";
        for (var attrName in attrs) {
            _attrs += attrName+ "=\"" + attrs[attrName] + "\" ";
        }
        return _attrs
    },

	getHeaders: function(){ return this.list.map(function(item){ return item.header }); },
	getList: function(){ return this.list; },

	__onopentag: function(tagname, attrs){

        if(this.pendingNode) this.lifoTags.push(this.pendingNode);

        this.pendingNode = {
            tag: "",
            attrs: "",
            text: "",
            outer: "",
            header: ""
        };

        this.pendingNode.tag = tagname;

        this.pendingNode.attrs = attrs;

        this.pendingNode.header = this.writeHead(
            this.pendingNode.tag,
            this.pendingNode.attrs
        );

        this.pendingNode.outer = this.pendingNode.header;
	},

	__onclosetag: function(tagname){

        var rawNode = this.pendingNode.outer + "</" + tagname + ">";
        this.pendingNode.outer = rawNode;

        this.list.push(this.pendingNode);
        this.pendingNode = this.lifoTags.pop();
        if(this.pendingNode) this.pendingNode.outer += rawNode;
	},

	__ontext: function(text){
        this.pendingNode.outer += text;
		this.pendingNode.text += text;
	},

	__onprocessinginstruction: function(text, data){
		this.pendingNode.outer += "<" + data + ">";;
		this.pendingNode.text += "<" + data + ">";;
	}
});
