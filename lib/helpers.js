var Class = require("kaop").Class;
var shortid = require("shortid");

module.exports = Helpers = Class.static({
    getUnique: function(){
        return "k" + shortid.generate();
    },
    each: ["parseExpression", function(tag, attr, attrMod, attrValue){

        var template = "<? for(var :index: = 0; :index: < :col:.length; :index:++){ ?> :tag: <? } ?>";
        var expr = attrValue.split(" in ");
        var tmp = this.getUnique();
        template = template.replace(/:col:/, expr[1]);
        tag = tag.replace(attrValue, tmp);
        tag = tag.replace(new RegExp(expr[0], "g"), expr[1] + "[:index:]");
        tag = tag.replace(tmp, attrValue);
        template = template.replace(":tag:", tag);
        template = template.replace(/:index:/g, this.getUnique());
        return template;
    }],
    on: ["parseExpression", function(tag, attr, attrMod, attrValue){

        var template = ":tag: <? $$on(\":attrMod:\", \":eventId:\", function(){ :attrValue: }) ?>";
        var eventId = this.getUnique();
        tag = tag.replace(attr, eventId + attr);
        template = template.replace(":tag:", tag);
        template = template.replace(":attrMod:", attrMod);
        template = template.replace(":eventId:", eventId);
        template = template.replace(":attrValue:", attrValue);
        return template;
    }]
});
