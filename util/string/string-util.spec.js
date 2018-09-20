import {assert} from 'chai'
import StringUtil from './string-util'

describe('StringUtil', () => {
	it('isNullOrEmpty()', () => {
		assert.ok(StringUtil.isNullOrEmpty(''))
	})

	it('parse -98 to string', () => {
		assert.equal('-98', String(-98))
	})
})
