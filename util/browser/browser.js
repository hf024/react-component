import NodeVariable from '../node-variable/node-variable'

const NORMAL_BROWSER = 'normal-browser'

export default {
	isNormalBrowser (userAgent = navigator.userAgent) {
		return userAgent.toLocaleLowerCase().indexOf('qq/') === -1
	},

	isIE () {
		var ua = window.navigator.userAgent

		var msie = ua.indexOf('MSIE ')
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
		}

		var trident = ua.indexOf('Trident/')
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:')
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
		}

		var edge = ua.indexOf('Edge/')
		if (edge > 0) {
		// Edge (IE 12+) => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
		}

		// other browser
		return false
	},

	getValueByKey (name, url = window.location.href) {
		name = name.replace(/[[\]]/g, '\\$&')
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
		var results = regex.exec(url)
		if (!results) return null
		if (!results[2]) return ''
		return decodeURIComponent(results[2].replace(/\+/g, ' '))
	},

	getHost () {
		// Here we need to use an Internet domain (e.g. 'test.qtrade.com.cn') to support sharing a link to QQ.
		return NodeVariable.isLocalhost() ? 'test.qtrade.com.cn' : window.location.host
	},

	getProtocol () {
		return window.location.protocol
	},

	supportNormalBroswer (originClassNames) {
		const list = [originClassNames.trim()]
		if (this.isNormalBrowser()) list.push(NORMAL_BROWSER)
		return list.join(' ')
	},

	isNormalBrowserWrapper () {
		return this.isNormalBrowser()
	}
}
