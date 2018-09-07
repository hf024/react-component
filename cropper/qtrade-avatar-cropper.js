import React from 'react'
import PropTypes from 'prop-types'
import PopupService from '../popup/popup-service'
import QtradeCropper from './qtrade-cropper'
import VerticalPosition from '../popup/vertical-position'
import StringUtil from '../../util/string/string-util'
import ClassNames from 'classnames'

export const FILE_SIZE_LIMIT = 5

export default class QtradeAvatarCropper extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			avatarSrc: this.props.src
		}
		this.doChange = this.doChange.bind(this)
		this.doCancel = this.doCancel.bind(this)
		this.updateAvatarSrc = this.updateAvatarSrc.bind(this)
	}

	componentWillReceiveProps (nextProps) {
		this.setState({
			avatarSrc: nextProps.src
		})
	}

	doChange () {
		if (this.props.disabled) return

		let _this = this

		if (StringUtil.isNullOrEmpty(this.state.avatarSrc)) {
			PopupService.showUniqueCustom({
				ui: <QtradeCropper onSubmit={_this.updateAvatarSrc} onCancel={_this.doCancel} />,
				skin: VerticalPosition.VERTICAL_TOP_8_PERSENT,
				hideHeader: false,
				headerTitle: '上传头像'
			})
			return
		}

		let Img = new Image()
		let dataURL = ''
		Img.crossOrigin = 'anonymous'
		Img.src = this.state.avatarSrc

		Img.onload = function () {
			let canvas = document.createElement('canvas')
			let width = Img.width
			let height = Img.height
			canvas.width = width
			canvas.height = height
			canvas.getContext('2d').drawImage(Img, 0, 0, width, height)
			dataURL = canvas.toDataURL('image/png')
			PopupService.showUniqueCustom({
				ui: <QtradeCropper src={dataURL}
					fileSizeLimit={FILE_SIZE_LIMIT}
					onSubmit={_this.updateAvatarSrc}
					onCancel={_this.doCancel} />,
				skin: VerticalPosition.VERTICAL_TOP_8_PERSENT,
				hideHeader: false,
				headerTitle: '更新头像'
			})
		}
	}

	doCancel () {
		PopupService.hideCustom()
	}

	updateAvatarSrc (src) {
		this.setState({
			avatarSrc: src
		})
		this.props.onChange(this.props.fieldName, src)
	}

	getAvatarClassNames () {
		return ClassNames(
			'avatar',
			{
				'disabled': this.props.disabled
			}
		)
	}

	getRoundAreaClassNames () {
		return ClassNames(
			'round-area',
			{
				'disabled': this.props.disabled
			}
		)
	}

	render () {
		return (
			<div className='qtrade-avatar-cropper-component'>
				<div className='label-area'>
					{
						this.props.mandatory ? <span className='star'>*</span> : null
					}
					<label className='label'>{this.props.label}</label>
				</div>
				<div className='component-area'>
					{
						this.props.src ? <img className={this.getAvatarClassNames()}
							onClick={this.doChange}
							src={this.state.avatarSrc} />
							: <div className={this.getRoundAreaClassNames()}
								onClick={this.doChange} />
					}
					<div className='description'>请上传个人头像的图片，文件大小不能超过{FILE_SIZE_LIMIT}M，格式为jpeg、jpg和png</div>
				</div>
			</div>
		)
	}
}

QtradeAvatarCropper.propTypes = {
	fieldName: PropTypes.string,
	label: PropTypes.string,
	src: PropTypes.string,
	disabled: PropTypes.bool,
	mandatory: PropTypes.bool,
	onChange: PropTypes.func
}

QtradeAvatarCropper.defaultProps = {
	onChange: () => {}
}
