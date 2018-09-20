export default {
	getTabBarParent (node) {
		while (node && node.className.indexOf('hover-parent') === -1) {
			node = node.parentNode
		}

		if (node && node.className.indexOf('hover-parent') !== -1) {
			return node
		} else {
			return null
		}
	},

	istHoverHiddenDom (hoverDom) {
		return hoverDom && hoverDom.className.indexOf('hidden') !== -1
	},

	isOverBottomLimit (topPosition, clientHeight) {
		return topPosition + clientHeight > window.innerHeight
	},

	isOverRightLimit (leftPosition, clientWidth) {
		return leftPosition + clientWidth > window.innerWidth
	},

	handleMouseOver (hoverDom, callbackFunc, clientHeight = 28, clientWidth = 0) {
		let parentDom = this.getTabBarParent(hoverDom)
		if (parentDom && hoverDom && !this.istHoverHiddenDom(hoverDom)) {
			let hoverDomRectangle = hoverDom.getBoundingClientRect()
			let alignTop = 20
			let topPosition = hoverDomRectangle.top + alignTop
			let leftPosition = hoverDomRectangle.left
			if (this.isOverBottomLimit(topPosition, clientHeight)) {
				topPosition = topPosition - clientHeight - alignTop
			}
			if (this.isOverRightLimit(leftPosition, clientWidth)) {
				leftPosition = window.innerWidth - 120
			}
			typeof callbackFunc === 'function' && callbackFunc(topPosition, leftPosition, true)
		}
	}
}
