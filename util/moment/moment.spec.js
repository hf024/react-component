import {assert} from 'chai'
import moment from 'moment'

describe('moment', () => {
	it('handle single digit for month', () => {
		assert.equal('2017-09-01T00:00:00+08:00', moment('20179', 'YYYYMM').format())
	})

	it('get date of moment', () => {
		assert.equal(1, moment('20179', 'YYYYMM').date())
	})

	// 提示：取出来后要加一，放进去前要减一
	it('YYYY-MM-DD can be parsed correctly, and month() is equal to (N - 1).', () => {
		let date = moment('2017-10-24', 'YYYY-MM-DD')
		assert.equal(2017, date.year())
		assert.equal(9, date.month())
		assert.equal(24, date.date())

		let january = moment('2017-1-24', 'YYYY-MM-DD')
		assert.equal(2017, january.year())
		assert.equal(0, january.month())
		assert.equal(24, january.date())
	})

	it('We can set year to an existing moment', () => {
		let date = moment('2017-10-24', 'YYYY-MM-DD')
		assert.equal(2017, date.year())
		date.year(2019)
		assert.equal(2019, date.year())
	})

	it('format() can work as expected', () => {
		assert.equal('2017-10-24', moment('2017-10-24', 'YYYY-MM-DD').format('YYYY-MM-DD'))
		assert.equal('2017-09-24', moment('2017-9-24', 'YYYY-MM-DD').format('YYYY-MM-DD'))
	})

	it('create an broken monent', () => {
		assert.notOk(moment('', 'YYYY-MM-DD').isValid())
		assert.ok(moment('2017-10-24', 'YYYY-MM-DD').isValid())
		assert.isNotOk(moment('2017-10-24ddd', 'YYYY-MM-DD', true).isValid())
	})

	it('create moment with date and time', () => {
		let date = moment('2017-10-24 15:11:12', 'YYYY-MM-DD HH:mm:ss')
		assert.equal('2017-10-24T15:11:12+08:00', date.format())
		assert.equal(15, date.hour())
		assert.equal(11, date.minute())
		assert.equal(12, date.second())
	})

	it('clone a moment', () => {
		let moment0 = moment('2017-10-24', 'YYYY-MM-DD')

		assert.equal('2017-10-24T00:00:00+08:00', moment0.format())

		let moment1 = moment(moment0)

		moment1.year(2015)

		assert.equal('2017-10-24T00:00:00+08:00', moment0.format())

		assert.equal('2015-10-24T00:00:00+08:00', moment1.format())
	})

	it('isBefore()', () => {
		let moment0 = moment('2017-10-12', 'YYYY-MM-DD')

		let item = moment().year(2017).month(9).date(12)
		let cloneItem = moment(item)
		cloneItem.hour(0).minute(0).second(0).millisecond(0)

		assert.equal('2017-10-12T00:00:00+08:00', moment0.format())
		assert.equal('2017-10-12T00:00:00+08:00', cloneItem.format())
		assert.equal(moment0.format(), cloneItem.format())

		assert.notOk(moment0.isBefore(cloneItem))
		assert.ok(moment0.isSame(moment(moment0)))
		assert.ok(moment0.isSame(cloneItem))
	})
})
