import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

class LazyComponent extends PureComponent {
	componentDidMount () {
		this.props.load().then((result) => {
			this.setState({
				component: result.default
			})
		})
	}

	componentDidUpdate () {
		this.props.onUpdateComplete && this.props.onUpdateComplete()
	}

	render () {
		const {component} = this.state || {}
		return component ? this.props.children(component) : null
	}
}

LazyComponent.propTypes = {
	load: PropTypes.any,
	children: PropTypes.any,
	onUpdateComplete: PropTypes.func
}

export default function lazy (normalClass, handleUpdateComplete) {
	return function Wrapper (props) {
		return <LazyComponent load={normalClass} onUpdateComplete={handleUpdateComplete}>
			{(Clazz) => <Clazz {...props} />}
		</LazyComponent>
	}
}
