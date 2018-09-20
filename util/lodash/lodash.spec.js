import {assert} from 'chai'
import _ from 'lodash'

describe('lodash', () => {
	it('check object is empty', () => {
		assert.ok(_.isEmpty({}))
		assert.isNotOk(_.isEmpty({a: 1}))
	})

	it('cloneDeep()', () => {
		let list = [1, 2, 3]
		let newList = _.cloneDeep(list)
		newList.push(4)
		assert.equal(3, list.length)
		assert.equal(4, newList.length)
	})
})
