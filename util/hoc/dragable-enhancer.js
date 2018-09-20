import React from 'react'
import PropTypes from 'prop-types'
import DOM from '../dom/dom'
import Position from './position'

export function getLastInnerComponentRef (host) {
	let lastInnerComponentRef = host

	while (lastInnerComponentRef.innerComponentRef) {
		lastInnerComponentRef = lastInnerComponentRef.innerComponentRef
	}

	return lastInnerComponentRef
}

function DragableEnhancer (InnerComponent) {
	class OuterComponent extends React.Component {
		constructor (props) {
			super(props)

			this.state = {
				hasDragged: false,
				isDragging: false
			}

			this.handleEvent = this.handleEvent.bind(this)
			this.handleMouseDown = this.handleMouseDown.bind(this)
			this.handleMouseMove = this.handleMouseMove.bind(this)
			this.handleMouseUp = this.handleMouseUp.bind(this)

			this.diffX = 0
			this.diffY = 0
			this.beginTime = null
			this.endTime = null
		}

		isDraggable () {
			return (this.props.custom && this.props.custom.dragable) || this.props.draggable
		}

		componentDidMount () {
			this.isDraggable() && this.enableDragAndDrop()
		}

		componentWillUnmount () {
			this.isDraggable() && this.disableDragAndDrop()
		}

		enableDragAndDrop () {
			document.addEventListener('mousedown', this.handleEvent)
			document.addEventListener('mousemove', this.handleEvent)
			document.addEventListener('mouseup', this.handleEvent)
		}

		disableDragAndDrop () {
			document.removeEventListener('mousedown', this.handleEvent)
			document.removeEventListener('mousemove', this.handleEvent)
			document.removeEventListener('mouseup', this.handleEvent)
		}

		handleEvent (e) {
			e.type === 'mousedown' && this.handleMouseDown(e)
			e.type === 'mousemove' && this.handleMouseMove(e)
			e.type === 'mouseup' && this.handleMouseUp(e)
		}

		handleMouseDown (e) {
			if (DOM.containsChild(getLastInnerComponentRef(this).dragableArea, e.target)) {
				let rectangle = getLastInnerComponentRef(this).visibleArea.getBoundingClientRect()

				this.diffX = e.clientX - rectangle.left
				this.diffY = e.clientY - rectangle.top
				this.beginTime = new Date().getTime()
				this.setState({
					isDragging: true
				})
			}
		}

		handleMouseMove (e) {
			if (this.state.isDragging) {
				let position = new Position(e.clientX - this.diffX, e.clientY - this.diffY)
				let rectangle = getLastInnerComponentRef(this).visibleArea.getBoundingClientRect()
				position = Position.calculateSouthEastCase(position, rectangle, window)
				position = Position.calculateNorthWestCase(position)

				this.setState({
					hasDragged: true
				})

				getLastInnerComponentRef(this).setComponentStyle(position.toPixelObject())
			}
		}

		handleMouseUp (e) {
			this.endTime = new Date().getTime()
			if (this.endTime - this.beginTime < 200) {
				typeof this.props.onClick === 'function' && this.props.onClick()
			}
			this.setState({
				isDragging: false
			})
		}

		render () {
			return <InnerComponent ref={(innerComponentRef) => { this.innerComponentRef = innerComponentRef }}
				hasDragged={this.state.hasDragged}
				{...this.props} />
		}
	}

	OuterComponent.propTypes = {
		custom: PropTypes.object,
		draggable: PropTypes.bool,
		onClick: PropTypes.func
	}

	OuterComponent.defaultProps = {
		onClick: null
	}
	return OuterComponent
}

export default DragableEnhancer
