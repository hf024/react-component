import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FileUploader from './file-uploader'
import PopupService from '../../component/popup/popup-service'
import {extensionList, isValidExtension, toMB} from './file-uploader-util'
import {getMd5} from '../../util/md5/md5'
import {request} from '../../util/http/ajax'
import config from '../../util/http/config'

const DELETE_LABEL = '删除'
const uploadUrl = '/qtrade_bond/api/attachment/uploadfile.do'

export default class FileUploaderProgress extends Component {
	constructor (props) {
		super(props)

		this.deleteFile = this.deleteFile.bind(this)
		this.handleBrowseFileComplete = this.handleBrowseFileComplete.bind(this)
		this.handleProgress = this.handleProgress.bind(this)
		this.handleLoad = this.handleLoad.bind(this)
		this.handleAbort = this.handleAbort.bind(this)
		this.handleClickAbort = this.handleClickAbort.bind(this)
		this.uploadLabelRenderer = this.uploadLabelRenderer.bind(this)
	}

	isEmptyFile (props) {
		return !props.id && !props.fileName
	}

	deleteFile () {
		PopupService.showConfirm('确定要删除附件吗', () => {
			this.props.onDeleteFileByFileName(this.props.fileName)
		})
	}

	handleClickAbort () {
		PopupService.showConfirm(
			'确定要删除附件吗',
			() => {
				this.cancelUpload = true
				this.props.onDeleteFileByFileName(this.fileName)
				this.fileUploader.abortUpload()
			})
	}

	validate (fileName, size) {
		if (!isValidExtension(fileName, extensionList)) {
			PopupService.showDialog('只能上传以下后缀的文件：' + extensionList.join(', '))
			return false
		}
		if (this.props.isDuplicateFileName(fileName)) {
			PopupService.showDialog('不能上传同名的文件')
			return false
		}
		if (toMB(size) > this.props.maxSizeInMB) {
			PopupService.showDialog(`不能上传大于${this.props.maxSizeInMB}MB的文件`)
			return false
		}
		return true
	}

	handleBrowseFileComplete (fileName, size, file) {
		if (!this.validate(fileName, size)) {
			this.fileUploader.clearFileInput()
			return
		}
		this.fileUploader.blockFurtherBrowse = true
		this.fileName = fileName
		this.props.onCheckingMD5(fileName, true)

		getMd5(file).then((md5Value) => {
			if (this.cancelUpload) return
			this.props.onCheckingMD5(fileName, false)

			request(config.ATTACHMENT.checkMD5, {md5: md5Value, file_name: fileName}).then((result) => {
				if (result.retdata.exists === 1) {
					this.props.onUploadComplete(fileName, result.retdata.attachment_info.id)
					return
				}
				this.fileUploader.upload()
			})
		})
	}

	handleProgress (progress, e, xhr) {
		this.props.onProgress(this.fileName, progress)
	}

	handleLoad (e, xhr) {
		let result = JSON.parse(xhr.responseText)
		if (result.retdata) this.props.onUploadComplete(this.fileName, result.retdata.attachment_info.id)
	}

	handleAbort (e, xhr) {
		this.props.onDeleteFileByFileName(this.fileName)
	}

	uploadLabelRenderer () {
		return this.props.fileName
			? <span>{this.props.fileName}</span>
			: <div className='upload-file-button'>
				<span className='icon icon-attachment' />
				<span className='text'>添加附件</span>
			</div>
	}

	fileUploaderUi () {
		return <div className='content-container'>
			<FileUploader ref={(fileUploader) => { this.fileUploader = fileUploader }} url={uploadUrl}
				fileName={this.props.fileName}
				onBrowseFileComplete={this.handleBrowseFileComplete}
				onProgress={this.handleProgress}
				onLoad={this.handleLoad}
				onAbort={this.handleAbort}
				accept={extensionList.join(',')}
				uploadLabelRenderer={this.uploadLabelRenderer} />
			{
				this.props.isCheckingMD5 && <span className='md5-checking'>(文件验证中，请稍候...)</span>
			}
			{
				!this.props.isCheckingMD5 && this.props.fileName && <div className='progress-bar-container'>
					<div className='progress-bar transform' style={{width: this.props.progress + 'px'}}>&nbsp;</div>
				</div>
			}
			{
				this.props.fileName && <span className='clickable-label' onClick={this.handleClickAbort}>{DELETE_LABEL}</span>
			}
		</div>
	}

	fileInfoUi () {
		return <div className='content-container'>
			<span className='file-name-ellipsis'>{this.props.fileName}</span>
			<span className='clickable-label' onClick={this.deleteFile}>{DELETE_LABEL}</span>
		</div>
	}

	render () {
		return (
			<div className='file-uploader-progress-component'>
				{
					this.props.id ? this.fileInfoUi() : this.fileUploaderUi()
				}
			</div>
		)
	}
}

FileUploaderProgress.propTypes = {
	id: PropTypes.string,
	fileName: PropTypes.string,
	onDeleteFileByFileName: PropTypes.func,
	onUploadComplete: PropTypes.func,
	onCheckingMD5: PropTypes.func,
	isCheckingMD5: PropTypes.bool,
	onProgress: PropTypes.func,
	maxSizeInMB: PropTypes.number,
	progress: PropTypes.number,
	isDuplicateFileName: PropTypes.func
}

FileUploaderProgress.defaultProps = {
	maxSizeInMB: 60,
	progress: 0,
	isCheckingMD5: false
}
