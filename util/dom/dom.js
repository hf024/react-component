export default {
	containsChild (host, target) {
		if (!host) return false
		if (!target) return false
		if (host === target) return true
		return this.containsChild(host, target.parentNode)
	},

	getMatchedChildIndex (children, target) {
		return children.findIndex((item) => {
			return this.containsChild(item, target)
		})
	}
}
