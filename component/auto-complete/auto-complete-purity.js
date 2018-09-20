import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {KeyCodeMap} from '../../util/keyboard/keyboard'
import HighLight from '../../util/high-light/high-light'
import { setTimeout } from 'timers'
import Dom from '../../util/dom/dom'
import ClassNames from 'classnames'
export default class AutoCompletePurity extends Component {
	constructor (props) {
		super(props)
		this.state = {
			inputLength: '3px',
			isShowSearchList: false,
			hoverIndex: -1,
			timeStamp: 0
		}

		this.onWindowClick = this.onWindowClick.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleBlur = this.handleBlur.bind(this)
		this.handleKeyDown = this.handleKeyDown.bind(this)
		this.updateScroll = this.updateScroll.bind(this)
		this.selectSearchValue = this.selectSearchValue.bind(this)
		this.parseToHTMLSuggestions = this.parseToHTMLSuggestions.bind(this)
	}

	componentDidMount () {
		window.addEventListener('keydown', this.handleKeyDown)
		window.addEventListener('click', this.onWindowClick)
	}

	componentWillReceiveProps (nextProps) {
		if (!nextProps.dataSource) return
		this.setState({
			isShowSearchList: nextProps.dataSource.length > 0
		})
	}

	componentWillUnmount () {
		window.removeEventListener('keydown', this.handleKeyDown)
		window.removeEventListener('click', this.onWindowClick)
	}

	onWindowClick (e) {
		this.setState({
			isShowSearchList: Dom.containsChild(this.input, e.target)
		})
	}

	handleChange (e) {
		let searchText = e.target.value
		let timeStamp = e.timeStamp
		setTimeout(() => {
			if (this.state.timeStamp === timeStamp) {
				this.props.onHandleInputChange(true, searchText)
			}
		}, 500)

		this.setState({
			timeStamp: timeStamp,
			inputLength: searchText.length !== 0 ? searchText.length * 16 + 'px' : '3px'
		})

		this.props.onHandleInputChange(false, searchText)
	}

	parseToJSX (item, searchText) {
		let itemValue = ''
		this.props.responseRecordPrimaryKeys.forEach((field, index) => {
			if (itemValue.length === 0) {
				itemValue = item[field]
			} else if (item[field].length > 0) {
				itemValue += '(' + item[field] + ')'
			}
		})
		let htmls = HighLight.tagKeyWords(searchText, itemValue)
		return <div>
			{
				htmls
			}
		</div>
	}

	parseToHTMLSuggestions (list, searchText) {
		if (searchText === '') return []
		let suggestions = []
		let text = searchText.trim()
		list.forEach((item) => {
			let suggestion = {
				id: item.id,
				html: this.parseToJSX(item, text)
			}
			suggestions.push(suggestion)
		})
		return suggestions
	}

	getHoverLiHeight () {
		let hoverLiHeight = 0
		for (let i = 0; i < this.state.hoverIndex; i++) {
			hoverLiHeight += this.dataList.getElementsByTagName('li')[i].clientHeight
		}

		return hoverLiHeight
	}

	updateScroll () {
		let allHeight = this.dataList.scrollHeight
		let ulHeight = this.dataList.clientHeight

		if (allHeight > ulHeight) { // 是否有滚动条
			let hoverLiHeight = this.getHoverLiHeight()
			this.dataList.scrollTop = hoverLiHeight
		}
	}

	selectSearchValue (index) {
		this.setState({
			isShowSearchList: false
		}, () => {
			this.handleClick(index)
		})
	}

	handleKeyDown (e) {
		if (this.state.isShowSearchList) {
			switch (e.keyCode) {
			case KeyCodeMap.ENTER:
				this.input.blur()
				this.selectSearchValue(this.state.hoverIndex)
				break

			case KeyCodeMap.UP:
				this.state.hoverIndex - 1 >= 0 &&
					this.setState({
						hoverIndex: this.state.hoverIndex - 1
					}, () => {
						this.updateScroll()
					})
				break

			case KeyCodeMap.DOWN:
				this.state.hoverIndex + 1 < this.props.dataSource.length &&
					this.setState({
						hoverIndex: this.state.hoverIndex + 1
					}, () => {
						this.updateScroll()
					})
				break

			default:
				break
			}
		}
	}

	handleClick (index) {
		this.props.onHandleSelect(index)
	}

	isResponsMatchedInputValue (responseData, inputValue) {
		return this.props.responseRecordPrimaryKeys.some((key) => {
			return responseData[key] === inputValue
		})
	}

	handleBlur () {
		let searchText = this.props.value.trim()
		let matchedCounter = 0
		let matchedIndex = -1
		this.props.dataSource.forEach((item, index) => {
			if (this.isResponsMatchedInputValue(item, searchText)) {
				matchedCounter++
				matchedIndex = index
			}
		})
		if (matchedCounter === 1) {
			this.props.onHandleSelect(matchedIndex, true, searchText)
		}
		this.clearInputValue()
	}

	clearInputValue () {
		typeof this.props.clearInputValue === 'function' && setTimeout(() => { // 加入延迟：为了解决在处理添加事件时，value值已被清空而无法获取
			this.props.clearInputValue() // input框失焦时，清空value值
		}, 200)
	}

	focus () {
		this.input.focus()
	}

	isEmpty () {
		return this.input.value.length === 0
	}

	getInputClassNames () {
		return ClassNames(
			this.props.disabled === true ? 'add-color' : ''
		)
	}

	render () {
		return (
			<div className='auto-complete-component' >
				<input className={`${this.getInputClassNames()} search-input`}
					tabIndex={this.props.tabIndex}
					style={this.props.changeInputLength ? {width: this.state.inputLength} : null}
					ref={(input) => { this.input = input }}
					placeholder={this.props.placeholder}
					value={this.props.value}
					onFocus={this.handleChange}
					onChange={this.handleChange}
					disabled={this.props.disabled}
					onBlur={this.handleBlur.bind(this)} />
				{
					this.props.dataSource && this.props.dataSource.length > 0 ? <ul className='dataList' ref={(c) => { this.dataList = c }}>
						{
							this.parseToHTMLSuggestions(this.props.dataSource, this.props.value).map((item, index) => {
								return <li
									key={index}
									className={this.state.hoverIndex === index ? 'hover' : ''}
									onClick={() => this.handleClick(index)}>
									{item.html}
								</li>
							})
						}
					</ul> : null
				}
			</div>
		)
	}
}

AutoCompletePurity.propTypes = {
	tabIndex: PropTypes.number,
	placeholder: PropTypes.string,
	changeInputLength: PropTypes.bool,
	value: PropTypes.string,
	dataSource: PropTypes.array,
	onHandleSelect: PropTypes.func,
	onHandleInputChange: PropTypes.func,
	clearInputValue: PropTypes.func,
	disabled: PropTypes.bool,
	responseRecordPrimaryKeys: PropTypes.array
}

AutoCompletePurity.defaultProps = {
	tabIndex: 2,
	placeholder: '',
	disabled: false,
	responseRecordPrimaryKeys: ['name']
}
