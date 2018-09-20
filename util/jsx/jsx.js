export default {
	equal (a, b) {
		// console.log(JSON.stringify(a, null, 4))

		// console.log('bbbbbbbbbbbbbbbbbbbbbbb=============')
		// console.log(JSON.stringify(b, null, 4))

		// console.log(a.type === b.type)
		// console.log(a.props.children)

		// console.log('---------------------')
		// console.log(b.props.hasOwnProperty('children'))
		// console.log('---------------------')

		// console.log('0000===>' + (a.type === b.type && a.props.children !== null && b.props.children !== null))

		// return a.type === b.type && a.props.children && b.props.children

		// return a.type === b.type && a.props.children !== null && b.props.children !== null

		return JSON.stringify(a) === JSON.stringify(b)
	}
}
