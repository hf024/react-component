import {assert} from 'chai'
import RegexpUtil from './regexp-util'

describe('RegexpUtil', () => {
	it('isPureChineseEnglishName', () => {
		assert.ok(RegexpUtil.isPureChineseEnglishName('陈国栋'))
		assert.ok(RegexpUtil.isPureChineseEnglishName('ddd'))
		assert.isNotOk(RegexpUtil.isPureChineseEnglishName('陈国栋ddd'))
	})

	it('isMixedChineseEnglishName()', () => {
		assert.isNotOk(RegexpUtil.isMixedChineseEnglishName('Anthony Chen')) // Space not allow
		assert.ok(RegexpUtil.isMixedChineseEnglishName('陈国栋'))
		assert.ok(RegexpUtil.isMixedChineseEnglishName('陈国栋（'))
		assert.ok(RegexpUtil.isMixedChineseEnglishName('陈国栋（）'))
		assert.ok(RegexpUtil.isMixedChineseEnglishName('陈国栋（）。'))
		assert.ok(RegexpUtil.isMixedChineseEnglishName('陈国栋（）。('))
		assert.ok(RegexpUtil.isMixedChineseEnglishName('陈国栋（）。()'))
		assert.ok(RegexpUtil.isMixedChineseEnglishName('陈国栋（）。().'))
		assert.isNotOk(RegexpUtil.isMixedChineseEnglishName('陈国栋123'))
		assert.isNotOk(RegexpUtil.isMixedChineseEnglishName(' '))
	})

	it('isPhoneNumber()', () => {
		assert.ok(RegexpUtil.isPhoneNumber('13926541365'))
		assert.isNotOk(RegexpUtil.isPhoneNumber('aa'))
		assert.isNotOk(RegexpUtil.isPhoneNumber(''))
		assert.isNotOk(RegexpUtil.isPhoneNumber(undefined))
	})

	it('isQQNumber()', () => {
		assert.ok(RegexpUtil.isQQNumber('67817903'))
		assert.isNotOk(RegexpUtil.isQQNumber('1'))
		assert.isNotOk(RegexpUtil.isQQNumber('00000000000000000'))
	})

	it('isEmail()', () => {
		assert.ok(RegexpUtil.isEmail('a@a.com'))
		assert.ok(RegexpUtil.isEmail('fla@bdd.com'))
		assert.ok(RegexpUtil.isEmail('fl_a@bdd.com'))
		assert.isNotOk(RegexpUtil.isEmail('attb.com'))
	})

	it('isValidationCode()', () => {
		assert.ok(RegexpUtil.isValidationCode('1234'))
		assert.isNotOk(RegexpUtil.isValidationCode('3'))
	})

	it('isDeskPhoneNumber()', () => {
		assert.ok(RegexpUtil.isDeskPhoneNumber('0755-36556688'))
	})

	it('isNumber()', () => {
		assert.ok(RegexpUtil.hasNumber('333ddd'))
		assert.isNotOk(RegexpUtil.hasNumber('fff'))
	})

	it('hasAlphabet()', () => {
		assert.ok(RegexpUtil.hasAlphabet('abc'))
		assert.isNotOk(RegexpUtil.hasAlphabet('222'))
	})

	it('hasSymbol()', () => {
		assert.ok(RegexpUtil.hasSymbol('***'))
		assert.isNotOk(RegexpUtil.hasSymbol('222'))
	})
})
