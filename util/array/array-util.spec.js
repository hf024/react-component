import {assert} from 'chai'
import ArrayUtil from './array-util'
import _ from 'lodash'

describe('ArrayUtil', () => {
	it('move()', () => {
		let result = ArrayUtil.move([
			'How',
			'Are',
			'You'
		], 1, 0)
		assert.equal(3, result.length)
		assert.ok(_.isEqual([
			'Are',
			'How',
			'You'
		], result))
	})
})
