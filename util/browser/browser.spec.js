import {assert} from 'chai'
import Browser from './browser'

describe('Browser', () => {
	it('isNormalBrowser() will return false if it is in QQ group application window', () => {
		assert.ok(Browser.isNormalBrowser('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'))
		assert.ok(Browser.isNormalBrowser('5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.3538.400 QQBrowser/9.6.12501.400'))
		assert.notOk(Browser.isNormalBrowser('5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) QQ/8.9.5.22062 Chrome/43.0.2357.134 Safari/537.36 QBCore/3.43.716.400 QQBrowser/9.0.2524.400'))
	})

	it('isNormalBrowser() with default value will return something', () => {
		navigator.userAgent = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
		assert.ok(Browser.isNormalBrowser())
	})

	it('getValueByKey() will return value by key in queryString with valid window.location value', () => {
		window.location = {
			href: 'http://localhost/?target=/qtrade/system/identity-success'
		}
		assert.equal('/qtrade/system/identity-success', Browser.getValueByKey('target'))
	})

	it('getValueByKey() will return value by key in queryString with customized url', () => {
		assert.equal('/qtrade/system/identity-success-ok', Browser.getValueByKey('target', 'http://localhost/?target=/qtrade/system/identity-success-ok'))
	})

	it('getHost() will return window domain name', () => {
		window.location.host = 'test.qtrade.com.cn'
		process.env['NODE_ENV'] = 'qa'
		assert.equal('test.qtrade.com.cn', Browser.getHost())

		process.env['NODE_ENV'] = 'localhost'
		assert.equal('test.qtrade.com.cn', Browser.getHost())
	})

	it('getProtocol() will return https: or http:', () => {
		const HTTP = 'http:'
		window.location.protocol = HTTP
		assert.equal(HTTP, Browser.getProtocol())
	})

	it('supportNormalBroswer()', () => {
		navigator.userAgent = 'this is normal browser... '
		assert.equal('abc normal-browser', Browser.supportNormalBroswer('abc'))
		assert.equal('abc normal-browser', Browser.supportNormalBroswer('abc '))

		navigator.userAgent = 'this is QQ/ browser... '
		assert.equal('abc', Browser.supportNormalBroswer('abc'))
		assert.equal('abc', Browser.supportNormalBroswer('abc '))
	})
})
