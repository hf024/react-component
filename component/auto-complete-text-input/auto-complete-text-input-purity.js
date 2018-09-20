import React, {Component} from 'react'
import PropTypes from 'prop-types'
import WarningNotice from '../form-viewer-editor/warning-notice'
import AutoCompletePurity from '../../ui/auto-complete/auto-complete-purity'
import {request} from '../../util/http/ajax'

export default class AutoCompleteTextInputPurity extends Component {
	constructor (props) {
		super(props)

		this.updateValue = this.updateValue.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleClearInputValue = this.handleClearInputValue.bind(this)

		this.state = {
			dataSource: []
		}
	}

	updateValue (index, isAutoUpdate = false, inputValue = '') {
		if (index < 0 || index >= this.state.dataSource.length) {
			return false
		}
		let item = this.state.dataSource[index]
		let newValue = {}
		this.props.api.dataParserDescriptor.forEach((element) => {
			newValue[element.localFieldName] = item[element.remoteFieldName]
		})

		let text = ''
		this.props.api.responseRecordPrimaryKeys.forEach((field, index) => {
			if (text.length === 0) {
				text = item[field]
			} else if (item[field].length > 0) {
				text += '(' + item[field] + ')'
			}
		})

		newValue.text = isAutoUpdate ? inputValue : text
		this.props.onChange(this.props.fieldName, newValue)

		if (!isAutoUpdate) {
			this.setState({
				dataSource: []
			})
		}
	}

	handleInputChange (needUpdateDataSource, inputValue) {
		if (this.props.value.text !== inputValue) {
			let newValue = {}

			this.props.api.dataParserDescriptor.forEach((element) => {
				newValue[element.localFieldName] = ''
			})

			newValue.text = inputValue
			this.props.onChange(this.props.fieldName, newValue)
		}

		if (needUpdateDataSource && inputValue.length > 0) {
			request(this.props.api.config, {
				[this.props.api.requestParameterName]: inputValue.trim()
			}).then((result) => {
				let responseParameterName = this.props.api.responseParameterName
				let newDataSource = result[responseParameterName] || result.retdata[responseParameterName]
				this.setState({
					dataSource: newDataSource
				})
			})
		} else {
			this.setState({
				dataSource: []
			})
		}
	}

	handleClearInputValue () {
		this.setState({
			dataSource: []
		})
		this.props.onBlur && this.props.onBlur(this.props.fieldName)
	}

	render () {
		return (
			<div className='text-input'>
				<div className='label-area'>
					{
						this.props.mandatory ? <span className='star'>*</span> : null
					}
					<label className='label'>{this.props.label}</label>
				</div>
				<AutoCompletePurity value={this.props.value.text}
					tabIndex={this.props.tabIndex}
					placeholder={this.props.placeholder}
					responseRecordPrimaryKeys={this.props.api.responseRecordPrimaryKeys}
					dataSource={this.state.dataSource}
					onHandleSelect={this.updateValue}
					onHandleInputChange={this.handleInputChange}
					clearInputValue={this.handleClearInputValue}
					disabled={this.props.disabled}
					changeInputLength={false}
				/>
				<WarningNotice hasWarning={this.props.hasWarning} WarningText={this.props.errorTip} skin='error-info' />
			</div>
		)
	}
}

AutoCompleteTextInputPurity.propTypes = {
	tabIndex: PropTypes.number,
	placeholder: PropTypes.string,
	api: PropTypes.object,
	fieldName: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	mandatory: PropTypes.bool,
	onChange: PropTypes.func,
	hasWarning: PropTypes.bool,
	errorTip: PropTypes.string,
	onBlur: PropTypes.func,
	disabled: PropTypes.bool
}

AutoCompleteTextInputPurity.defaultProps = {
	hasWarning: false,
	disabled: false
}
