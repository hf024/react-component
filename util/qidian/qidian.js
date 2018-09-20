import {request} from '../http/ajax'
import config from '../http/config'
import Authentication from '../authentication/authentication'
import Browser from '../browser/browser'

export default {
	openUrl (qidianNumber) {
		window.open(`http://wpa.qq.com/msgrd?v=3&uin=${qidianNumber}&site=qq&menu=yes`)
	},

	chatWith (qidianNumber) {
		Authentication.check(() => {
			if (Browser.isNormalBrowser()) {
				this.openUrl(qidianNumber)
				return
			}
			request(config.QIDIAN.chat, {qd_number: qidianNumber}).then((result) => {
				try {
					window.external.sdk_invoke('aio.control', JSON.stringify({
						action: 1,
						app_id: result.retdata.appid,
						copen_id: result.retdata.copenid
					}))
				} catch (error) {
					this.openUrl(qidianNumber)
				}
			})
		})
	}
}
