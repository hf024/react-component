import {assert} from 'chai'
import Immutable from 'immutable'

describe('Immutable', () => {
	it('fromJS() and toJS()', () => {
		let list = [1, 2, 3]
		let newList = Immutable.fromJS(list).push(4).toJS()
		assert.equal(3, list.length)
		assert.equal(4, newList.length)
	})
})
