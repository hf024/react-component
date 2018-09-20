import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FileUploaderProgress from './file-uploader-progress'

const MAX_SIZE_IN_MB = 60

export default class FileUploaderProgressGroup extends Component {
	constructor (props) {
		super(props)
		this.isDuplicateFileName = this.isDuplicateFileName.bind(this)
	}

	isDuplicateFileName (fileName) {
		let matchedIndex = this.props.files.findIndex((item) => {
			return !item.hidden && item.fileName === fileName
		})
		return matchedIndex >= 0
	}

	render () {
		let files = this.props.files ? this.props.files : []

		let visibleFileLength = files.filter((item) => {
			return !item.hidden
		}).length

		let filesWithEmptyUploader = visibleFileLength < this.props.fileLimit ? files.concat({}) : files

		return (
			<div className='file-uploader-progress-group'>
				<ul>
					{
						filesWithEmptyUploader.map((item, index) => {
							return <li key={index} style={item.hidden ? {display: 'none'} : null}>
								<FileUploaderProgress id={item.id} fileName={item.fileName} progress={item.progress}
									isCheckingMD5={item.isCheckingMD5}
									onDeleteFileByFileName={this.props.onDeleteFileByFileName}
									onUploadComplete={this.props.onUploadComplete}
									onCheckingMD5={this.props.onCheckingMD5}
									onProgress={this.props.onProgress}
									isDuplicateFileName={this.isDuplicateFileName}
									maxSizeInMB={MAX_SIZE_IN_MB} />
							</li>
						})
					}
				</ul>
			</div>
		)
	}
}

FileUploaderProgressGroup.propTypes = {
	files: PropTypes.array,
	onDeleteFileByFileName: PropTypes.func,
	onUploadComplete: PropTypes.func,
	onProgress: PropTypes.func,
	onCheckingMD5: PropTypes.func,
	fileLimit: PropTypes.number
}

FileUploaderProgressGroup.defaultProps = {
	fileLimit: 2
}
