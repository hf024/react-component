import React, {Component} from 'react'
import Dom from '../../util/dom/dom'
import DatePanel from './date-panel'
import PropTypes from 'prop-types'
import moment from 'moment'
import ClassNames from 'classnames'
import CalendarUtil from './calendar-util'

export default class Calendar extends Component {
	constructor (props) {
		super(props)

		this.state = {
			visibleDatePanel: false,
			calendarObject: CalendarUtil.getCalendarObject(this.props.dateValue, this.props.hasTime),
			displayDateValue: CalendarUtil.getDisplayDateValue(this.props.dateValue, this.props.hasTime)
		}

		this.onWindowClick = this.onWindowClick.bind(this)
		this.onInputFocus = this.onInputFocus.bind(this)
		this.handleDateChange = this.handleDateChange.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	componentWillReceiveProps (nextProps) {
		this.setState({
			calendarObject: CalendarUtil.getCalendarObject(nextProps.dateValue, nextProps.hasTime),
			displayDateValue: CalendarUtil.getDisplayDateValue(nextProps.dateValue, nextProps.hasTime)
		})
	}

	finishUpdate (newDateValue) {
		this.props.onChange(newDateValue)
		this.removeClickEventListener()
		this.setState({
			visibleDatePanel: false,
			calendarObject: CalendarUtil.getCalendarObject(newDateValue, this.props.hasTime),
			displayDateValue: CalendarUtil.getDisplayDateValue(newDateValue, this.props.hasTime)
		})
	}

	handleDateChange (year, month, date, hour, minute, second) {
		let current = moment().date(date).month(month - 1).year(year).hour(hour).minute(minute).second(second)
		this.finishUpdate(current.format(this.props.hasTime ? CalendarUtil.FORMAT_WITH_TIME : CalendarUtil.FORMAT_WITHOUT_TIME))
	}

	handleInputChange (e) {
		this.setState({
			displayDateValue: e.target.value
		})
	}

	removeClickEventListener () {
		window.removeEventListener('click', this.onWindowClick)
	}

	addClickEventListener () {
		window.addEventListener('click', this.onWindowClick)
	}

	onWindowClick (e) {
		if (Dom.containsChild(this.calendar, e.target)) {
			this.setState({
				visibleDatePanel: true
			})
			return
		}
		this.finishUpdate(this.state.displayDateValue)
	}

	componentWillUnmount () {
		this.removeClickEventListener()
	}

	onInputFocus () {
		this.addClickEventListener()
	}

	getDatePanelContainerClassNames () {
		return ClassNames(
			'date-panel-container'
		)
	}

	getDateInputClassNames () {
		return ClassNames(
			'date-input',
			{
				'has-time': this.props.hasTime
			}
		)
	}

	render () {
		return (
			<div className='calendar-component user-select-none' ref={(calendar) => { this.calendar = calendar }}>
				<input className={this.getDateInputClassNames()} onFocus={this.onInputFocus}
					readOnly={this.props.isReadOnly}
					value={this.state.displayDateValue}
					maxLength={this.props.maxLength}
					onChange={this.handleInputChange} tabIndex='1' />
				<i className='calender-graph icon-basic-calendar' onClick={this.onInputFocus} />
				<div className='date-panel-container' ref={(datePanelContainer) => { this.datePanelContainer = datePanelContainer }}>
					{
						this.state.visibleDatePanel &&
						<DatePanel onClear={() => this.finishUpdate('')}
							{...this.state.calendarObject}
							hasTime={this.props.hasTime}
							visibleClearButton={this.props.visibleClearButton}
							onDateChanged={this.handleDateChange}
							disabledRange={this.props.disabledRange} />
					}
				</div>
			</div>
		)
	}
}

Calendar.propTypes = {
	dateValue: PropTypes.string,
	onChange: PropTypes.func,
	hasTime: PropTypes.bool,
	disabledRange: PropTypes.object,
	maxLength: PropTypes.number,
	isReadOnly: PropTypes.bool,
	visibleClearButton: PropTypes.bool
}

Calendar.defaultProps = {
	hasTime: false,
	disabledRange: null,
	maxLength: 19,
	isReadOnly: false,
	visibleClearButton: true
}
