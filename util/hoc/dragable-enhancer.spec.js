import {assert} from 'chai'
import {getLastInnerComponentRef} from './dragable-enhancer'

describe('DragableEnhancer', () => {
	it('getLastInnerComponentRef()', () => {
		assert.ok(true)

		let host = {
			innerComponentRef: {
				a: 1
			}
		}

		let result = getLastInnerComponentRef(host)

		assert.equal(1, result.a)

		host = {
			innerComponentRef: {
				innerComponentRef: {
					b: 2
				}
			}
		}

		result = getLastInnerComponentRef(host)

		assert.equal(2, result.b)

		host = {c: 3}

		result = getLastInnerComponentRef(host)

		assert.equal(3, result.c)
	})
})
