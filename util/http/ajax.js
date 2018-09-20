import NodeVariable from '../node-variable/node-variable'
import Browser from '../browser/browser'
import PopupService from '../../component/popup/popup-service'
import {toBridgeUrl, logoutSite} from './ajax-util'
import { GET, POST } from './method'
import querystring from 'querystring'
import _ from 'lodash'

// If remove this line, IE 11 will have error "Promise not defined".
const Promise = require('es6-promise').Promise

let loginURL = ''

export function setLoginURL (value) {
	loginURL = value
}

let logoutAPI = ''

export function setLogoutAPI (value) {
	logoutAPI = value
}

// Depreciate: this method will be removed soon. Please use Promise method request(config, data) instead.
export function ajax (config, data, sucFunc, errFunc) {
	let url = NodeVariable.isLocalhost()
		? toBridgeUrl(config.url, Browser.getProtocol(), window.location.host)
		: config.url

	return $.ajax(url, {
		type: config.method,
		data: data,
		success: (data) => {
			sucFunc && sucFunc(data)
		},
		error: (err) => {
			errFunc && errFunc(err)
		}
	})
}

function showDialogWithoutCloseIcon (resultMessage) {
	PopupService.showUniqueConfirm(
		{
			icon: 'icon-exclamation-symbol',
			tips: resultMessage
		},
		() => {
			logoutSite(logoutAPI, loginURL)
		},
		null,
		'温馨提示',
		'确定',
		false,
		'',
		true
	)
}

function getUrl (config, data) {
	let url = config.url

	if (config.method === GET && data && !_.isEmpty(data)) {
		url = `${url}?${querystring.stringify(data)}`
	}

	return NodeVariable.isLocalhost()
		? toBridgeUrl(url, Browser.getProtocol(), window.location.host)
		: url
}

export function request (config, data, handleErrorByUser = false) {
	return new Promise((resolve, reject, ajaxHandle) => {
		const jqXHR = $.ajax(getUrl(config, data), {
			type: config.method,
			data: config.method === POST && data,
			success: (result) => {
				if (handleErrorByUser) {
					resolve(result)
					return
				}

				if (result.hasOwnProperty('ret')) {
					let ret = String(result.ret)

					if (ret === '0' || ret === '-3') {
						resolve(result)
						return
					}

					if (ret === '-2') {
						PopupService.showConfirm(
							{
								icon: 'icon-exclamation-symbol',
								tips: result.retmsg
							},
							null,
							null,
							'温馨提示',
							'确定',
							false
						)
						return
					}

					if (ret === '-97' || ret === '-98') {
						showDialogWithoutCloseIcon(result.retmsg)
						return
					}

					if (ret === '-99') {
						logoutSite(logoutAPI, loginURL)
						return
					}

					reject(result)
					return
				}

				reject(result)
			},
			error: reject
		})
		ajaxHandle && ajaxHandle(jqXHR)
	})
}
