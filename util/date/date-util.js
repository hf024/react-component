export default {
	formatNumber (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	},

	getCurrentDateStr () {
		let date = new Date()
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDate()
		return [year, month, day].map(this.formatNumber).join('-')
	},

	getUpdateTimeStr (param) {
		let freshTimeArray = param.split(' ', 2)
		freshTimeArray[0] = freshTimeArray[0].replace(/-0/g, '-')
		let freshDate = freshTimeArray[0]
		let curTime = new Date()
		let month = curTime.getMonth() + 1
		let today = curTime.getFullYear() + '-' + month + '-' + curTime.getDate()
		return (freshDate === today ? freshTimeArray[1] : freshTimeArray[0])
	}
}
