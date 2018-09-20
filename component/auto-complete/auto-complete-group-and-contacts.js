import React, {Component} from 'react'
import AutoComplete from './auto-complete'
import {KeyCodeMap} from '../../util/keyboard/keyboard'
import PropTypes from 'prop-types'

export default class AutoCompleteGroup extends Component {
	constructor (props) {
		super(props)

		this.handleKeyDown = this.handleKeyDown.bind(this)
		this.moveCursorByClick = this.moveCursorByClick.bind(this)
		this.insert = this.insert.bind(this)
		this.handleAutoCompleteGroupClick = this.handleAutoCompleteGroupClick.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleInputFocus = this.handleInputFocus.bind(this)

		this.state = {
			selectList: []
		}
	}

	componentDidMount () {
		window.addEventListener('keydown', this.handleKeyDown)
	}

	componentWillUnmount () {
		window.removeEventListener('keydown', this.handleKeyDown)
	}

	componentWillReceiveProps (nextProps) {
		if (!nextProps.selectList.groupList) return
		this.setState({
			selectList: nextProps.selectList.groupList.concat(nextProps.selectList.contactsList)
		})
	}

	handleInputFocus () {
		setTimeout(() => {
			this.autoComplete.focus()
		}, 100)
	}

	handleAutoCompleteGroupClick () {
		// this.props.onHandleCursorChange(this.props.selectList.length - 1)
		this.props.onHandleCursorChange(this.state.selectList.length - 1)
		// this.props.onHandleCursorChange(this.props.selectList.groupList.concat(this.props.selectList.contactsList).length - 1)
		this.handleInputFocus()
	}

	moveCursorByClick (e, index) {
		e.stopPropagation()
		e.nativeEvent.stopImmediatePropagation()
		this.props.onHandleCursorChange(index)
		this.handleInputFocus()
	}

	handleKeyDown (e) {
		if (document.activeElement.className === 'search-input') {
			let cursorPosition = this.props.cursorPosition
			switch (e.keyCode) {
			case KeyCodeMap.BACK_SPACE:
			case KeyCodeMap.DELETE:
				if (this.autoComplete.isEmpty() && cursorPosition >= 0) {
					this.props.onHandleDeleteSelect(cursorPosition)
					this.autoComplete.focus()
				}
				break

			case KeyCodeMap.LEFT:
				if (this.autoComplete.isEmpty() && cursorPosition >= 0) {
					cursorPosition -= 1
				}
				this.props.onHandleCursorChange(cursorPosition)
				this.autoComplete.focus()
				break

			case KeyCodeMap.RIGHT:
				if (this.autoComplete.isEmpty() && cursorPosition < this.state.selectList.length - 1) {
					cursorPosition += 1
				}
				this.props.onHandleCursorChange(cursorPosition)
				this.autoComplete.focus()
				break
			default:
				break
			}
		}
	}

	isSelectIdNotExist (selectId) {
		let matchedIndex = this.state.selectList.findIndex((item) => {
			return item.id === selectId
		})

		return matchedIndex === -1
	}

	insert (index) {
		let item = index >= 0 && index <= this.props.searchResultDataSource.length ? this.props.searchResultDataSource[index] : []
		let value = item.name ? item.name : ''
		let id = item.id ? item.id : ''
		let needUpdateList = this.isSelectIdNotExist(id)
		let cursorPosition = needUpdateList && value ? this.props.cursorPosition + 1 : this.props.cursorPosition

		this.props.onHandleSelect(needUpdateList, cursorPosition, index)
		this.handleInputFocus()
	}

	handleInputChange (needUpdateDataSource, inputValue) {
		this.props.onHandleInputChange(needUpdateDataSource, inputValue)
		this.autoComplete.focus()
	}

	getAutoComplete () {
		return <AutoComplete ref={(autoComplete) => { this.autoComplete = autoComplete }}
			value={this.props.value}
			searchResultDataSource={this.props.searchResultDataSource}
			onHandleSelect={this.insert}
			onHandleInputChange={this.handleInputChange}
			clearInputValue={this.props.clearInputValue}
			changeInputLength />
	}

	renderNonEmptyValues () {
		return this.state.selectList.map((item, index) => {
			let value = item.name
			return <li key={index} className='item'>
				{
					this.props.cursorPosition === -1 && index === 0 && this.getAutoComplete()
				}
				<span onClick={(e) => { this.moveCursorByClick(e, index) }}>{value + (value ? '; ' : '')}</span>
				{
					index === this.props.cursorPosition && this.getAutoComplete()
				}
			</li>
		})
	}

	renderEmptyValues () {
		return <li className='item'>
			{
				this.getAutoComplete()
			}
		</li>
	}

	render () {
		return (
			<div className='auto-complete-group' style={{marginBottom: '3px'}} onClick={this.handleAutoCompleteGroupClick}>
				<ul className='list'>
					{
						(this.state.selectList.length > 0) ? this.renderNonEmptyValues() : this.renderEmptyValues()
					}
				</ul>
			</div>
		)
	}
}

AutoCompleteGroup.propTypes = {
	value: PropTypes.string,
	searchResultDataSource: PropTypes.array,
	selectList: PropTypes.array,
	cursorPosition: PropTypes.number,
	onHandleDeleteSelect: PropTypes.func,
	onHandleSelect: PropTypes.func,
	onHandleInputChange: PropTypes.func,
	onHandleCursorChange: PropTypes.func,
	clearInputValue: PropTypes.func
}
