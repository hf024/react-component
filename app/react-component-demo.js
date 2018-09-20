
import React, {Component} from 'react'
import RangeSlider from '../component/range-slider/range-slider'
import AvatarCropper from '../component/cropper/avatar-cropper'
import PopupStack from '../component/popup/popup-stack'
import PopupService from '../component/popup/popup-service'
import CenterPrompt from '../component/center-prompt/center-prompt'
import PromptService from '../component/center-prompt/prompt-service'
import ChatAudio from '../component/audio/chat-audio'

export default class ReactComponentDemo extends Component {
	constructor (props) {
		super(props)
		this.state = {
			avatarSrc: ''
		}
	}

	componentDidMount () {
		PopupService.init(this.popupStack)
		PromptService.init(this.centerPrompt)
	}

	render () {
		return (<div className='react-component-container'>
			<h1>Demo 1: RangeSlider</h1>
			<div className='range-slider-container demo-container'>
				<RangeSlider fieldList={
					[
						{value: '0', label: '0'},
						{value: '30', label: '1M'},
						{value: '90', label: '3M'},
						{value: '180', label: '6M'},
						{value: '365', label: '1Y'},
						{value: '1825', label: '5Y'},
						{value: '3650', label: '10Y'},
						{value: '', label: '10Y<'}
					]}
					value={{from: '0', to: '', type: ''}} onChange={ (val1, val2) => console.log(val1, val2)} />
			</div>
			<h1>Demo 2: Avator Cropper</h1>
			<div className='avatar-cropper-container demo-container'>
				<AvatarCropper fieldName='face-url' label='' src={this.state.avatarSrc} disabled={false} mandatory={false} onChange={(src) => {
					this.setState({
						avatarSrc: src
					})
				}}/>
			</div>
			<h1>Demo 3: Audio Demo</h1>
			<div className='Audio-demo-container demo-container'>
				<div className='audio-record clearfix'>
					<ChatAudio source='http://www.w3school.com.cn/i/song.mp3' />
				</div>
				<div className='audio-record clearfix'>
					<ChatAudio source='https://test.qtrade.com.cn/horse.mp3' />
				</div>
				<div className='audio-record clearfix'>
					<ChatAudio source='https://test.qtrade.com.cn/chat_file/FF7AE93BC9F19FA0174C995E6B12D189/51c26e517bbdedba65e8888144d13085.mp3' />
				</div>
			</div>
			<h1>Demo 4: </h1>
			<div className=''>
				ddd...
			</div>
			<PopupStack ref={(popupStack) => { this.popupStack = popupStack }} />
			<CenterPrompt ref={(centerPrompt) => { this.centerPrompt = centerPrompt }} />	
		</div>)
	}
}