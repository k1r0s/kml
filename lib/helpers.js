var Class = require("kaop").Class;


module.exports = Helpers = Class.static({
    getUnique: function(){
        return "k" + parseInt(Date.now() * Math.random());
    },
    each: ["parseExpression", function(tag, explicitAttr, attr, attrMod, attrValue){

        var template = "<? for(var :index: = 0; :index: < :col:.length; :index:++){ ?> :tag: <? } ?>";
        var expr = attrValue.split(" in ");
        var tmp = explicitAttr || this.getUnique();
        template = template.replace(/:col:/, expr[1]);
        tag = tag.replace(attrValue, tmp);
        tag = tag.replace(new RegExp(expr[0], "g"), expr[1] + "[:index:]");
        tag = tag.replace(tmp, attrValue);
        tag = tag.replace(attr, tmp + attr);
        template = template.replace(":tag:", tag);
        template = template.replace(/:index:/g, tmp);
        return template;
    }],
    on: ["parseExpression", function(tag, explicitAttr, attr, attrMod, attrValue){

        var template = ":tag: <? $$on(\":attrMod:\", \":eventId:\", function(){ :attrValue: }) ?>";
        var tmp = explicitAttr || this.getUnique();
        tag = tag.replace(attr, tmp + attr);
        template = template.replace(":tag:", tag);
        template = template.replace(":attrMod:", attrMod);
        template = template.replace(":eventId:", tmp);
        template = template.replace(":attrValue:", attrValue);
        return template;
    }]
});
