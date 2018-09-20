import React from 'react'
import PropTypes from 'prop-types'
import Dom from '../dom/dom'

function WindowClickEnhancer (InnerComponent) {
	class OuterComponent extends React.Component {
		constructor (props) {
			super(props)
			this.onWindowClick = this.onWindowClick.bind(this)
		}

		componentDidMount () {
			window.addEventListener('click', this.onWindowClick)
		}

		componentWillUnmount () {
			window.removeEventListener('click', this.onWindowClick)
		}

		onWindowClick (e) {
			if (!Dom.containsChild(this.innerComponentRef.flyWidget, e.target)) {
				this.props.onMouseLeave && this.props.onMouseLeave()
			}
		}

		render () {
			return <InnerComponent ref={(innerComponentRef) => { this.innerComponentRef = innerComponentRef }} {...this.props} />
		}
	}

	OuterComponent.propTypes = {
		onMouseLeave: PropTypes.func
	}

	return OuterComponent
}

export default WindowClickEnhancer
