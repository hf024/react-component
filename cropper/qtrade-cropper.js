import React from 'react'
import PropTypes from 'prop-types'
import Cropper from 'react-cropper'
import PopupService from '../popup/popup-service'
import {isValidExtension} from '../file-uploader/file-uploader-util'

export const EMPTY_IMAGE = '/image/empty.png'
const extensionList = ['.jpg', '.jpeg', '.png']

export default class QtradeCropper extends React.Component {
	constructor (props) {
		super(props)
		this.cropImage = this.cropImage.bind(this)
		this.doChangeImage = this.doChangeImage.bind(this)
		this.doZoom = this.doZoom.bind(this)
		this.doRotate = this.doRotate.bind(this)
		this.doSubmit = this.doSubmit.bind(this)
		this.doCancel = this.doCancel.bind(this)
		this.doReset = this.doReset.bind(this)
		this.state = {
			imageSrc: this.props.src
		}
	}

	doChangeImage (e) {
		if (!e) return
		const file = e.target.files[0]
		if (file) {
			this.inputFile.value = ''

			if (file.size > this.props.fileSizeLimit * 1024 * 1024) {
				PopupService.showDialog(`文件大小不能超过${this.props.fileSizeLimit}M，请重新选择`)
				return
			}

			if (!isValidExtension(file.name, extensionList)) {
				PopupService.showDialog('只能上传以下后缀的文件：' + extensionList.join(', '))
				return
			}

			const fileReader = new FileReader()
			fileReader.onload = (e) => {
				const dataURL = e.target.result
				this.setState({
					imageSrc: dataURL
				})
			}
			fileReader.readAsDataURL(file)
		}
	}

	cropImage () {
		if (this.cropper.getCroppedCanvas() === 'null') {
			return false
		}
		this.props.getCropData(this.cropper.getCroppedCanvas().toDataURL())
	}

	doZoom (type) {
		if (type === 'big') {
			this.cropper.zoom(0.1)
		} else {
			this.cropper.zoom(-0.1)
		}
	}

	doRotate (degree) {
		this.cropper.rotate(degree)
	}

	hasImage () {
		return this.state.imageSrc === EMPTY_IMAGE
	}

	doSubmit () {
		if (this.hasImage()) {
			PopupService.hideCustom()
			return
		}

		if (!this.cropper.getCroppedCanvas()) {
			return false
		}
		// 生成data传给后台
		let dataURL = this.cropper.getCroppedCanvas({
			width: this.props.targetWidth,
			height: this.props.targetHeight
		}).toDataURL('image/png')

		this.props.onSubmit(dataURL)

		PopupService.hideCustom()
	}

	doCancel () {
		this.props.onCancel()
	}

	doReset () {
		this.cropper.reset()
		this.doChangeImage()
	}

	render () {
		return (
			<div className='qtrade-cropper-component'>
				<div className='body-container'>
					<div className='qtrade-cropper-content' style={{width: this.props.width + 'px', height: this.props.height + 'px'}}>
						<Cropper
							src={this.state.imageSrc}
							ref={cropper => {
								this.cropper = cropper
							}}
							style={{width: this.props.width, height: this.props.height}}
							aspectRatio={1}
							autoCropArea={1}
							guides={false}
							cropBoxMovable={false}
							cropBoxResizable={false}
							viewMode={3}
							minCanvasHeight={320}
							center={false}
							dragMode={'move'}
							preview={'#preview-id'}
						/>
					</div>
					<div className='upload-container'>
						<div className='button-section'>
							<label className='btn btn-input-file ' htmlFor='photoInput'>
								<input type='file' ref={inputFile => { this.inputFile = inputFile }} className='sr-only' id='photoInput' accept='image/*' onChange={this.doChangeImage} />
								<span>上传本地图片</span>
							</label>
						</div>
						<div className='icon-group'>
							<div className='icon icon-decrease' onClick={() => this.doZoom('small')} />
							<div className='icon icon-increase' onClick={() => this.doZoom('big')} />
							<div className='icon icon-anti-clockwise' onClick={() => this.doRotate(-90)} />
							<div className='icon icon-clockwise' onClick={() => this.doRotate(90)} />
						</div>
					</div>
					<div className='preview-container'>
						<div id='preview-id' className='preview preview-circle' ref={preview => {
							this.preview = preview
						}} />
						{
							this.hasImage() && <p className='empty-message'>没有预览</p>
						}
						<p>头像预览</p>
					</div>
				</div>
				<div className='footer-container clearfix'>
					<span className='btn btn-submit' inline onClick={this.doSubmit}>确定</span>
					<span className='btn btn-cancel' inline onClick={this.doCancel}>取消</span>
				</div>
			</div>
		)
	}
}

QtradeCropper.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	src: PropTypes.string,
	targetWidth: PropTypes.number,
	targetHeight: PropTypes.number,
	getCropData: PropTypes.func,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	fileSizeLimit: PropTypes.number
}

QtradeCropper.defaultProps = {
	width: 320,
	height: 320,
	targetWidth: 100,
	targetHeight: 100,
	src: EMPTY_IMAGE,
	fileSizeLimit: 5,
	visibleReset: false
}
