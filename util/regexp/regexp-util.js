import StringUtil from '../string/string-util'

export default {
	isMixedChineseEnglishName (value) {
		let trimmedValue = value.trim()
		if (StringUtil.isNullOrEmpty(trimmedValue)) return false
		return /^([\u4e00-\u9fa5]|[a-zA-Z]|[（）。]|[\\(\\)\\.])+$/.test(trimmedValue)
	},

	isPureChineseEnglishName (value) {
		let trimmedValue = value.trim()
		if (StringUtil.isNullOrEmpty(trimmedValue)) return false
		return /^([\u4e00-\u9fa5]+)$|^([a-zA-Z]+)$/.test(trimmedValue)
	},

	isPhoneNumber (value) {
		return /^1\d{10}$/.test(value)
	},

	isEmail (value) {
		return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)
	},

	isQQNumber (value) {
		return /^[1-9]\d{4,11}$/.test(value)
	},

	isDeskPhoneNumber (value) {
		return /^(0\d{2,3}-\d{7,8})$/.test(value)
	},

	isValidationCode (value) {
		return /^\d{4}$/.test(value)
	},

	hasNumber (value) {
		return /\d+/.test(value)
	},

	hasAlphabet (value) {
		return /[A-Za-z]+/.test(value)
	},

	hasSymbol (value) {
		return /[^\dA-Za-z]+/.test(value)
	},

	checkPassword (value) {
		return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value)
	}
}
