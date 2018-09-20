import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class FileUploader extends Component {
	constructor (props) {
		super(props)

		this.abortUpload = this.abortUpload.bind(this)
		this.handleBrowseFileComplete = this.handleBrowseFileComplete.bind(this)
		this.handleLabelClick = this.handleLabelClick.bind(this)

		this.searchInputId = `file-upload-${new Date().getTime()}`
	}

	upload () {
		this.xhr = new XMLHttpRequest()
		this.xhr.open('POST', this.props.url)

		this.xhr.upload.addEventListener('progress', (e) => {
			let progress = (e.total === 0) ? 0 : parseInt((e.loaded / e.total) * 100)
			this.props.onProgress(progress, e, this.xhr)
		})

		this.xhr.addEventListener('load', (e) => {
			if (this.xhr.status >= 200 && this.xhr.status <= 299) {
				this.props.onLoad(e, this.xhr)
				return
			}
			this.props.onError(e, this.xhr)
		})

		this.xhr.addEventListener('error', (e) => {
			this.props.onError(e, this.xhr)
		}, false)

		this.xhr.addEventListener('abort', (e) => {
			this.props.onAbort(e, this.xhr)
		}, false)

		this.xhr.send(new FormData(this.form))
	}

	abortUpload () {
		this.xhr && this.xhr.abort()
	}

	handleBrowseFileComplete (e) {
		if (this.fileInput.files.length === 0) return
		this.props.onBrowseFileComplete(this.fileInput.files[0].name, this.fileInput.files[0].size, this.fileInput.files[0])
	}

	handleLabelClick (e) {
		if (this.props.disabled) {
			e.preventDefault()
			return
		}
		if (this.blockFurtherBrowse) e.preventDefault()
	}

	clearFileInput () {
		this.fileInput.value = ''
	}

	render () {
		return (
			<form className='file-uploader-component' method='post' ref={(form) => { this.form = form }}>
				<input type='file'
					name='file'
					ref={(fileInput) => { this.fileInput = fileInput }}
					accept={this.props.accept}
					id={this.searchInputId}
					onChange={this.handleBrowseFileComplete} />
				<label htmlFor={this.searchInputId} className='custom-file-upload clearfix' onClick={this.handleLabelClick}>
					{
						this.props.uploadLabelRenderer()
					}
				</label>
			</form>
		)
	}
}

FileUploader.propTypes = {
	url: PropTypes.string.isRequired,
	onProgress: PropTypes.func,
	onLoad: PropTypes.func,
	onError: PropTypes.func,
	onAbort: PropTypes.func,
	onBrowseFileComplete: PropTypes.func,
	accept: PropTypes.string,
	uploadLabelRenderer: PropTypes.func,
	disabled: PropTypes.bool
}

FileUploader.defaultProps = {
	onProgress: () => {},
	onLoad: () => {},
	onError: () => {},
	onAbort: () => {},
	onBrowseFileComplete: () => {},
	accept: 'all',
	disabled: false,
	uploadLabelRenderer: function uploadLabelRender () {
		return <div>上传附件</div>
	}
}
