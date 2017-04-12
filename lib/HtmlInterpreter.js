var Class = require("kaop/Class");
var CustomParser = require("./CustomParser");

module.exports = HtmlInterpreter = Class.static({

    watchers: {},

    read: function(htmlStr){

		var parser = new CustomParser;

        parser.write(htmlStr);

        return parser.end();

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
