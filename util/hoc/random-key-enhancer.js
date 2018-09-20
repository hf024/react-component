import React from 'react'

function RandomKeyEnhancer (InnerComponent) {
	class OuterComponent extends React.Component {
		render () {
			return <InnerComponent key={String(Math.random())} {...this.props} />
		}
	}

	return OuterComponent
}

export default RandomKeyEnhancer
