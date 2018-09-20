export default class Position {
	constructor (left, top) {
		this.left = left
		this.top = top
	}

	getLeft () {
		return this.left
	}

	getTop () {
		return this.top
	}

	static calculateSouthEastCase (position, rectangle, container) {
		let newLeft = position.getLeft()
		let newTop = position.getTop()

		if (newLeft + rectangle.width > container.innerWidth) newLeft = container.innerWidth - rectangle.width
		if (newTop + rectangle.height > container.innerHeight) newTop = container.innerHeight - rectangle.height

		return new Position(newLeft, newTop)
	}

	static calculateNorthWestCase (position) {
		let newLeft = position.getLeft()
		let newTop = position.getTop()

		if (newLeft < 0) newLeft = 0
		if (newTop < 0) newTop = 0

		return new Position(newLeft, newTop)
	}

	toPixelObject () {
		return {
			left: this.left + 'px',
			top: this.top + 'px'
		}
	}

	equals (object) {
		return this.left === object.getLeft() && this.top === object.getTop()
	}
}
