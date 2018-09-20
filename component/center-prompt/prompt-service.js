let CenterPrompt = null

export default {
	init (value) {
		CenterPrompt = value
	},
	show (text, isFailed = false, bgType = '') {
		CenterPrompt.show(text, isFailed, bgType)
	},
	showIM (text, isFailed, callBackFunc) {
		CenterPrompt.showIM(text, isFailed, callBackFunc)
	}

}
