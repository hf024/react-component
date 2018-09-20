import CalendarUtil from './calendar-util'
import {assert} from 'chai'
import moment from 'moment'

describe('Calendar', () => {
	it('createDatesInPanel() should return a list with length of 42', () => {
		let datesInPanel = CalendarUtil.createDatesInPanel('2017', '9')
		assert.equal(42, datesInPanel.length)
		let firstDateOfPanel = moment('20170827', 'YYYYMMDD')
		assert.ok(firstDateOfPanel.isSame(datesInPanel[0]))
		assert.equal(firstDateOfPanel.format(), datesInPanel[0].format())

		assert.equal(42, CalendarUtil.createDatesInPanel('2017', '10').length)
	})

	it('createDatesInPanel() should return a list with length of 42', () => {
		let datesInPanel = CalendarUtil.createDatesInPanel('2017', '11')
		assert.equal('2017-10-29T00:00:00+08:00', datesInPanel[0].format())
		assert.equal(29, datesInPanel[0].date())
	})

	it('calculateColorStyleName() sameDate case', () => {
		let item = moment('2017-10-25', 'YYYY-MM-DD')
		let props = {year: 2017, month: 10, date: 25}
		let state = {year: 2017, month: 10, date: 25}
		assert.equal('now', CalendarUtil.calculateColorStyleNameOfDatePanel(item, props))
		assert.ok(CalendarUtil.sameDate(item, props))
		assert.ok(CalendarUtil.sameMonth(item, state))
	})

	it('calculateColorStyleName() sameMonth only case', () => {
		let item = moment('2017-10-25', 'YYYY-MM-DD')
		let props = {year: 2017, month: 10, date: 26}
		let state = {year: 2017, month: 10}
		assert.equal('highlight-black', CalendarUtil.calculateColorStyleNameOfDatePanel(item, props, state))
		assert.notOk(CalendarUtil.sameDate(item, props))
		assert.ok(CalendarUtil.sameMonth(item, state))
	})

	it('calculateColorStyleName() same year only case', () => {
		let item = moment('2017-10-25', 'YYYY-MM-DD')
		let props = {year: 2017, month: 11, date: 26}
		let state = {year: 2017, month: 11, date: 26}
		assert.equal('', CalendarUtil.calculateColorStyleNameOfDatePanel(item, props, state))
		assert.notOk(CalendarUtil.sameDate(item, props))
		assert.notOk(CalendarUtil.sameMonth(item, state))
	})

	it('correct() will return a good date value string', () => {
		assert.equal('2018-02-02 10:11:12', CalendarUtil.correct('2018-02-2...0 10:11:12', true))
	})

	it('getCalendarObject() should return result object based on dateValue and hasTime', () => {
		let calendarObjectWithTime = CalendarUtil.getCalendarObject('2017-09-03 10:11:12', true)
		assert.equal(2017, calendarObjectWithTime.year)
		assert.equal(9, calendarObjectWithTime.month)
		assert.equal(3, calendarObjectWithTime.date)
		assert.equal(10, calendarObjectWithTime.hour)
		assert.equal(11, calendarObjectWithTime.minute)
		assert.equal(12, calendarObjectWithTime.second)

		let calendarObjectWithoutTime = CalendarUtil.getCalendarObject('2017-09-03', false)
		assert.equal(2017, calendarObjectWithoutTime.year)
		assert.equal(9, calendarObjectWithoutTime.month)
		assert.equal(3, calendarObjectWithoutTime.date)
		assert.equal(0, calendarObjectWithoutTime.hour)
		assert.equal(0, calendarObjectWithoutTime.minute)
		assert.equal(0, calendarObjectWithoutTime.second)

		let calendarObject = CalendarUtil.getCalendarObject('2017-09-03', false)
		assert.equal(2017, calendarObject.year)
		assert.equal(9, calendarObject.month)
		assert.equal(3, calendarObject.date)
		assert.equal(0, calendarObject.hour)
		assert.equal(0, calendarObject.minute)
		assert.equal(0, calendarObject.second)
	})

	it('getDisplayDateValue() should return a dateValue based on dateValue and hasTime', () => {
		assert.equal('2017-09-03 10:11:12', CalendarUtil.getDisplayDateValue('2017-09-03 10:11:12', true))
		assert.equal('2017-09-03', CalendarUtil.getDisplayDateValue('2017-09-03', false))
		assert.equal('2017-09-03', CalendarUtil.getDisplayDateValue('2017-09-03', false))
		assert.equal('XXX', CalendarUtil.getDisplayDateValue('XXX', false))
		assert.equal('2017-09-03 10:11:12', CalendarUtil.getDisplayDateValue('2017-09-03 10:11:12', false))
		assert.equal('Invalid date', CalendarUtil.getDisplayDateValue('Invalid date', false))
	})

	it('isDisabledDate() will return true if target date is inside range', () => {
		assert.ok(
			CalendarUtil.isDisabledDate(
				{from: moment('2017-10-12', 'YYYY-MM-DD'), to: moment('2017-10-30', 'YYYY-MM-DD')},
				moment().year(2017).month(9).date(20)
			)
		)

		assert.notOk(
			CalendarUtil.isDisabledDate(
				{from: null, to: moment().hour(0).minute(0).second(0).millisecond(0)},
				moment().hour(0).minute(0).second(0).millisecond(0)
			)
		)

		assert.ok(
			CalendarUtil.isDisabledDate(
				{from: null, to: moment('2017-10-30', 'YYYY-MM-DD')},
				moment().year(2017).month(9).date(20)
			)
		)

		assert.ok(
			CalendarUtil.isDisabledDate(
				{from: moment('2017-10-12', 'YYYY-MM-DD'), to: null},
				moment().year(2017).month(9).date(20)
			)
		)

		assert.notOk(
			CalendarUtil.isDisabledDate(
				{from: null, to: null},
				moment().year(2017).month(9).date(20)
			)
		)

		assert.notOk(
			CalendarUtil.isDisabledDate(
				null,
				moment().year(2017).month(9).date(20)
			)
		)

		assert.notOk(
			CalendarUtil.isDisabledDate(
				{from: moment('2017-10-12', 'YYYY-MM-DD'), to: moment('2017-10-30', 'YYYY-MM-DD')},
				moment().year(2017).month(10).date(20)
			)
		)

		assert.notOk(
			CalendarUtil.isDisabledDate(
				{from: moment('2017-10-12', 'YYYY-MM-DD'), to: moment('2017-10-30', 'YYYY-MM-DD')},
				moment().year(2017).month(9).date(12)
			)
		)

		// Array

		assert.ok(
			CalendarUtil.isDisabledDate(
				[
					{from: moment('2017-10-12', 'YYYY-MM-DD'), to: moment('2017-10-30', 'YYYY-MM-DD')},
					{from: moment('2017-10-18', 'YYYY-MM-DD'), to: moment('2017-11-30', 'YYYY-MM-DD')}
				],
				moment().year(2017).month(9).date(20)
			)
		)

		assert.isNotOk(
			CalendarUtil.isDisabledDate(
				[
					{from: null, to: moment('2018-06-01', 'YYYY-MM-DD')},
					{from: moment(), to: null}
				],
				moment().year(2018).month(5).date(10)
			)
		)

		assert.isNotOk(
			CalendarUtil.isDisabledDate(
				[
					{from: null, to: moment('2018-06-01', 'YYYY-MM-DD')},
					null
				],
				moment().year(2018).month(5).date(10)
			)
		)
	})

	it('toZeroTime()', () => {
		let date = moment('2017-10-12 20:8:5', 'YYYY-MM-DD HH:mm:ss')
		let dateOfZero = CalendarUtil.toZeroTime(date)

		assert.equal(20, date.hour())
		assert.equal(8, date.minute())
		assert.equal(5, date.second())

		assert.equal(0, dateOfZero.hour())
		assert.equal(0, dateOfZero.minute())
		assert.equal(0, dateOfZero.second())
	})

	it('addPrefixZero() will prepend 1 or 0 zero', () => {
		assert.equal('01', CalendarUtil.addPrefixZero(1))
		assert.equal('12', CalendarUtil.addPrefixZero(12))
	})
})
