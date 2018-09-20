import {assert} from 'chai'

describe('Number', () => {
	it('parse to number', () => {
		assert.equal(123, parseInt('123ddd'))
		assert.isNaN(parseInt('ddd123'))
		assert.isNaN(parseInt('ddd'))
		assert.ok(isNaN(parseInt('ddd')))
	})
})
