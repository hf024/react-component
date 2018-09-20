import React from 'react'
import PropTypes from 'prop-types'

const BlankSignal = (props) => {
	return <div className={'blank-signal-component ' + props.sizeType} >
		<div className='content'>
			<img className='blank-image' src={props.imageSrc} />
			<div className='tips'>
				<p className='message'>{props.message}</p>
				<p className='description'>{props.description}</p>
			</div>
		</div>
	</div>
}

BlankSignal.propTypes = {
	imageSrc: PropTypes.string,
	message: PropTypes.string,
	sizeType: PropTypes.string,
	description: PropTypes.string
}

BlankSignal.defaultProps = {
	imageSrc: require('../../asset/image/qtrade/blank1.svg'),
	message: '暂无信息',
	sizeType: 'big',
	description: ''
}

export default BlankSignal
