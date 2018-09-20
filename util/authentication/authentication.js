import {request} from '../http/ajax'
import config from '../http/config'
import PopupService from '../../component/popup/popup-service'
import Context from '../lazy/context'
import React from 'react'
import {ONLINE_SERVICE_URL, QTRADE_LOGOUT_API, QTRADE_LOGIN_URL} from '../../global-const'
import {logoutSite} from '../http/ajax-util'

export const FACE_LOGO = 'FACE_LOGO'

export default {
	showAuditInProgressDialog () {
		PopupService.showDialog('您提交的资料正在审核中，我们将尽快为您审核。')
	},

	check (done, muteDialog = false, triggeredFrom) {
		request(config.USER_REGISTER.getUserStatus, {}).then((result) => {
			if (!result.retdata.enable) {
				PopupService.showConfirm(
					<div><p>您的账号出现大量高危操作，为了您的账号安全已暂停使用，请<a target='_blank' rel='noopener noreferrer' href={ONLINE_SERVICE_URL} className='qq-style state-style'><span title='点击唤起QQ私聊窗口' className='arouse' />联系我们</a></p></div>,
					() => {
						logoutSite(QTRADE_LOGOUT_API, QTRADE_LOGIN_URL)
					},
					null,
					'温馨提示',
					'退出登录',
					false
				)
				return
			}

			if (!result.retdata.v) {
				if (result.retdata.reg === 0) {
					PopupService.showCustom({
						ui: <Context.AgreementPanel />,
						hideHeader: false,
						lazyPopupHeader: true
					})
					return
				}

				if (result.retdata.reg === 1) {
					PopupService.showCustom({
						ui: <Context.RegisterPanel auditFailed={false} />,
						hideHeader: false,
						lazyPopupHeader: true
					})
					return
				}

				if (result.retdata.reg === 2) {
					if (muteDialog) return
					if (triggeredFrom === FACE_LOGO) {
						PopupService.showCustom({
							ui: <Context.RegisterPanel auditFailed={false} />,
							hideHeader: false,
							lazyPopupHeader: true
						})
						return
					}
					this.showAuditInProgressDialog()
					return
				}

				if (result.retdata.reg === 4) {
					PopupService.showCustom({
						ui: <Context.RegisterPanel auditFailed />,
						hideHeader: false,
						lazyPopupHeader: true
					})
					return
				}

				if (result.retdata.reg === 6) {
					PopupService.showDialog('由于您的手机号码已用于绑定其它企点号，此QTrade账户已被注销。')
					return
				}

				if (!result.retdata.is_employed) {
					if (muteDialog) return
					if (result.retdata.audit) {
						if (triggeredFrom === FACE_LOGO) {
							PopupService.showCustom({
								ui: <Context.UserInfoEditPanel />,
								hideHeader: false,
								lazyPopupHeader: true
							})
							return
						}
						this.showAuditInProgressDialog()
						return
					}
					PopupService.showConfirm(
						'您目前尚无权限使用此功能。如需使用，请点击“确定”填写相应资料。',
						() => {
							PopupService.showCustom({
								ui: <Context.UserInfoEditPanel />,
								hideHeader: false,
								lazyPopupHeader: true
							})
						},
						null
					)
					return
				}

				return
			}

			done && done()
		})
	}
}
