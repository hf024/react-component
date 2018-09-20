import moment from 'moment'
import _ from 'lodash'

const DAYS_PER_WEEK = 7
const ROWS_PER_PANEL = 6
const SIZE_PER_PANEL = DAYS_PER_WEEK * ROWS_PER_PANEL
const DAY_HEADER = ['日', '一', '二', '三', '四', '五', '六']
const FORMAT_WITH_TIME = 'YYYY-MM-DD HH:mm:ss'
const FORMAT_WITHOUT_TIME = 'YYYY-MM-DD'

function createDatesInPanel (year, month) {
	let firstDateOfMonth = moment(String(year) + String(month), 'YYYYMM')
	let firstDateOfPanel = moment(firstDateOfMonth).subtract(firstDateOfMonth.day(), 'days')
	return _.range(SIZE_PER_PANEL).map((item, index) => {
		return moment(firstDateOfPanel).add(index, 'days')
	})
}

function sameDate (item, props) {
	return item.date() === props.date && item.month() + 1 === props.month && item.year() === props.year
}

function sameMonth (item, state) {
	return item.month() + 1 === state.month && item.year() === state.year
}

function toZeroTime (input) {
	return moment(input).hour(0).minute(0).second(0).millisecond(0)
}

function inObjectRange (disabledRange, item) {
	if (!disabledRange) return false
	if (!disabledRange.from && !disabledRange.to) return false

	let itemOfZeroTime = toZeroTime(item)

	if (!disabledRange.from) {
		let toOfZeroTime = toZeroTime(disabledRange.to)
		return itemOfZeroTime.isBefore(toOfZeroTime)
	}

	if (!disabledRange.to) {
		let fromOfZeroTime = toZeroTime(disabledRange.from)
		return fromOfZeroTime.isBefore(itemOfZeroTime)
	}

	let fromOfZeroTime = toZeroTime(disabledRange.from)
	let toOfZeroTime = toZeroTime(disabledRange.to)

	return fromOfZeroTime.isBefore(itemOfZeroTime) && itemOfZeroTime.isBefore(toOfZeroTime)
}

function isDisabledDate (disabledRange, item) {
	if (Array.isArray(disabledRange)) {
		return disabledRange.some((element) => {
			return inObjectRange(element, item)
		})
	}
	return inObjectRange(disabledRange, item)
}

function calculateColorStyleNameOfDatePanel (item, props, state, disabledRange) {
	if (isDisabledDate(disabledRange, item)) return 'unclickable'
	if (sameDate(item, props)) return 'now'
	if (sameMonth(item, state)) return 'highlight-black'
	return ''
}

function calculateColorStyleNameOfDigitPanel (item, props) {
	if (item === props.currentDigit) return 'now'
	return 'highlight-black'
}

function correct (dateValue, hasTime) {
	let format = hasTime ? FORMAT_WITH_TIME : FORMAT_WITHOUT_TIME
	let current = moment(dateValue, format)
	return current.format(format)
}

function momentStrictly (dateValue, format) {
	return moment(dateValue, format, true)
}

function getCalendarObject (dateValue, hasTime) {
	let format = hasTime ? FORMAT_WITH_TIME : FORMAT_WITHOUT_TIME
	let current = momentStrictly(dateValue, format)
	if (!current.isValid()) {
		current = moment()
	}
	return {
		year: current.year(),
		month: current.month() + 1,
		date: current.date(),
		hour: current.hour(),
		minute: current.minute(),
		second: current.second()
	}
}

function getDisplayDateValue (dateValue, hasTime) {
	let format = hasTime ? FORMAT_WITH_TIME : FORMAT_WITHOUT_TIME
	let current = momentStrictly(dateValue, format)
	if (!current.isValid()) {
		return dateValue
	}
	return current.format(format)
}

function addPrefixZero (inputNumber) {
	return String(inputNumber).length === 1 ? '0' + inputNumber : '' + inputNumber
}

export default {
	FORMAT_WITH_TIME: FORMAT_WITH_TIME,
	FORMAT_WITHOUT_TIME: FORMAT_WITHOUT_TIME,
	createDatesInPanel: createDatesInPanel,
	DAY_HEADER: DAY_HEADER,
	sameDate: sameDate,
	sameMonth: sameMonth,
	calculateColorStyleNameOfDatePanel: calculateColorStyleNameOfDatePanel,
	calculateColorStyleNameOfDigitPanel: calculateColorStyleNameOfDigitPanel,
	getCalendarObject: getCalendarObject,
	correct: correct,
	getDisplayDateValue: getDisplayDateValue,
	isDisabledDate: isDisabledDate,
	toZeroTime: toZeroTime,
	addPrefixZero: addPrefixZero
}
