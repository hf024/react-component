import {WALL_STREET_NEWS} from '../../global-const'
import {GET} from '../../util/http/method'
import {request} from '../http/ajax'

export function toBridgeUrl (url, protocol, host) {
	if (url.indexOf(WALL_STREET_NEWS) === 0) return url
	if (url.indexOf('/simulator-api/') === 0) return url
	return `${protocol}//${host}/bridge${url}`
}

export function logoutSite (logoutAPI, loginURL) {
	const toLoginPage = () => { document.location = loginURL }

	if (!logoutAPI) {
		toLoginPage()
		return
	}

	request({
		url: logoutAPI,
		method: GET
	}, {}, true).then(toLoginPage).catch(toLoginPage)
}
