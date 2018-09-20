import React, {Component} from 'react'
import Popup from './popup'
import {KeyCodeMap} from '../../util/keyboard/keyboard'

export default class PopupStack extends Component {
	constructor (props) {
		super(props)
		this.state = {
			customs: []
		}
		this.popCustom = this.popCustom.bind(this)
		this.handleKeyDown = this.handleKeyDown.bind(this)
	}

	componentDidMount () {
		window.addEventListener('keydown', this.handleKeyDown)
	}

	componentWillUnmount () {
		window.removeEventListener('keydown', this.handleKeyDown)
	}

	handleKeyDown (e) {
		const customs = this.state.customs
		if (e.keyCode === KeyCodeMap.ESCAPE && customs.length > 0) {
			const lastCustom = customs[customs.length - 1]
			lastCustom.supportEscapeKey && this.popCustom()
		}
	}

	pushCustom (custom) {
		let customs = this.state.customs
		customs.push(custom)
		this.setState({
			customs: customs
		})
	}

	pushUniqueCustom (custom) {
		let customs = this.state.customs

		if (custom.isUnique) {
			let exist = customs.some((item) => {
				return item.isUnique
			})
			if (exist) return
		}

		customs.push(custom)
		this.setState({
			customs: customs
		})
	}

	popCustom () {
		let customs = this.state.customs
		customs.pop()
		this.setState({
			customs: customs
		})
	}

	render () {
		return (
			<div>
				{
					this.state.customs.map((item, index) => {
						return <Popup custom={item} key={index} onClose={this.popCustom} />
					})
				}
			</div>
		)
	}
}
