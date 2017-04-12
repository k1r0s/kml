var Class = require("kaop/Class");
var Parser = require("htmlparser2").Parser;

module.exports = HtmlInterpreter = Class.static({

    watchers: {},

    read: function(htmlStr){

        var parserInstance = new Parser({
			onopentag: function(tagname, attrs){
				parserInstance.openingTag;
				if(parserInstance.currentTag){
					parserInstance.openingTag = "<" + parserInstance.currentTag.replace(":tag:", tagname) + ">";
				}else{
					parserInstance.openingTag = "<" + tagname + ">";
				}
				parserInstance.opened[tagname] = parserInstance.openingTag;
				parserInstance.result += parserInstance.openingTag;
				parserInstance.currentTag = "";
			},
			onattribute: function(attr, val){
				if(!parserInstance.currentTag) parserInstance.currentTag = ":tag:";
				parserInstance.currentTag += " " + attr + "=\"" + val + "\"";
			},
			onclosetag: function(tagname){
				var closingTag = parserInstance.tagContent + "</" + tagname + ">";
				parserInstance.result += closingTag;
				var closedTag = parserInstance.opened[tagname] + closingTag;
				parserInstance.parsed.push(closedTag);
				delete parserInstance.opened[tagname];
				parserInstance.tagContent = "";
				for (var parent in parserInstance.opened) {
					parserInstance.opened[parent] += closedTag;
				}
			},
			ontext: function(t){
				parserInstance.tagContent += t;
			},
			onprocessinginstruction: function(text, d){
				parserInstance.tagContent += "<" + d + ">";
			}
		});

		parserInstance.textResult = "";
		parserInstance.currentTag = "";
		parserInstance.currentNode = "";
		parserInstance.opened = {};
		parserInstance.parsed = [];
		parserInstance.tagContent = "";

        parserInstance.write(htmlStr);

        parserInstance.end();

        return result;
    },

    on: function(type, key, cbk){
        this.watchers[type + ":" + key] = cbk;
    },

    fire: function(type, key){
        if(this.watchers[type + ":" + key]){
            var sandboxEl = document.createElement("sandbox");


            this.watchers[type + ":" + key](el, sandboxEl);
            var result = sandboxEl.innerHTML;
        }
    }
})
