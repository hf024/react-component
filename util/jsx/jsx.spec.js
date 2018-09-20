import {assert} from 'chai'
import React from 'react'
import JSX from './jsx'

describe('Compare JSX', () => {
	it('JSX equal()', () => {
		let jsx = (<div>hel<span>l</span>o</div>)
		let other = (<div>hel<span>l</span>o</div>)

		assert.equal('div', jsx.type)
		assert.ok(jsx.props.children)

		assert.ok(JSX.equal(jsx, other))
	})
})
