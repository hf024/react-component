import React, {Component} from 'react'
import PropTypes from 'prop-types'
import DigitPanel from './digit-panel'
import CalendarUtil from './calendar-util'
import ClassNames from 'classnames'

const HOUR = 'HOUR'
const MINUTE = 'MINUTE'
const SECOND = 'SECOND'

const PanelType = {
	[HOUR]: {
		scope: 24,
		label: '小时',
		columnCount: 5
	},
	[MINUTE]: {
		scope: 60,
		label: '分钟',
		columnCount: 10
	},
	[SECOND]: {
		scope: 60,
		label: '秒数',
		columnCount: 10
	}
}

export default class TimeSelector extends Component {
	constructor (props) {
		super(props)

		this.state = {
			visibleDigitPanel: false,
			panelTypeKey: HOUR,
			currentDigit: 0
		}

		this.openDigitPanel = this.openDigitPanel.bind(this)
		this.hideDigitPanel = this.hideDigitPanel.bind(this)
		this.updateDigit = this.updateDigit.bind(this)
	}

	openDigitPanel (e, panelTypeKey, currentDigit) {
		if (this.state.visibleDigitPanel && this.state.panelTypeKey === panelTypeKey) return

		e.stopPropagation()
		this.setState({
			visibleDigitPanel: true,
			panelTypeKey: panelTypeKey,
			currentDigit: currentDigit
		})
	}

	hideDigitPanel () {
		this.setState({
			visibleDigitPanel: false
		})
	}

	updateDigit (value) {
		this.setState({
			currentDigit: value,
			visibleDigitPanel: false
		})
		this.state.panelTypeKey === HOUR && this.props.onHourChanged(value)
		this.state.panelTypeKey === MINUTE && this.props.onMinuteChanged(value)
		this.state.panelTypeKey === SECOND && this.props.onSecondChanged(value)
	}

	getDigitTypeClassNames (panelTypeKey) {
		return ClassNames(
			'digit-type',
			{
				highlight: this.state.visibleDigitPanel && this.state.panelTypeKey === panelTypeKey
			}
		)
	}

	render () {
		return (
			<div className='time-selector'>
				<div className='togglers' onClick={this.hideDigitPanel}>
					<div className='label'>时间</div>
					<div className='group'>
						<div className={this.getDigitTypeClassNames(HOUR)} onClick={(e) => this.openDigitPanel(e, HOUR, this.props.hour)}>{CalendarUtil.addPrefixZero(this.props.hour)}</div>
						:
						<div className={this.getDigitTypeClassNames(MINUTE)} onClick={(e) => this.openDigitPanel(e, MINUTE, this.props.minute)}>{CalendarUtil.addPrefixZero(this.props.minute)}</div>
						:
						<div className={this.getDigitTypeClassNames(SECOND)} onClick={(e) => this.openDigitPanel(e, SECOND, this.props.second)}>{CalendarUtil.addPrefixZero(this.props.second)}</div>
					</div>
				</div>
				{
					this.state.visibleDigitPanel &&
						<DigitPanel digitScope={PanelType[this.state.panelTypeKey]} currentDigit={this.state.currentDigit} onDigitChanged={this.updateDigit} />
				}
			</div>
		)
	}
}

TimeSelector.propTypes = {
	hour: PropTypes.number,
	minute: PropTypes.number,
	second: PropTypes.number,
	onHourChanged: PropTypes.func,
	onMinuteChanged: PropTypes.func,
	onSecondChanged: PropTypes.func
}
