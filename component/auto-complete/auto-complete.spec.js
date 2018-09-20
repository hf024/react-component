// import {assert} from 'chai'
// import React from 'react'
// import AutoComplete from './auto-complete'
// import {shallow} from 'enzyme'
// import JSX from '../../util/jsx/jsx'

// describe('AutoComplete', () => {
// 	it('parseToHTMLSuggestions() should return html with highlight text', () => {
// 		const wrapper = shallow(<AutoComplete />)
// 		assert.equal(1, wrapper.find('.auto-complete-component').length)
// 		let instance = wrapper.instance()

// 		let suggestions = instance.parseToHTMLSuggestions([{'id': '956b9c49-477e-11e7-8a00-230cd509a937', 'name': 'bbbaccc', 'simple_name': '苹果树数据科技'}], 'a')
// 		assert.equal(1, suggestions.length)

// 		// let expectedHtml = (<div>bbb<span className='highlight'>a</span>ccc</div>)

// 		// assert.ok(JSX.equal(expectedHtml, suggestions[0].html))

// 		suggestions = instance.parseToHTMLSuggestions([
// 			{'id': '956b9c49-477e-11e7-8a00-230cd509a937', 'name': 'bbbaccc', 'simple_name': '苹果树数据科技'},
// 			{'id': '956b9c49-477e-11e7-8a00-230cd509a937', 'name': 'a', 'simple_name': '苹果树数据科技'}
// 		], 'a')

// 		assert.equal(2, suggestions.length)

// 		// expectedHtml = (<div><span className='highlight'>a</span></div>)

// 		// assert.ok(JSX.equal(expectedHtml, suggestions[1].html))
// 	})

// 	it('parseToJSX() should return HTML result', () => {
// 		const wrapper = shallow(<AutoComplete />)
// 		let instance = wrapper.instance()

// 		let expectedHtml = (<div>bbb<span className='highlight'>a</span>ccc</div>)

// 		let result = instance.parseToJSX('bbbaccc', 'a')

// 		// console.log(JSON.stringify(expectedHtml))
// 		// console.log(JSON.stringify(result))

// 		// assert.ok(JSX.equal(expectedHtml, result))
// 	})
// })
