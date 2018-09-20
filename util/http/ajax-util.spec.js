import {toBridgeUrl} from './ajax-util'
import {assert} from 'chai'
import {WALL_STREET_NEWS} from '../../global-const'

describe('ajax', () => {
	it('toBridgeUrl() without /api-simulator/', () => {
		assert.equal('http://localhost/bridge/ddd/bbb', toBridgeUrl('/ddd/bbb', 'http:', 'localhost'))
	})

	it('toBridgeUrl() with /api-simulator/', () => {
		assert.equal('http://localhost/bridge/api-simulator/ddd/bbb', toBridgeUrl('/api-simulator/ddd/bbb', 'http:', 'localhost'))
	})

	it('toBridgeUrl() with wallstreet url', () => {
		assert.equal(WALL_STREET_NEWS, toBridgeUrl(WALL_STREET_NEWS))
	})
})
