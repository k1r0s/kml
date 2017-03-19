var Advices = require("kaop").Advices;

function parseExpression(){
    var raw = meta.args[0];
    var regularExpressionStr = "::" + meta.methodName + "=\"(.*)\"";
    var attrRegularExpression = new RegExp(regularExpressionStr);
    var result = attrRegularExpression.exec(raw);
    meta.args[0] = raw.replace(result[0], "::" + meta.methodName);
    meta.args = meta.args.concat(result);
}


Advices.add(parseExpression);

module.exports = {
    parseExpression: parseExpression
}
