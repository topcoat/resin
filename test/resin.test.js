var resin = require('..'),
    assert = require('assert'),
    read = require('fs').readFileSync;

describe('resin', function() {

    it('should generate correct output', function() {

        var actual = resin({
            src: 'test/fixtures/resin.test.css',
            namespace: 'topcoat'
        }),
            expected = read('test/expected/resin.expected.css', 'utf-8').toString().trim();

        assert.equal(actual, expected, 'Generated output should match expected file');
    });

    it('should throw error when no input file is supplied', function() {
        assert.throws(function() {
            resin({
                src: ''
            });
        }, Error);
    });

    it('should import from node_modules', function() {
        var lic = read('test/fixtures/license.txt', 'utf-8'),
            actual = resin({
                src: 'test/fixtures/resin.import.test.css',
                license: lic
            }),
            expected = read('test/expected/resin.import.expected.css', 'utf-8').toString().trim();

        assert.equal(actual, expected, 'Generated output should match expected file');
    });

});
