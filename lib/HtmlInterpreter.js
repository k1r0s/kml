var Class = require("kaop/Class");
var CustomParser = require("./CustomParser");

module.exports = HtmlInterpreter = Class.static({

    watchers: {},

    read: function(htmlStr){

		var parser = new CustomParser(htmlStr);

		for (var interceptor in this.watchers) {
            for (var i = 0; i < parser.getHeaders().length; i++) {
                if(parser.getHeaders()[i].search(interceptor) > -1){
                    // occurence found
                }
            }

		}

        return result;
    },

    on: function(interceptor, cbk){
        this.watchers[interceptor] = cbk;
    },

    fire: function(interceptor){
        if(this.watchers[interceptor]){
            var sandboxEl = document.createElement("sandbox");


            this.watchers[interceptor](el, sandboxEl);
            var result = sandboxEl.innerHTML;
        }
    }
})
