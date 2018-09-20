import {assert} from 'chai'
import Cookie from './cookie'

describe('Cookie', () => {
	it('getCookie() should return a value by cookie name', () => {
		assert.equal('hello', Cookie.getCookie('appletree_key=hello; a=b', 'appletree_key'))
		assert.equal('hello', Cookie.getCookie('a=b; appletree_key=hello', 'appletree_key'))
		assert.equal('', Cookie.getCookie('appletree_key=; a=b', 'appletree_key'))
		assert.equal('', Cookie.getCookie('', 'appletree_key'))
		assert.equal('', Cookie.getCookie(null, 'appletree_key'))
	})
})
