export default {
	parseUrl (search, field) {
		let searchParam = search ? search.replace('?', '') : ''
		let paramList = searchParam.split('&')
		let result = ''
		paramList.map((item) => {
			let param = item.split('=')
			if (param[0] === field) {
				result = param.length > 1 ? param[1] : ''
				return true
			}
		})

		return result
	}
}
