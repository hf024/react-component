import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ajax} from '../../util/http/ajax'
import config from '../../util/http/config'
import DEFAULT_PNG from '../../asset/image/qtrade/default.png'
import PopupService from '../../ui/popup/popup-service'
import Dom from '../../util/dom/dom'

export default class BusinessCard extends Component {
	constructor (props) {
		super(props)

		this.state = {
			showBusinessCard: false, // 是否显示名片信息
			theycardinfo: [] // 名片详情
		}

		this.onWindowClick = this.onWindowClick.bind(this)
		this.dealWithDataIsUndefinedOrNull = this.dealWithDataIsUndefinedOrNull.bind(this) // 处理undefined或空值
		this.theyCardInfo = this.theyCardInfo.bind(this) // 打开名片信息
		this.closeBoxPanel = this.closeBoxPanel.bind(this) // 关闭名片信息
	}

	componentDidMount () {
		window.addEventListener('click', this.onWindowClick)
	}

	componentWillUnmount () {
		window.removeEventListener('click', this.onWindowClick)
	}

	onWindowClick (e) { // 判断是否自身
		if (Dom.containsChild(this.faceUrlDom, e.target)) {
			this.setState({
				showBusinessCard: true
			})
			return
		}
		this.setState({
			showBusinessCard: false
		})
	}

	dealWithDataIsUndefinedOrNull (param) {
		return typeof (param) === 'undefined' || param === '' ? '--' : param
	}

	theyCardInfo (e, param) {
		// e.stopPropagation() // 防止合成事件冒泡
		// $('.box-panel-close').click() // 为了快速便捷，暂时先用JQ简单写法
		let theycardinfo = {}
		if (param.user_id === undefined || param.user_id === null || param.user_id === '') {
			theycardinfo = {
				val11: param.user_id === '' ? DEFAULT_PNG : param.face_url,
				val12: param.iscomfirmed,
				val13: param.nick_name,
				val14: '--',
				val21: '--',
				val22: '--',
				val23: '--',
				val24: '--',
				val25: this.dealWithDataIsUndefinedOrNull(param.qqnumber),
				val26: '--'
			}
			this.setState({
				theycardinfo: theycardinfo
			})
		} else {
			this.setState({
				showBusinessCard: false,
				theycardinfo: []
			}, () => {
				ajax(config.PRICE_BOARD.theycardinfo, {user_id: param.user_id}, (result) => {
					if (result.ret === 0 || result.ret === '0') {
						theycardinfo = {
							val11: this.dealWithDataIsUndefinedOrNull(result.faceurl) === '--' ? DEFAULT_PNG : result.faceurl,
							val12: result.iscomfirmed,
							val13: result.nickname,
							val14: this.dealWithDataIsUndefinedOrNull(result.sign_content),
							val21: this.dealWithDataIsUndefinedOrNull(result.company.name),
							val22: this.dealWithDataIsUndefinedOrNull(result.department),
							val23: this.dealWithDataIsUndefinedOrNull(result.phone),
							val24: this.dealWithDataIsUndefinedOrNull(result.email),
							val25: this.dealWithDataIsUndefinedOrNull(param.qqnumber),
							val26: this.dealWithDataIsUndefinedOrNull(result.telephone)
						}
						this.setState({
							theycardinfo: theycardinfo
						})
					} else {
						PopupService.hideCustom()
						PopupService.showDialog(result.retmsg)
					}
				}, () => {
					PopupService.hideCustom()
					PopupService.showDialog('请求失败！')
				})
			})
		}
	}

	closeBoxPanel () {
		this.setState({
			showBusinessCard: false
		})
	}

	render () {
		// user_id，face_url，iscomfirmed
		return (
			<div className='business-card-content'>
				<div className='face-url'
					ref={(faceUrlDom) => { this.faceUrlDom = faceUrlDom }}
					onClick={(e) => this.theyCardInfo(e, this.props.data)}>
					{/* <img src={this.props.data.user_id === '' ? DEFAULT_PNG : this.props.data.face_url} alt='' /> */}
					<img src={this.props.data.user_id === '' ? DEFAULT_PNG : (this.props.data.face_url === '' ? DEFAULT_PNG : this.props.data.face_url)} alt='' />
					{this.props.data.iscomfirmed === 1 ? <span className='comfirmed' /> : ''}
					{
						this.state.showBusinessCard === true &&
						<div className='box-panel maker-details'>
							<div className='box-panel-head'>
								<div className='box-panel-title pull-left'>个人名片</div>
								<div className='box-panel-close pull-right' onClick={() => this.closeBoxPanel()} />
							</div>
							<div className='box-panel-body'>
								<div className='body-top' style={{overflow: 'hidden'}}>
									<div className='pull-left head-img'>
										<img src={this.state.theycardinfo.val11} alt='' />
										{this.state.theycardinfo.val12 === 1 ? <span className='comfirmed' /> : ''}
									</div>
									<div className='pull-left name-info'>
										<div>{this.state.theycardinfo.val13}</div>
										<div>{this.state.theycardinfo.val14}<div>{this.state.theycardinfo.val14}</div></div>
									</div>
								</div>
								<ol className='body-bottom'>
									<li>
										<div><span className='icon-1' /><span>{this.state.theycardinfo.val21}<div>{this.state.theycardinfo.val21}</div></span></div>
										<div><span className='icon-4' /><span>{this.state.theycardinfo.val24}<div>{this.state.theycardinfo.val24}</div></span></div>
									</li>
									<li>
										<div><span className='icon-2' /><span>{this.state.theycardinfo.val22}<div>{this.state.theycardinfo.val22}</div></span></div>
										<div><span className='icon-5' />
											<span>
												{this.state.theycardinfo.val25}
												<div>{this.state.theycardinfo.val25}</div>
											</span>
										</div>
									</li>
									<li>
										<div><span className='icon-3' /><span>{this.state.theycardinfo.val23}<div>{this.state.theycardinfo.val23}</div></span></div>
										<div><span className='icon-6' /><span>{this.state.theycardinfo.val26}<div>{this.state.theycardinfo.val26}</div></span></div>
									</li>
								</ol>
							</div>
						</div>
					}
				</div>
			</div>
		)
	}
}

BusinessCard.propTypes = {
	data: PropTypes.object
}
