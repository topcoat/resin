var resin = require('..'),
    assert = require('assert'),
    read = require('fs').readFileSync;

describe('resin', function() {

    it('should generate correct output', function() {

        var actual = resin({
            src: 'test/fixtures/resin.test.css',
            namespace: 'topcoat',
            license: read('test/fixtures/license.txt')
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

    it('should not fail when passed a debug flag', function() {

        var actual = resin({
            src: 'test/fixtures/resin.test.css',
            namespace: 'topcoat',
            license: read('test/fixtures/license.txt'),
            debug: true
        }),
            expected = read('test/expected/resin.expected.css', 'utf-8').toString().trim();

        assert.equal(actual, expected, 'Generated output should match expected file');
    });

});
