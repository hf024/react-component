export default {
	createQQShareableLink (template) {
		var parameters = []
		for (var i in template) {
			parameters.push(i + '=' + encodeURIComponent(template[i] || ''))
		}

		return `http://connect.qq.com/widget/shareqq/index.html?${parameters.join('&')}`
	}
}
