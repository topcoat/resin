var tpct = require('..'),
    assert = require('assert'),
    read = require('fs').readFileSync;

describe('tpct', function() {
    it('should generate correct output', function() {
        tpct({
            src: 'test/fixtures/tpct.test.css',
            dest: 'tmp/tpct.css'
        });

        var actual = read('tmp/tpct.css'),
            expected = read('test/expected/tpct.expected.css', 'utf-8').toString();
        assert(actual, expected, 'Generated output should match expected file');
    });
});
