var Class = require("kaop").Class;

module.exports = Parsers = Class.static({
    counter: 0,
    getNextVariableName: function(){
        return "k" + this.counter++;
    },
    each: ["parseExpression", function(tag, attr, attrValue){
        var template = "<? for(var :index: = 0; :index: < :col:.length; :index:++){ ?> :tag: <? } ?>";
        var expr = attrValue.split(" in ");
        template = template.replace(/:col:/, expr[1]);
        tag = tag.replace(new RegExp(expr[0], "g"), expr[1] + "[:index:]");
        template = template.replace(":tag:", tag);
        template = template.replace(/:index:/g, this.getNextVariableName());
        return template;
    }]
});
