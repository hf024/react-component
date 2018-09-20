import {assert} from 'chai'

describe('Object', () => {
	it('assign()', () => {
		let a = {
			name: 'ddd'
		}

		let b = {
			x: 'ttt'
		}

		assert.equal('ddd', a.name)
		assert.isUndefined(a.x)

		Object.assign(a, b)

		assert.equal('ttt', a.x)
	})

	it('check property exist', () => {
		let a = {}
		assert.isNotOk(a.tabIndex)
		assert.isNotOk(a.hasOwnProperty('tabIndex'))

		a.tabIndex = 0
		assert.isNotOk(a.tabIndex)

		assert.isNotOk(0)

		assert.ok(a.hasOwnProperty('tabIndex'))

		assert.ok('abc'.hasOwnProperty('length'))
		assert.isNotOk('abc'.hasOwnProperty('ttt'))
	})

	it('can undefined ok to run as function', (done) => {
		try {
			undefined()
			assert.fail()
		} catch (e) {
			done()
		}
	})

	it('check is object', () => {
		assert.equal('object', typeof {})
		assert.equal('object', typeof [])
		assert.ok(Array.isArray([]))
		assert.isNotOk(Array.isArray({}))
	})
})
