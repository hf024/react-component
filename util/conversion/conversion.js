export default {
	parseToObject (list) { // 数组转对象并把每一项存储为true
		let flag = {}
		list.forEach((item) => {
			flag[String(item)] = true
		})
		return flag
	},

	parseToArray (object) { // 把对象里面为true的选项取出重新转换成数组
		let keys = Object.keys(object)
		let array = []
		keys.forEach((item) => {
			if (object[item]) {
				array.push(item)
			}
		})
		return array
	},

	transformAxisData (sourceData, xAxisKey, yAxisKey) { // Echarts走势数据转换 (ps:概率主面板图表数据)
		let xAxis = []
		let yAxis = []
		sourceData && sourceData.forEach((item, index) => {
			xAxis.push(item[xAxisKey])
			yAxis.push(item[yAxisKey])
		})
		return ({xAxis, yAxis})
	},

	replaceModeStringToArray (string) {
		// ---examnple:
		// 把 string = 101|102|103 转换成 parseArray = [拆借, 质押, 买断]
		// let object = [{label: '101', name: '拆借'}, {label: '102', name: '质押'}, {label: '103', name: '买断'}]

		let object = [
			{label: '101', name: '拆借'},
			{label: '102', name: '质押'},
			{label: '103', name: '买断'}
		]
		let parseArray = []
		object.forEach((item, index) => {
			string && string.split('|').forEach((label, labelIndex) => {
				if (label === item.label) {
					parseArray.push(label.replace(item.label, item.name))
				}
			})
		})

		return parseArray
	},

	replaceTagStringToArray (string) {
		let object = [
			{label: '10', name: '押利率'}, {label: '11', name: '押信用'}, {label: '12', name: '押中债'}, {label: '13', name: '押上清'}, {label: '14', name: '押存单'}, {label: '15', name: '不限押'}, {label: '16', name: '限银行'}, {label: '17', name: '限农信'}, {label: '18', name: '限非银'}, {label: '19', name: '限直连'}, {label: '20', name: '钱在账'}, {label: '21', name: '早还款'}, {label: '22', name: '早后台'}
		]
		let parseArray = []
		object.forEach((item, index) => {
			string && string.split('|').forEach((label, labelIndex) => {
				if (label === item.label) {
					parseArray.push(label.replace(item.label, item.name))
				}
			})
		})

		return parseArray
	},

	replaceBondTypeStringToArray (string) {
		let object = [
			{label: '101', name: 'NCD'}, {label: '102', name: '政金债'}, {label: '103', name: '商行债'}, {label: '104', name: '次级债'}, {label: '105', name: '其他金融债'}, {label: '106', name: '企业债'}, {label: '107', name: 'ABS'}, {label: '108', name: '公司债'}, {label: '109', name: '小公募'}, {label: '110', name: '私募债'}, {label: '111', name: 'SCP'}, {label: '112', name: 'CP'}, {label: '113', name: 'MTN'}, {label: '114', name: 'PPN'}
		]
		let parseArray = []
		object.forEach((item, index) => {
			string && string.split('|').forEach((label, labelIndex) => {
				if (label === item.label) {
					parseArray.push(label.replace(item.label, item.name))
				}
			})
		})

		return parseArray
	}
}
