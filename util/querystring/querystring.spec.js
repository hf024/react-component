import {assert} from 'chai'
import querystring from 'querystring'

describe('querystring', () => {
	it('basic test', () => {
		assert.equal('a=1&b=2', querystring.stringify({a: 1, b: 2}))

		let input = {a: 1, b: 2}
		let body = ''
		for (let key in input) {
			body += key + '=' + input[key] + '&'
		}

		assert.equal('a=1&b=2&', body)

		let result = querystring.parse('a=1&b=2')

		assert.equal('1', result.a)
		assert.equal('2', result.b)

		result = querystring.parse('fromUser=B30D7B5D1E02550BF558B1E8AEF4B109&toUser=35E054F7980E34EF7043519B1AE91BF1&timestamp=1528351884&nonce=40499584283&signature=b38642422c8965c846efb60282f3d46653c5f14d&sceneid=1&appid=202000162&tabid=964')
		assert.equal('B30D7B5D1E02550BF558B1E8AEF4B109', result.fromUser)
	})

	it('handle complex string', () => {
		let longString = 'crmqq://message/?customization=1&bopenid=A416A885F18FD6EB3EC98CDD266B85D5&copenid=8CD21149AA2550213DB065753F49B7F3&timestamp=1530688654&key=5de850625d1bab3653e95545fe62fbaf&appid=202000162&ctype=1'
		let parts = longString.split('?')
		assert.equal(2, parts.length)
		assert.equal('customization=1&bopenid=A416A885F18FD6EB3EC98CDD266B85D5&copenid=8CD21149AA2550213DB065753F49B7F3&timestamp=1530688654&key=5de850625d1bab3653e95545fe62fbaf&appid=202000162&ctype=1', parts[1])
		let result = querystring.parse(parts[1])
		assert.equal('202000162', result.appid)
		assert.equal('8CD21149AA2550213DB065753F49B7F3', result.copenid)
	})
})
