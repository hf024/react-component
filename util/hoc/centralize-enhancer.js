import React from 'react'
import PropTypes from 'prop-types'
import VerticalPosition from '../../component/popup/vertical-position'

function CentralizeEnhancer (InnerComponent) {
	class OuterComponent extends React.Component {
		componentDidMount () {
			this.innerComponentRef.setComponentStyle(this.calculateOppositeMovementStyle())
		}

		componentWillReceiveProps (nextProps) {
			if (nextProps.hasDragged) return
			this.innerComponentRef.setComponentStyle(this.calculateOppositeMovementStyle())
		}

		calculateOppositeMovementStyle () {
			let rectangle = this.innerComponentRef.popup.getBoundingClientRect()

			let resultStyle = {
				marginLeft: (0 - rectangle.width / 2) + 'px'
			}

			this.addPropertyBySkin(resultStyle)

			return resultStyle
		}

		addPropertyBySkin (resultStyle) {
			if (this.props.custom.skin === VerticalPosition.VERTICAL_TOP_170_PIXEL) {
				resultStyle.top = '170px'
				return
			}

			if (this.props.custom.skin === VerticalPosition.VERTICAL_TOP_MIDDLE) {
				let rectangle = this.innerComponentRef.popup.getBoundingClientRect()
				resultStyle.marginTop = (0 - rectangle.height / 2) + 'px'
				return
			}

			resultStyle.top = '8%'
		}

		render () {
			return <InnerComponent ref={(innerComponentRef) => { this.innerComponentRef = innerComponentRef }} {...this.props} />
		}
	}

	OuterComponent.propTypes = {
		custom: PropTypes.object,
		hasDragged: PropTypes.bool
	}

	return OuterComponent
}

export default CentralizeEnhancer
