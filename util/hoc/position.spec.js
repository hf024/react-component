import {assert} from 'chai'
import Position from './position'

describe('Position', () => {
	it('getLeft() and getTop()', () => {
		let left = 10
		let top = 20

		let position = new Position(left, top)
		assert.equal(left, position.getLeft())
		assert.equal(top, position.getTop())
	})

	it('calculateSouthEastCase()', () => {
		assert.ok(new Position(5, 5).equals(
			Position.calculateSouthEastCase(new Position(10, 10), {width: 20, height: 20}, {innerWidth: 25, innerHeight: 25})
		))
		assert.ok(new Position(10, 10).equals(
			Position.calculateSouthEastCase(new Position(10, 10), {width: 3, height: 3}, {innerWidth: 25, innerHeight: 25})
		))
	})

	it('calculateNorthWestCase()', () => {
		assert.ok(new Position(0, 0).equals(
			Position.calculateNorthWestCase(new Position(-1, -1))
		))
		assert.ok(new Position(10, 10).equals(
			Position.calculateNorthWestCase(new Position(10, 10))
		))
	})

	it('toPixelObject()', () => {
		let pixelObject = new Position(1, 2).toPixelObject()
		assert.equal('1px', pixelObject.left)
		assert.equal('2px', pixelObject.top)
	})
})
