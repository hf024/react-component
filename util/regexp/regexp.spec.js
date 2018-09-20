import {assert} from 'chai'

describe('RegExp', () => {
	it('test()', () => {
		assert.ok(/^hello/.test('hello world!'))
		assert.ok(/^\d+$/g.test('7'))
		assert.ok(/^\d+$/g.test('7888'))
		assert.ok(/^\d+[D]$/g.test('7D'))
		assert.ok(/^\d+[Dd]$/g.test('7d'))
		assert.ok(/^\d+[Dd]*$/g.test('7'))
		assert.ok(/^\d+[Dd]*$/g.test('7D'))
		assert.ok(/^\d+[Dd]*$/g.test('7d'))
	})
})
