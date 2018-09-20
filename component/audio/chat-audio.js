import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Dom from '../../util/dom/dom'
import ClassNames from 'classnames'
import { setInterval, setTimeout } from 'timers'

export default class ChatAudio extends Component {
	constructor (props) {
		super(props)

		this.state = {
			duration: 0,
			isPlaying: false
		}

		this.audio = null
		this.timeOutId = null
		this.intervalId = null
		this.clickAudio = this.clickAudio.bind(this)
	}

	componentDidMount () {
		this.audio.addEventListener('loadeddata', () => {
			this.setState({
				duration: Math.round(this.audio.duration)
			})
		})
		window.addEventListener('click', this.clickAudio)
	}

	componentWillUnmount () {
		window.removeEventListener('click', this.clickAudio)
	}

	clickAudio (e) {
		e.stopPropagation()
		let isClickSelf = Dom.containsChild(this.audioInfo, e.target)
		let isClickOtherAudio = e.target.className.indexOf('audio-info') !== -1 || e.target.parentNode.className.indexOf('audio-info') !== -1
		let isClickAudio = isClickSelf || isClickOtherAudio

		if (!isClickAudio) return null

		let isPlaying = isClickSelf ? !this.state.isPlaying : false
		this.setState({
			isPlaying: isPlaying
		})

		if (isPlaying) {
			this.audio.play()
			this.timeOutId = setTimeout(() => {
				if (this.audio.ended) {
					this.setState({
						isPlaying: false
					})
				} else {
					this.startIntervalCheckEnded()
				}
				if (this.timeOutId) {
					setTimeout(this.timeOutId)
				}
			}, this.audio.duration * 1000 + 200)
		} else {
			this.audio.pause()
			// this.audio.currentTime = 1
			this.timeOutId && clearInterval(this.timeOutId)
			this.intervalId && clearInterval(this.intervalId)
		}
	}

	startIntervalCheckEnded () {
		this.intervalId = setInterval(() => {
			if (this.audio.ended) {
				this.setState({
					isPlaying: false
				})
				if (this.intervalId) {
					clearInterval(this.intervalId)
				}
			}
		}, 1000)
	}

	getImageClassNames () {
		return ClassNames(
			'image',
			this.state.isPlaying ? 'is-playing' : ''
		)
	}
	render () {
		let audioMinWidth = 50
		let audioMaxWidth = 600
		let audioWidth = audioMinWidth + (audioMaxWidth - audioMinWidth) * this.state.duration / 60
		return (
			<div className='audio-component' style={{width: audioWidth + 'px'}}>
				<span className='audio-info' ref={(audioInfo) => { this.audioInfo = audioInfo }}>
					<span className={this.getImageClassNames()} />
					<span className='duration'>{this.state.duration}{`"`}</span>
				</span>
				<audio preload='auto' hidden='true' ref={(audio) => { this.audio = audio }} >
					<source src={this.props.source} type='audio/mpeg' />
				</audio>
			</div>
		)
	}
}

ChatAudio.propTypes = {
	source: PropTypes.string
}
