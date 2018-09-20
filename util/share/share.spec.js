import {assert} from 'chai'
import Share from '../share/share'
import Browser from '../browser/browser'

describe('Share', () => {
	it('createQQShareableLink() will return a long link', () => {
		window.location.protocol = 'http:'
		window.location.host = 'localhost'
		process.env['NODE_ENV'] = 'unknown'
		let TEMPLATE = {
			desc: '介绍一个基于QQ的同业报价工具给你哦！事不宜迟，现在加入QTrade吧。', /* 分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔） */
			title: 'QTrade国内首个跟腾讯合作的同业报价工具', /* 分享标题(可选) */
			summary: '一键群报价到QQ只有QTrade', /* 分享摘要(可选) */
			pics: 'https://www.qtrade.com.cn/image/qq-invitation.png', /* 分享图片(可选) */
			flash: '', /* 视频地址(可选) */
			site: 'apple-tree', /* 分享来源(可选) 如：QQ分享 */
			style: '201',
			width: 32,
			height: 32,
			url: `${Browser.getProtocol()}//${Browser.getHost()}/?target=/referral/${67817903}`
		}
		assert.equal('http://connect.qq.com/widget/shareqq/index.html?desc=%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%AA%E5%9F%BA%E4%BA%8EQQ%E7%9A%84%E5%90%8C%E4%B8%9A%E6%8A%A5%E4%BB%B7%E5%B7%A5%E5%85%B7%E7%BB%99%E4%BD%A0%E5%93%A6%EF%BC%81%E4%BA%8B%E4%B8%8D%E5%AE%9C%E8%BF%9F%EF%BC%8C%E7%8E%B0%E5%9C%A8%E5%8A%A0%E5%85%A5QTrade%E5%90%A7%E3%80%82&title=QTrade%E5%9B%BD%E5%86%85%E9%A6%96%E4%B8%AA%E8%B7%9F%E8%85%BE%E8%AE%AF%E5%90%88%E4%BD%9C%E7%9A%84%E5%90%8C%E4%B8%9A%E6%8A%A5%E4%BB%B7%E5%B7%A5%E5%85%B7&summary=%E4%B8%80%E9%94%AE%E7%BE%A4%E6%8A%A5%E4%BB%B7%E5%88%B0QQ%E5%8F%AA%E6%9C%89QTrade&pics=https%3A%2F%2Fwww.qtrade.com.cn%2Fimage%2Fqq-invitation.png&flash=&site=apple-tree&style=201&width=32&height=32&url=http%3A%2F%2Flocalhost%2F%3Ftarget%3D%2Freferral%2F67817903',
			Share.createQQShareableLink(TEMPLATE))
	})

	it('originUrl() will return correct url', () => {
		window.location.protocol = 'http:'
		window.location.host = 'test.qtrade.com.cn'
		process.env['NODE_ENV'] = 'qa'
		assert.equal('http://test.qtrade.com.cn/?target=/referral/67817903', `${Browser.getProtocol()}//${Browser.getHost()}/?target=/referral/${'67817903'}`)
	})
})
