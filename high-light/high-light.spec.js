import {assert} from 'chai'
import HighLight from './high-light'

describe('highlight', () => {
	it('check HighLight', () => {
		assert.equal(',[object Object],af殊1111bb,[object Object],dd测试、,[object Object],', HighLight.tagKeyWords('特d ddd 敏感词ddd', '特daf殊1111bbddddd测试、敏感词ddd').toString())
	})
	it('check HighLight tagKeyWords', () => {
		assert.equal('Qtrade,[object Object],', HighLight.tagKeyWords('客服', 'Qtrade客服').toString())
		assert.equal('iA,[object Object],cGe,[object Object],efg, 你为什么H不能G代持呢', HighLight.tagKeyWords('b D', 'iAbcGeDefg, 你为什么H不能G代持呢').toString())
	})
	it('check HighLight tagHtmlKeyWord', () => {
		assert.equal('abc<span class="highlight">e</span>d<span class="highlight">e</span>fg, 你为什么不能<span class="highlight">代持</span>呢', HighLight.tagHtmlKeyWord('e 代持', 'abcedefg, 你为什么不能代持呢').toString())
		assert.equal('ag<br>gaga<br>agaga<br><span class="highlight">what</span><br><span class="highlight">test</span>', HighLight.tagHtmlKeyWord('what test', 'ag<br>gaga<br>agaga<br>what<br>test').toString())
	})
})
