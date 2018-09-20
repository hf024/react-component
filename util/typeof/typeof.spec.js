import {assert} from 'chai'

describe('typeof', () => {
	it('check string', () => {
		assert.equal('string', typeof 'abc')
	})

	it('check array with typeof will return object unfortunately', () => {
		assert.equal('object', typeof ['a', 'b'])
	})

	it('check array', () => {
		assert.ok(Array.isArray(['a', 'b']))
	})
})
