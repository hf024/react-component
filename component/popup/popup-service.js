import React from 'react'
import AlertInfo from './alert-info'
import VerticalPosition from './vertical-position'

let popupStack = null

export default {
	init (value) {
		popupStack = value
	},

	formatValue (value) {
		return value && !value.hasOwnProperty('tips') && !value.hasOwnProperty('tipsTitle') ? {tips: value} : value
	},

	showDialog (value, confirmLabel = '确定', headerTitle = '温馨提示', handleConfirm) {
		// 只有确认按钮
		this.showCustom({
			ui: <AlertInfo value={this.formatValue(value)} visibleCancel={false} confirmLabel={confirmLabel} onConfirm={handleConfirm} />,
			hideHeader: false,
			skin: VerticalPosition.VERTICAL_TOP_170_PIXEL,
			headerTitle: headerTitle,
			supportEscapeKey: true
		})
	},

	showConfirm (value, handleConfirm, handleCancel, headerTitle = '温馨提示', confirmLabel, visibleCancel, cancelLabel, hideCloseIcon = false) {
		// 确认 取消
		this.showCustom({
			ui: <AlertInfo value={this.formatValue(value)}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
				visibleCancel={visibleCancel}
				confirmLabel={confirmLabel}
				cancelLabel={cancelLabel}
			/>,
			hideHeader: false,
			skin: VerticalPosition.VERTICAL_TOP_170_PIXEL,
			onClose: handleCancel,
			hideCloseIcon: hideCloseIcon,
			headerTitle: headerTitle,
			supportEscapeKey: true
		})
	},

	showUniqueConfirm (value, handleConfirm, handleCancel, headerTitle = '温馨提示', confirmLabel, visibleCancel, cancelLabel, hideCloseIcon = false) {
		this.showUniqueCustom({
			ui: <AlertInfo value={this.formatValue(value)}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
				visibleCancel={visibleCancel}
				confirmLabel={confirmLabel}
				cancelLabel={cancelLabel} />,
			hideHeader: false,
			skin: VerticalPosition.VERTICAL_TOP_170_PIXEL,
			onClose: handleCancel,
			hideCloseIcon: hideCloseIcon,
			headerTitle: headerTitle,
			supportEscapeKey: true
		})
	},

	showCustom (custom) {
		setTimeout(() => {
			popupStack.pushCustom(custom)
		}, 0)
	},

	showUniqueCustom (custom) {
		custom.isUnique = true
		setTimeout(() => {
			popupStack.pushUniqueCustom(custom)
		}, 0)
	},

	hideCustom () {
		popupStack.popCustom()
	},

	// This method will ensure the popup to be aligned center horizontally after lazy loading.
	forceUpdate () {
		popupStack.forceUpdate()
	}
}
