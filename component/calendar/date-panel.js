import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CalendarUtil from './calendar-util'
import DayHeader from './day-header'
import YearMonthHeader from './year-month-header'
import moment from 'moment'
import DateNumberGrid from '../number-grid/date-number-grid'
import TimeSelctor from './time-selector'

export default class DatePanel extends Component {
	constructor (props) {
		super(props)

		this.state = {
			month: this.props.month,
			year: this.props.year,
			date: this.props.date,
			hour: this.props.hour,
			minute: this.props.minute,
			second: this.props.second,
			topStyle: null
		}

		this.onMonthChanged = this.onMonthChanged.bind(this)
		this.onYearChanged = this.onYearChanged.bind(this)
		this.onHourChanged = this.onHourChanged.bind(this)
		this.onMinuteChanged = this.onMinuteChanged.bind(this)
		this.onSecondChanged = this.onSecondChanged.bind(this)

		this.handleCalendarChange = this.handleCalendarChange.bind(this)
	}

	componentDidMount () {
		let rectangle = this.datePanel.getBoundingClientRect()
		if ((rectangle.top + rectangle.height) > window.innerHeight) {
			this.setState({
				topStyle: {top: '-' + rectangle.height + 'px'}
			})
		}
	}

	onMonthChanged (value) {
		let nextDate = moment().year(this.state.year).month(this.state.month - 1).month(value - 1)

		this.setState({
			month: nextDate.month() + 1,
			year: nextDate.year()
		})
	}

	onYearChanged (value) {
		this.setState({
			year: value
		})
	}

	onHourChanged (value) {
		this.setState({
			hour: value
		})
	}

	onMinuteChanged (value) {
		this.setState({
			minute: value
		})
	}

	onSecondChanged (value) {
		this.setState({
			second: value
		})
	}

	handleCalendarChange (year, month, date) {
		let newMoment = moment().year(year).month(month - 1).date(date)
		if (CalendarUtil.isDisabledDate(this.props.disabledRange, newMoment)) return
		this.props.onDateChanged(year, month, date, this.state.hour, this.state.minute, this.state.second)
	}

	render () {
		let datesInPanel = CalendarUtil.createDatesInPanel(this.state.year, this.state.month)
		return (
			<div className='date-panel' style={this.state.topStyle} ref={(datePanel) => { this.datePanel = datePanel }}>
				<YearMonthHeader
					year={this.state.year}
					onYearChanged={this.onYearChanged}
					month={this.state.month}
					onMonthChanged={this.onMonthChanged} />
				<DayHeader />
				<DateNumberGrid cells={datesInPanel}
					columnCount={CalendarUtil.DAY_HEADER.length}
					calculateColorStyleName={(item) => (CalendarUtil.calculateColorStyleNameOfDatePanel(item, {
						year: this.props.year,
						month: this.props.month,
						date: this.props.date
					}, {
						year: this.state.year,
						month: this.state.month,
						date: this.state.date
					}, this.props.disabledRange))}
					onCellSelected={this.handleCalendarChange} />
				<div className='buttons'>
					{
						this.props.visibleClearButton && <div className='button' onClick={this.props.onClear}>清空</div>
					}
					<div className='button' onClick={() => {
						let today = moment()
						this.handleCalendarChange(today.year(), today.month() + 1, today.date())
					}}>今天</div>
					<div className='button highlight' onClick={() => {
						this.handleCalendarChange(this.state.year, this.state.month, this.state.date)
					}}>确定</div>
				</div>
				{
					this.props.hasTime &&
					<TimeSelctor hour={this.state.hour}
						onHourChanged={this.onHourChanged}
						minute={this.state.minute}
						onMinuteChanged={this.onMinuteChanged}
						second={this.state.second}
						onSecondChanged={this.onSecondChanged} />
				}
			</div>
		)
	}
}

DatePanel.propTypes = {
	onClear: PropTypes.func,
	year: PropTypes.number,
	month: PropTypes.number,
	date: PropTypes.number,
	hour: PropTypes.number,
	minute: PropTypes.number,
	second: PropTypes.number,
	onDateChanged: PropTypes.func,
	hasTime: PropTypes.bool,
	disabledRange: PropTypes.object,
	visibleClearButton: PropTypes.bool
}

DatePanel.defaultProps = {
	disabledRange: null,
	visibleClearButton: true
}
