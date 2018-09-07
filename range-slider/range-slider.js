import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

export default class RangeSlider extends Component {
	constructor (props) {
		super(props)
		this.state = {
			left: 0,
			currentX: 0,
			isFromPointerDragging: false,
			isToPointerDragging: false,
			fromPointerIndex: this.getPointIndex(true, this.props.value.from),
			toPointerIndex: this.getPointIndex(false, this.props.value.to)
		}

		this.lastStepWidth = '5%'
		this.stepWidth = 100 / this.props.fieldList.length
		this.handleEvent = this.handleEvent.bind(this)
		this.handleFromPointerMouseDown = this.handleFromPointerMouseDown.bind(this)
		this.handleToPointerMouseDown = this.handleToPointerMouseDown.bind(this)
		this.handleMouseDown = this.handleMouseDown.bind(this)
		this.handleMouseMove = this.handleMouseMove.bind(this)
		this.handleMouseUp = this.handleMouseUp.bind(this)
	}

	getPointIndex (isFrom, value) {
		let index = this.props.fieldList.findIndex((field) => {
			return value === field.value
		})
		if (isFrom) {
			return index === -1 ? 0 : index
		}
		return index === -1 ? this.props.fieldList.length - 1 : index
	}

	componentDidMount () {
		document.addEventListener('mousemove', this.handleEvent)
		document.addEventListener('mouseup', this.handleEvent)
	}

	componentWillUnmount () {
		document.removeEventListener('mousemove', this.handleEvent)
		document.removeEventListener('mouseup', this.handleEvent)
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.value.type === 'reset') {
			this.setState({
				left: 0,
				currentX: 0,
				isFromPointerDragging: false,
				isToPointerDragging: false,
				fromPointerIndex: this.getPointIndex(true, nextProps.value.from),
				toPointerIndex: this.getPointIndex(false, nextProps.value.to)
			})
		}
	}

	handleEvent (e) {
		e.type === 'mousemove' && this.handleMouseMove(e)
		e.type === 'mouseup' && this.handleMouseUp(e)
	}

	handleFromPointerMouseDown (e) {
		this.handleMouseDown(true, e)
	}

	handleToPointerMouseDown (e) {
		this.handleMouseDown(false, e)
	}

	handleMouseDown (isFromPointer, e) {
		let event = e || window.event
		event.preventDefault()

		let draggableDom = isFromPointer ? this.fromPointer : this.toPointer
		let computedStyle = document.defaultView.getComputedStyle(draggableDom, null)

		this.setState({
			left: computedStyle.left,
			currentX: event.clientX,
			isFromPointerDragging: isFromPointer,
			isToPointerDragging: !isFromPointer,
			fromPointerIndex: this.state.fromPointerIndex,
			toPointerIndex: this.state.toPointerIndex
		})
	}

	getScaleIndex (targetLeft) {
		let left = 0
		let index = 0
		for (let i = 0; i < this.props.fieldList.length; i++) {
			left = document.getElementById('scale-' + i).getBoundingClientRect().left
			if (targetLeft + 10 > left) {
				index = i
			}
		}

		return index
	}

	handleMouseMove (e) {
		if (this.state.isFromPointerDragging || this.state.isToPointerDragging) {
			let e = event || window.event
			let draggableDom = this.state.isFromPointerDragging ? this.fromPointer : this.toPointer
			let curX = e.clientX
			let disX = curX - this.state.currentX

			/* 增加拖拽范围检测 */
			let currentLeft = parseInt(this.state.left) + disX
			let documentX = document.documentElement.clientWidth || document.body.clientWidth
			let boundaryLeft = 0
			let targetLeft = 0
			if (currentLeft <= boundaryLeft) { // 左侧边界
				targetLeft = boundaryLeft
			} else if (currentLeft >= (documentX - draggableDom.offsetWidth + boundaryLeft)) {
				targetLeft = (documentX - this.state.offsetX)
			} else {
				targetLeft = currentLeft
			}

			draggableDom.style.left = targetLeft + 'px'
		}
	}

	handleMouseUp (e) {
		let isFromDragging = this.state.isFromPointerDragging
		let isToPointerDragging = this.state.isToPointerDragging
		if (isFromDragging || isToPointerDragging) {
			let draggableDom = isFromDragging ? this.fromPointer : this.toPointer
			let computedStyle = draggableDom.getBoundingClientRect()
			let index = this.getScaleIndex(computedStyle.left)
			let fromPointerIndex = isFromDragging && index < this.state.toPointerIndex ? index : this.state.fromPointerIndex
			let toPointerIndex = this.state.isToPointerDragging && index > this.state.fromPointerIndex ? index : this.state.toPointerIndex
			let width = isFromDragging ? fromPointerIndex * this.stepWidth : toPointerIndex * this.stepWidth

			draggableDom.style.left = width + '%'
			draggableDom.style.marginLeft = isFromDragging && fromPointerIndex === 0 ? 0 : '-8px'
			this.setState({
				left: computedStyle.left,
				isFromPointerDragging: false,
				isToPointerDragging: false,
				fromPointerIndex: fromPointerIndex,
				toPointerIndex: toPointerIndex
			})

			this.props.onChange(this.props.fieldList[fromPointerIndex].value, this.props.fieldList[toPointerIndex].value)
		}
	}

	getLiClassName (index) {
		return ClassNames(
			index < this.state.fromPointerIndex || index >= this.state.toPointerIndex ? 'no-selected' : ''
		)
	}

	render () {
		let fromPointLeft = (this.stepWidth * this.state.fromPointerIndex) + '%'
		let toPointerLeft = (this.stepWidth * this.state.toPointerIndex) + '%'
		let fromPointMarginLeft = this.state.fromPointerIndex === 0 ? '0' : '-' + this.props.pointWidth / 2 + 'px'
		let toPointMarginLeft = '-' + this.props.pointWidth / 2 + 'px'
		return <div className='range-slider-component'>
			<ul className='clearfix'>
				{
					this.props.fieldList.map((data, index) => {
						let width = index === this.props.fieldList.length - 1 ? this.lastStepWidth : this.stepWidth + '%'
						return <li className={this.getLiClassName(index)} key={data.value} style={{width: width}}>
							<div>
								<span className='label'>{data.label}</span>
							</div>
							<div><span className='split-line' /></div>
							<div className='scale-container'><span className='scale' id={`scale-${index}`} /></div>
						</li>
					})
				}
			</ul>
			<div className='from-container'>
				<span className='pointer from-pointer' style={{width: this.props.pointWidth, height: this.props.pointWidth, left: fromPointLeft, marginLeft: fromPointMarginLeft}} ref={(c) => { this.fromPointer = c }} onMouseDown={this.handleFromPointerMouseDown} />
			</div>
			<div className='to-container'>
				<span className='pointer to-pointer' style={{width: this.props.pointWidth, height: this.props.pointWidth, left: toPointerLeft, marginLeft: toPointMarginLeft}} ref={(c) => { this.toPointer = c }} onMouseDown={this.handleToPointerMouseDown} /></div>
		</div>
	}
}

RangeSlider.propTypes = {
	pointWidth: PropTypes.number,
	value: PropTypes.object,
	fieldList: PropTypes.array,
	onChange: PropTypes.func
}

RangeSlider.defaultProps = {
	pointWidth: 16
}
