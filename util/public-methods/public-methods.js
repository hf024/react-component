export const DataTypes = {
	UNDEFINED: undefined,
	NULL: null,
	NULL_VALUE: ''
}

export default {
	dealWithDataType (data, types, param) {
		let isTrue = false
		types.map((item, index) => {
			if (data === item) {
				isTrue = true
			}
		})
		if (isTrue) {
			return param
		}
		return data
	}
}
