import React, {Component} from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import PopupService from './popup-service'

const iconName = 'tips-icon'
export default class AlertInfo extends Component {
	constructor (props) {
		super(props)

		this.handleConfirm = this.handleConfirm.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
	}

	handleConfirm () {
		PopupService.hideCustom()
		this.props.onConfirm && this.props.onConfirm()
	}

	handleCancel () {
		PopupService.hideCustom()
		this.props.onCancel && this.props.onCancel()
	}

	getTipsClassNames () {
		return ClassNames(
			'tips',
			this.props.value && this.props.value.tipsTitle ? '' : 'no-title'
		)
	}
	render () {
		return (
			<div className='alert-info'>
				{
					this.props.value && this.props.value.icon ? <div className={`${this.props.value.icon} ${iconName}`} /> : null
				}
				<div className='tips-body clearfix'>
					<div className='clearfix'>
						{this.props.value && this.props.value.tipsTitle && <p className='tips-title'>{this.props.value.tipsTitle}</p>}
						{this.props.value && this.props.value.tips && <p className={this.getTipsClassNames()}>{this.props.value.tips}</p>}
					</div>
					<div className='button-group'>
						{
							this.props.visibleCancel && <button onClick={this.handleCancel} className='item-button cancel'>{this.props.cancelLabel}</button>
						}
						{
							this.props.visibleConfirm && <button onClick={this.handleConfirm} className='item-button confirm'>{this.props.confirmLabel}</button>
						}
					</div>
				</div>
			</div>
		)
	}
}

AlertInfo.propTypes = {
	value: PropTypes.object,
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func,
	visibleConfirm: PropTypes.bool,
	visibleCancel: PropTypes.bool,
	confirmLabel: PropTypes.string,
	cancelLabel: PropTypes.string,
	icon: PropTypes.string
}

AlertInfo.defaultProps = {
	visibleConfirm: true,
	visibleCancel: true,
	title: '温馨提示',
	confirmLabel: '确定',
	cancelLabel: '取消'
}
