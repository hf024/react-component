import {assert} from 'chai'
import Layout from './layout'

describe('Layout', () => {
	it('averageWidthStyle() should return average width of 100 for given length', () => {
		let style = Layout.averageWidthStyle(7)
		assert.equal('14.28%', style.width)
	})
})
