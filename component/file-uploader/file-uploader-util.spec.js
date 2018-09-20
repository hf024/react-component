import {assert} from 'chai'
import {extensionList, isValidExtension, setValueWhenItemExist, setValueWithCreation} from './file-uploader-util'
import _ from 'lodash'

describe('file-uploader-util', () => {
	it('isValidExtension()', () => {
		assert.ok(isValidExtension('a.pdf', extensionList))

		assert.ok(isValidExtension('a.jpg', ['jpg', 'jpeg']))
		assert.ok(isValidExtension('jpg.jpg', ['jpg', 'jpeg']))

		assert.ok(isValidExtension('a.JPG', ['jpg', 'jpeg']))

		assert.ok(isValidExtension('addddd.xls', extensionList))
		assert.isNotOk(isValidExtension('addddd.txt', extensionList))
		assert.isNotOk(isValidExtension('', extensionList))
		assert.isNotOk(isValidExtension(undefined, extensionList))
		assert.isNotOk(isValidExtension(null, extensionList))
	})

	it('setValueWhenItemExist() bug case', () => {
		let files = [
			{
				id: 'aaa',
				fileName: 'aaa.xlsx'
			},
			{
				id: 'bbb',
				fileName: 'bbb.xlsx',
				hidden: true
			},
			{
				id: 'ccc',
				fileName: 'ccc.xlsx'
			},
			{
				fileName: '7.pdf',
				isCheckingMD5: false,
				progress: 57,
				hidden: true
			}
		]

		let list = setValueWhenItemExist(files, '7.pdf', 'hidden', true)

		assert.equal(4, list.length)

		assert.ok(_.isEqual(files, list))
	})

	it('setValueWhenItemExist() will return a new list with new item value', () => {
		let files = [
			{
				id: 'aaa',
				fileName: 'aaa.xlsx'
			},
			{
				id: 'bbb',
				fileName: 'bbb.xlsx',
				hidden: true
			},
			{
				id: 'ccc',
				fileName: 'ccc.xlsx'
			}
		]

		let list = setValueWhenItemExist(files, 'ccc.xlsx', 'progress', 100)

		assert.equal(3, list.length)
		assert.equal(100, list[2].progress)
	})

	it('setValueWithCreation() will create and set item value if it is not exist', () => {
		let files = [
			{
				id: 'aaa',
				fileName: 'aaa.xlsx'
			},
			{
				id: 'bbb',
				fileName: 'bbb.xlsx',
				hidden: true
			},
			{
				id: 'ccc',
				fileName: 'ccc.xlsx'
			}
		]

		let list = setValueWithCreation(files, 'kkk.xlsx', 'mmm', 123)
		assert.equal(4, list.length)
		assert.equal(123, list[3].mmm)

		list = setValueWithCreation(files, 'aaa.xlsx', 'progress', 555)
		assert.equal(4, list.length)
		assert.equal(555, list[0].progress)
	})
})
