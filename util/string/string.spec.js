import {assert} from 'chai'

describe('string', () => {
	it('replace()', () => {
		let pathname = '/qtrade/product/new-bond'
		let result = pathname.replace('/qtrade/product/', '')
		assert.equal('/qtrade/product/new-bond', pathname)
		assert.equal('new-bond', result)
	})

	it('trim()', () => {
		assert.equal('a', (' a ').trim())
	})

	it('indexOf()', () => {
		assert.isNotOk(''.indexOf('QQ/') >= 0)
	})
})
