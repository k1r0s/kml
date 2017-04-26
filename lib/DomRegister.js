var Class = require("kaop/Class");
var CustomParser = require("./CustomParser");

module.exports = DomRegister = Class.static({

    watchers: {},

    read: function(htmlStr){

        var parser = new CustomParser(htmlStr);

        var list = parser.getList();

        var ejsStr = "";

        for (var interceptor in this.watchers) {
            for (var i = 0; i < list.length; i++) {
                if(list[i].header.search(interceptor) > -1){
                    this.do(interceptor);
                }else{

                }
            }
        }

        return result;
    },

    match: function(interceptor, cbk){
        this.watchers[interceptor] = cbk;
    },

    do: function(interceptor){
        if(this.watchers[interceptor]){
            var sandboxEl = document.createElement("sandbox");
            sandboxEl.innerHTML = interceptor.outer;
            var result = this.watchers[interceptor](sandboxEl.firstChild, sandboxEl);
            return result.outerHTML
        }
    }
})
