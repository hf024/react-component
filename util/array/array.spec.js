import {assert} from 'chai'
import _ from 'lodash'

describe('Array', () => {
	it('filter() will return a smaller array', () => {
		let list = [
			{
				isGood: true,
				name: 'aaa'
			},
			{
				isGood: false,
				name: 'bbb'
			}
		]

		let result = list.filter((item) => {
			return item.name === 'aaa'
		})

		assert.ok(_.isEqual([{
			isGood: true,
			name: 'aaa'
		}], result))

		result = list.filter((item) => item.isGood)

		assert.ok(_.isEqual([{
			isGood: true,
			name: 'aaa'
		}], result))
	})

	it('concat() with another array will not change origin array', () => {
		let a = [1, 2, 3]
		let b = a.concat([4])
		assert.equal(4, b.length)
		assert.equal(3, a.length)

		assert.ok(_.isEqual([1, 2, 3], a))
		assert.ok(_.isEqual([1, 2, 3, 4], b))
	})

	it('concat() with another element will change origin array', () => {
		let a = [1, 2, 3]
		let b = a.concat(4)
		assert.equal(4, b.length)
		assert.equal(3, a.length)

		assert.ok(_.isEqual([1, 2, 3], a))
		assert.ok(_.isEqual([1, 2, 3, 4], b))
	})

	it('splice() with delete', () => {
		var arr = new Array(6)
		arr[0] = 'George'
		arr[1] = 'John'
		arr[2] = 'Thomas'
		arr[3] = 'James'
		arr[4] = 'Adrew'
		arr[5] = 'Martin'

		assert.equal(6, arr.length)

		arr.splice(2, 1)

		assert.equal(5, arr.length)

		assert.equal('James', arr[2])
	})

	it('splice() with insert', () => {
		var arr = new Array(6)
		arr[0] = 'George'
		arr[1] = 'John'
		arr[2] = 'Thomas'
		arr[3] = 'James'
		arr[4] = 'Adrew'
		arr[5] = 'Martin'

		assert.equal(6, arr.length)

		arr.splice(2, 0, 'ddd')

		assert.equal(7, arr.length)

		assert.equal('ddd', arr[2])
		assert.equal('Thomas', arr[3])
	})

	it('new Array() with real value and then we can do forEach', () => {
		var list = _.fill(new Array(6), 0)
		assert.equal(6, list.length)
		let sum = 0
		list.forEach((item, index) => {
			sum++
		})
		assert.equal(6, sum)
	})

	it('new Array() without value and then we can not do forEach', () => {
		var list = new Array(6)
		assert.equal(6, list.length)
		let sum = 0
		list.forEach((item, index) => {
			sum++
		})
		assert.equal(0, sum)
	})

	it('new Array() without value and then we can not do map', () => {
		var list = new Array(6)
		assert.equal(6, list.length)
		let sum = 0
		list.map((item, index) => {
			sum++
			return index
		})
		assert.equal(0, sum)
	})

	it('findIndex()', () => {
		let list = [{key: 'a', value: 'anthony'}, {key: 'b', value: 'bob'}]

		assert.equal(0, list.findIndex((element) => {
			return element.key === 'a'
		}))

		assert.equal(1, list.findIndex((element) => {
			return element.key === 'b'
		}))

		assert.equal(-1, list.findIndex((element) => {
			return element.key === 'xxx'
		}))
	})

	it('join()', () => {
		assert.equal('a b', ['a', 'b'].join(' '))
	})

	it('Array(n).fill(0)', () => {
		let result = Array(5).fill(0)
		assert.equal(5, result.length)
		result.forEach((item) => {
			assert.equal(0, item)
		})
	})

	it('slice()', () => {
		let animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
		let result = animals.slice(2, 4)
		let expectedResult = ['camel', 'duck']
		assert.equal(expectedResult.length, result.length)
		expectedResult.forEach((item, index) => {
			assert.equal(item, result[index])
		})
	})

	it('find() will return matched item', () => {
		let source = [
			{a: 10, name: 'ten'},
			{b: 20, name: 'twenty'}
		]

		assert.ok(_.isEqual({a: 10, name: 'ten'}, source.find((item) => {
			return item.a === 10
		})))

		assert.isNotOk(source.find((item) => {
			return item.a === 100
		}))
	})
})
