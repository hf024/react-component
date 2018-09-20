import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import DragableEnhancer from '../../util/hoc/dragable-enhancer'
import CentralizeEnhancer from '../../util/hoc/centralize-enhancer'

class Popup extends Component {
	constructor (props) {
		super(props)

		this.close = this.close.bind(this)

		this.state = {
			popupStyle: {},
			showLazyPopupHeader: false
		}
	}

	close () {
		this.props.custom.onClose && this.props.custom.onClose()
		this.props.onClose()
	}

	getPopupHeaderClassNames () {
		return ClassNames(
			'popup-header',
			'user-select-none',
			{
				'dragable': this.props.custom.dragable
			},
			{
				'center-header': this.props.custom.centerHeader
			},
			{
				'header-border-bottom': this.props.custom.headerBorderBottom
			}
		)
	}

	componentWillReceiveProps (nextProps) {
		this.setState({
			showLazyPopupHeader: true
		})
	}

	getLazyPopupHeader () {
		// For popup that using lazy loaded component defined in Context, we have to set lazyPopupHeader to be true in custom.
		if (this.props.custom.lazyPopupHeader) {
			return this.state.showLazyPopupHeader && this.getPopupHeader()
		}
		return this.getPopupHeader()
	}

	getPopupHeader () {
		if (this.props.custom.hideHeader) return null
		return (
			<div className={this.getPopupHeaderClassNames()} ref={(dragableArea) => { this.dragableArea = dragableArea }}>
				<span className='header-title'>{this.props.custom.headerTitle}</span>
				{
					!this.props.custom.hideCloseIcon && <div className='close' onClick={this.close}>×</div>
				}
			</div>
		)
	}

	setComponentStyle (newStyle) {
		this.setState({
			popupStyle: newStyle
		})
	}

	getOverlayClassNames () {
		return ClassNames(
			'overlay',
			{
				transparent: this.props.custom.overlayTransparent
			}
		)
	}

	render () {
		return (
			<div className='popup-container'>
				<div className={this.getOverlayClassNames()} />
				<div className='clearfix popup'
					style={this.state.popupStyle}
					ref={(popup) => {
						this.popup = popup
						this.visibleArea = popup
					}}>
					{
						this.getLazyPopupHeader()
					}
					{
						this.props.custom && this.props.custom.ui
					}
				</div>
			</div>
		)
	}
}

Popup.propTypes = {
	custom: PropTypes.object,
	onClose: PropTypes.func
}

export default DragableEnhancer(CentralizeEnhancer(Popup))
