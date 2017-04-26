var CustomParser = require("../lib/CustomParser");
var assert = require("assert");

describe("several fn tests", function() {
    it("removeWhiteSpaces: remove all whitespaces from string", function() {
        var example =
            `
        this is an example. there are many spaces within, but.. only
        trailing whitespaces gonna be removed.

        be aware of that! :)

        `;

        assert.equal(
            CustomParser.prototype.removeWhiteSpaces(example),
            "this is an example. there are many spaces within, but.. only trailing whitespaces gonna be removed. be aware of that!:)"
        );
    });

    it("writeAttrs: builds an string with node attributes", function() {
        var example = {
            type: "text",
            name: "tool"
        };

        assert.equal(
            CustomParser.prototype.writeAttrs(example),
            'type="text" name="tool" '
        );
    });

    it("writeHead: builds an string with given tag and attributes", function() {
        var exampleTag = "p",
            exampleAttrs = {
                "style": "text-align:center"
            };

        assert.equal(
            CustomParser.prototype.writeHead(exampleTag, exampleAttrs),
            '<p style="text-align:center" >'
        );
    });

    it("instance: construct a valid html string", function() {
        var test =
            `
        <div class="container">
            <div class="row">
                <span>some</span>
            </div>
            <div class="row">
                <span>text</span>
            </div>
        </div>
        `;

        var spected = [{
                tag: 'span',
                attrs: {},
                text: 'some',
                outer: '<span >some</span>',
                header: '<span >'
            },
            {
                tag: 'div',
                attrs: {
                    class: 'row'
                },
                text: '',
                outer: '<div class="row" ><span >some</span></div>',
                header: '<div class="row" >'
            },
            {
                tag: 'span',
                attrs: {},
                text: 'text',
                outer: '<span >text</span>',
                header: '<span >'
            },
            {
                tag: 'div',
                attrs: {
                    class: 'row'
                },
                text: '',
                outer: '<div class="row" ><span >text</span></div>',
                header: '<div class="row" >'
            },
            {
                tag: 'div',
                attrs: {
                    class: 'container'
                },
                text: '',
                outer: '<div class="container" ><div class="row" ><span >some</span></div><div class="row" ><span >text</span></div></div>',
                header: '<div class="container" >'
            }
        ]

        var parser = new CustomParser(test);

        assert.equal(
            JSON.stringify(parser.getList()),
            JSON.stringify(spected)
        )
    });
});
