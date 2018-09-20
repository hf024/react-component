import React, {Component} from 'react'

export default class CenterPrompt extends Component {
	constructor (props) {
		super(props)

		this.state = {
			visible: false,
			text: '',
			type: '',
			isFailed: false,
			bgType: ''
		}
	}

	show (text, isFailed, bgType) {
		let this_ = this
		setTimeout(() => {
			this_.setState({
				visible: true,
				text: text,
				type: '',
				isFailed: isFailed,
				bgType: bgType
			})
		}, 500)
		setTimeout(() => {
			this_.setState({
				visible: false,
				text: ''
			})
		}, 2500)
	}

	showIM (text, isFailed, callBackFunc) {
		let this_ = this
		setTimeout(() => {
			this_.setState({
				visible: true,
				text: text,
				type: 'im',
				isFailed: isFailed
			})
		}, 50)
		setTimeout(() => {
			this_.setState({
				visible: false,
				text: ''
			}, () => {
				typeof callBackFunc === 'function' && callBackFunc()
			})
		}, 2050)
	}

	render () {
		if (this.state.type === 'im') {
			return (
				<div >
					{
						this.state.visible ? (<span className='im-prompt-container'><span className={this.state.isFailed ? 'icon error' : 'icon success'} /><span className='prompt-content'>{this.state.text}</span></span>) : ''
					}
				</div>
			)
		} else {
			return (
				<div>
					{
						this.state.visible ? (<div className={`prompt-container ${this.state.bgType} `}><span className={`icon-tag ${this.state.isFailed ? 'icon-error-symbol' : 'icon-correct'}`} /> <span>{this.state.text}</span></div>) : ''
					}
				</div>
			)
		}
	}
}
