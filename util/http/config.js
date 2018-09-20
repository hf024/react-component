import {GET, POST} from './method'
import {WALL_STREET_NEWS} from '../../global-const'

export default {
	COMMON_QUESTION: {
		getQtradeQuestionBook: {
			url: '/document/qtrade-question-book.json',
			method: GET
		},
		getAgencyQuestionBook: {
			url: '/document/agency-question-book.json',
			method: GET
		}
	},
	ENTITLEMENT: {
		getUserEntitlments: {
			url: '/qtrade_org/api/query_account_menu.do',
			method: POST
		}
	},
	QIDIAN: {
		chat: {
			url: '/qtrade_bond/api/user/qidian_chat.do',
			method: POST
		},
		getQidianUserInfo: {
			url: '/qtrade_bond/api/user/get_qidian_chat_user_info_detail.do',
			method: POST
		}
	},
	USER_REGISTER: {
		getUserStatus: {
			url: '/qtrade_bond/api/user/getuserstatus.do',
			method: GET
		},
		getMobileVerificationCode: {
			url: '/qtrade_bond/api/register/mobileverifycode.do',
			method: POST
		},
		activateMobile: {
			url: '/qtrade_bond/api/register/activatemobile.do',
			method: POST
		},
		getUserInfo: {
			url: '/qtrade_bond/api/user/getuserinfo1.do',
			method: GET
		},
		submitUserInfo: {
			url: '/qtrade_bond/api/register/submitinfo.do',
			method: POST
		},
		verifyQQEmailCode: {
			url: '/qtrade_bond/api/activateemail/generalactivate.do',
			method: POST
		},
		resendEmail: {
			url: '/qtrade_bond/api/activateemail/resend.do',
			method: GET
		},
		// Edit mobile
		getMobileForSubmitInfo: {
			url: '/qtrade_bond/api/user/getmobileforsubmitinfo.do',
			method: GET
		},
		getMobileVerificationCodeForConfirm: {
			url: '/qtrade_bond/api/submitinfo/mobileverifycode1.do',
			method: GET
		},
		validateMobileForConfirm: {
			url: '/qtrade_bond/api/submitinfo/validatemobile.do',
			method: POST
		},
		getMobileVerificationCodeForRenew: {
			url: '/qtrade_bond/api/submitinfo/mobileverifycode2.do',
			method: POST
		},
		modifyMobile: {
			url: '/qtrade_bond/api/submitinfo/modifymobile.do',
			method: POST
		},
		// Edit user info
		getUserInfoForEdit: {
			url: '/qtrade_bond/api/user/getuserinfo2.do',
			method: GET
		},
		submitUserInfoForEdit: {
			url: '/qtrade_bond/api/submitinfo/submit.do',
			method: POST
		},
		submitUserInfoForEditUnemployed: {
			url: '/qtrade_bond/api/submitinfo/re_entry.do',
			method: POST
		},
		getAgencyList: { // 获取机构列表
			url: '/appletree/getorginfolist.do',
			method: POST
		},
		//
		acceptAgreement: {
			url: '/qtrade_bond/api/register/accept_agreement.do',
			method: GET
		}
	},
	NEW_BOND: { // 新债
		// 发布报价相关
		sendBond: { // 发布报价
			url: '/qtrade_bond/api/newbond/quotation.do',
			method: POST
		},
		associateBondName: { // 债券简称联想
			url: '/qtrade_bond/api/newbond/associate_bond_name.do',
			method: POST
		},
		associateBond: { // 债券信息联想
			url: '/qtrade_bond/api/newbond/associate.do',
			method: POST
		},
		judgeShopOpen: { // 是否开通店铺
			url: '/qtrade_bond/api/newbond/is_myshop_opened.do',
			method: POST
		},
		openMyShop: { // 去开通点店铺
			url: '/qtrade_bond/api/newbond/open_myshop.do',
			method: POST
		},
		// ==========

		getWorkdaysInfo: { // 发行面板上工作日列表返回
			url: '/qtrade_bond/api/newbond/get_workdays_info.do',
			method: POST
		},
		consultation: { // 询量
			url: '/qtrade_bond/api/newbond/quotation_board.do',
			method: POST
		},
		announcement: { // 公告
			url: '/qtrade_bond/api/newbond/quotation_board.do',
			method: POST
		},
		issue: { // 发行
			url: '/qtrade_bond/api/newbond/quotation_board.do',
			method: POST
		},
		accumulateClick: { // 点击次数累加
			url: '/qtrade_bond/api/newbond/accumulate_click.do',
			method: POST
		},
		isStoreOpened: { // 店铺是否开通接口
			url: '/qtrade_bond/api/newbond/is_myshop_opened.do', // /qtrade_bond/api/is_myshop_opened.do
			method: POST
		},
		news: { // 我的店铺--查询最新动态
			url: '/qtrade_bond/api/newbond/get_dynamic_tips.do',
			method: POST
		},
		deleteNews: { // 我的店铺--点击最新动态
			url: '/qtrade_bond/api/newbond/delete_dynamic_tip.do',
			method: POST
		},
		newBondList: { // 债券列表
			url: '/qtrade_bond/api/newbond/get_bond_list.do',
			method: POST
		},
		deleteBond: { // 删除债券
			url: '/qtrade_bond/api/newbond/delete_bond.do',
			method: POST
		},
		storeDetail: { // 店铺详情
			url: '/qtrade_bond/api/newbond/get_shop_detail.do',
			method: POST
		},
		modNewBondDetail: {
			url: '/qtrade_bond/api/newbond/mod_quotation.do',
			method: POST
		},
		newBondDetail: { // 债券详情
			url: '/qtrade_bond/api/newbond/get_bond_detail.do',
			method: POST
		},
		questionQuery: { // 问答区查询
			url: '/qtrade_bond/api/newbond/query_asklist.do', // /qtrade_bond/api/query_asklist.do
			method: POST
		},
		askQuestion: { // 问问题
			url: '/qtrade_bond/api/newbond/ask.do',
			method: POST
		},
		answerQuestion: { // 回答问题
			url: '/qtrade_bond/api/newbond/ans.do',
			method: POST
		},
		thumbQuestion: { // 点赞
			url: '/qtrade_bond/api/newbond/thumb.do',
			method: POST
		}
	},
	OVERVIEW: {
		initialData: { // 1、概览主面板.包括：（1）公开市场操作；（2）shibor；（3）质押式加权；（4）买断式加权
			url: '/qtrade_bond/api/overview/getinitialdata.do',
			method: GET
		},
		updatePledgeData: { // 2、质押式加权定时轮询
			url: '/qtrade_bond/api/overview/getrecenttitle3.do',
			method: GET
		},
		updateBuyOutData: { // 3、买断式加权定时轮询
			url: '/qtrade_bond/api/overview/getrecenttitle4.do',
			method: GET
		},

		recentData1: { // 4、公开市场操作大图
			url: '/qtrade_bond/api/overview/getrecentdata1.do',
			method: GET
		},
		recentData2: { // 5、shibor大图
			url: '/qtrade_bond/api/overview/getrecentdata2.do',
			method: GET
		},
		recentData3: { // 6、质押式加权大图
			url: '/qtrade_bond/api/overview/getrecentdata3.do',
			method: GET
		},
		recentData4: { // 7、买断式加权大图
			url: '/qtrade_bond/api/overview/getrecentdata4.do',
			method: GET
		},

		checkin: {
			url: '/qtrade_im/daily_checkin.do',
			method: POST
		},
		receiveQuotation: {
			url: '/qtrade_im/receive_quotation.do',
			method: POST
		},
		quotationBoard: {
			url: '/appletree/gettodayquotation.do',
			method: POST
		},
		expiredDeals: {
			url: '/qtrade_im/expired_deals.do',
			method: POST
		},
		achievedDeals: {
			url: '/qtrade_im/achieved_deals.do',
			method: POST
		},
		news: {
			url: WALL_STREET_NEWS,
			method: GET
		}
	},
	INVITATION: {
		userId: {
			url: '/appletree/getuserid.do',
			method: GET
		},
		list: {
			url: '/appletree/getinvitationlist.do',
			method: GET
		}
	},

	USER: {
		list: {
			url: '/simulator-api/user/list?a=1&b=2',
			method: GET
		},
		add: {
			url: '/simulator-api/user/add',
			method: POST
		},
		quotationMessage: {
			url: '/appletree/quotationmsg.do?quotation_id=4a72f47cefe349f6973257412c180d32',
			method: GET
		}
	},

	SYSTEM: {
		noticeList: {
			url: '/appletree/getsystemmsg.do',
			method: POST
		},
		unreadList: {
			url: '/appletree/unreadmsglist.do',
			method: POST
		},
		readAll: {
			url: '/appletree/readsystemmsg.do',
			method: POST
		}
	},

	IM: {
		conversations: { // 侧边栏列表
			url: '/qtrade_im/get_sidebar.do',
			method: POST
		},

		panelConversations: { // 私人报价面板侧边栏列表
			url: '/qtrade_im/get_sidebarboard.do',
			method: POST
		},

		conversationItem: { // 侧边栏详情
			url: '/qtrade_im/get_sidebaritem.do',
			method: POST
		},

		deleteConversationItem: {
			url: '/qtrade_im/delete_sidebaritem.do',
			method: POST
		},

		requestBargain: { // 发起议价
			url: '/qtrade_im/bargain.do',
			method: POST
		},

		doBargain: { // 议价操作
			url: '/qtrade_im/bargain_op.do',
			method: POST
		},

		bargainDetail: { // 获取议价详情
			url: '/qtrade_im/bargain_detail.do',
			method: POST
		},

		msg: { // 获取消息
			url: '/qtrade_im/getmsg.do',
			method: POST
		},

		sendMsg: { // 发送文本消息
			url: '/qtrade_im/sendmsg.do',
			method: POST
		},

		sendBubble: { // 发送气泡消息
			url: '/qtrade_im/sendbubble.do',
			method: POST
		},

		record: { // 聊天记录
			url: '/qtrade_im/get_record.do',
			method: POST
		},

		changeChatMode: { // 模式切换
			url: '/qtrade_im/changechatmode.do',
			method: POST
		}
	},

	GET_EMAIL_STATE: {
		url: '/appletree/getemailstate.do',
		method: POST
	},
	CHECK_PERSON_INFORMATION: {
		userInfo: {
			url: '/appletree/cardinfo.do', // 10、登录用户自己名片信息获取
			method: POST
		},
		getUserDetail: {
			url: '/qtrade_bond/api/user/get_user_detail.do',
			method: GET
		},
		signatureUpdate: {
			url: '/appletree/updatesign.do', // 2、个性签名更新
			method: POST
		}
	},
	SUBMIT_CODE: { // 短信验证码
		url: '/appletree/sendmobilemsg.do',
		method: POST
	},
	CHECKEMAILANDCOMPANY: { // 验证邮箱与机构名是否匹配
		url: '/appletree/verifycompanyemail.do',
		method: POST
	},
	CHECKISTRAIL: {
		url: '/appletree/ontrail.do',
		method: POST
	},
	SUBMITINFO: {
		url: '/appletree/submitinfo.do',
		method: POST
	},

	QUOTATION_BOND: {
		online_bond: {
			url: '/qtrade_bond/api/quoteinfo/quotation.do',
			method: POST
		}
	},
	GROUP_AND_ORG_LIST: {
		url: '/qtrade_bond/api/quoteinfo/get_group_and_org_list.do',
		method: POST
	},
	CONTACTS_LIST: {
		url: '/qtrade_bond/api/quoteinfo/get_org_user_list.do',
		method: POST
	},
	SEARCH_SENDERLIST: {
		url: '/qtrade_bond/api/quoteinfo/get_search_list.do',
		method: POST
	},

	ATTACHMENT: {
		checkMD5: {
			// url: '/oms/attachment/checkmd5.do',
			url: '/qtrade_bond/api/attachment/checkmd5.do',
			method: POST
		}
	},
	PRICE_BOARD: {	//	报价面板
		quotationboard: {	//	市场报价，我的报价
			url: '/qtrade_bond/api/quoteinfo/quotationboard.do',
			method: POST
		},

		getrecentinfo: {	// 线上资金报价面板-获取更新数据
			url: '/qtrade_bond/api/quoteinfo/getrecentinfo.do',
			method: POST
		},

		quotationmsg: {	//	线上资金-原文
			url: '/appletree/quotationmsg.do',
			method: GET
		},

		// =====
		get_quote_info_list: {
			url: '/qtrade_bond/api/quoteinfo/get_quote_result_list.do',
			method: POST
		},

		fresh_quotation: {	//	线上资金-我的报价-重发
			url: '/appletree/fresh_quotation.do',
			method: POST
		},

		cancel_quotation: {	//	线上资金-我的报价-撤销
			// url: '/appletree/cancel_quotation.do',
			url: '/qtrade_bond/api/quoteinfo/delete_quote_result.do',
			method: POST
		},
		// =====

		getinterestbondlist: {	//	利率债
			url: '/qtrade_bond/list/getinterestbondlist.do',
			method: POST
		},

		getcreditbondlist: {	//	信用债
			url: '/qtrade_bond/list/getcreditbondlist.do',
			method: POST
		},

		myquotation: {	//	我的发布
			url: '/qtrade_bond/myquotation.do',
			method: POST
		},

		theycardinfo: {	//	他人名片查询接口
			url: '/appletree/theycardinfo.do',
			method: POST
		},

		checkoutquote: {	//	市场报价导出
			url: '/appletree/checkoutquote.do',
			method: POST
		},

		checkoutuseridrandom: {	//	我的报价导出随机数
			url: '/appletree/checkoutuseridrandom.do',
			method: POST
		},

		checkoutmyquote: {	//	我的报价导出
			url: '/appletree/checkoutmyquote.do',
			method: POST
		},

		getdailytotal: { // 晴雨表，收与出
			url: '/qtrade_bond/api/quoteinfo/getdailytotal.do',
			method: GET
		},

		daybarometer: { // 晴雨表，今日统计
			url: '/appletree/daybarometer.do',
			method: POST
		},

		historybarometer: { // 晴雨表，历史统计
			url: '/appletree/historybarometer.do',
			method: POST
		}
	},
	USER_TRACKING: {
		trackUserEvent: {
			url: '/qtrade_bond/api/overview/trackuserevent.do',
			method: POST
		},
		recordUserOperation: {
			url: '/qtrade_bond/api/operation/recorduseroperation.do',
			method: POST
		},
		accumulateShare: {
			url: '/qtrade_bond/api/newbond/accumulate_share.do',
			method: POST
		},
		getCount: {	// 统计上报
			url: '/appletree/count.do',
			method: POST
		}
	},
	NEW_BOND_BID_ADMIN: {
		getBidBondList: {
			url: '/qtrade_bond/api/newbond/bid/get_bid_bond_list.do',
			method: POST
		},
		deleteBidUpdate: {
			url: '/qtrade_bond/api/newbond/bid/delete_bid_update.do',
			method: POST
		},
		getSaleList: {
			url: '/qtrade_bond/api/newbond/bid/get_sale_list.do',
			method: POST
		},
		getBidDetail: {
			url: '/qtrade_bond/api/newbond/bid/get_bid_detail.do',
			method: POST
		},
		getTenderList: {
			url: '/qtrade_bond/api/newbond/bid/get_tender_detail.do',
			method: POST
		},
		getGuideLineHistory: {
			url: '/qtrade_bond/api/newbond/bid/get_history_guidelines.do',
			method: POST
		},
		getSendBidBondSummaryList: {
			url: '/qtrade_bond/api/newbond/bid/get_confirmed_bid_summary.do',
			method: POST
		},
		confirmedBidBond: {
			url: '/qtrade_bond/api/newbond/bid/confirm.do',
			method: POST
		},
		refusedBidBond: {
			url: '/qtrade_bond/api/newbond/bid/refuse.do',
			method: POST
		},
		getTenderHistoryList: {
			url: '/qtrade_bond/api/newbond/bid/get_tender_record.do',
			method: POST
		},
		doBidCommit: {
			url: '/qtrade_bond/api/newbond/bid/commit.do',
			method: POST
		},
		sendGuidanceMessage: {
			url: '/qtrade_bond/api/newbond/bid/send_guideline.do',
			method: POST
		},
		getReceivedBidBondSummaryList: {
			url: '/qtrade_bond/api/newbond/bid/get_confirmed_bid_inviting_summary.do',
			method: POST
		},
		getReceivedBidAgency: {
			url: '/qtrade_bond/api/newbond/bid/get_confirmed_org_bid_summary.do',
			method: POST
		},
		getBidInfo: {
			url: '/qtrade_bond/api/newbond/bid/get_bid_info.do',
			method: POST
		}
	},
	AGENCY: {
		query10Context: {
			url: '/qtrade_org/api/query_10_context.do',
			method: POST
		},
		queryGroup10Context: {
			url: '/qtrade_org/api/query_group_10_context.do',
			method: POST
		},
		changePassword: {
			url: '/qtrade_org/api/change_passwd.do',
			method: POST
		},
		getTraderList: {
			url: '/qtrade_org/api/query_member_list.do',
			method: POST
		},
		getGroupList: {
			url: '/qtrade_org/api/query_group_list.do',
			method: POST
		},
		getDiscussionGroupList: { // 讨论组
			url: '/qtrade_org/api/query_group_list.do',
			method: POST
		},
		getDimissionTraderList: {
			url: '/qtrade_org/api/query_resigned_member_list.do',
			method: POST
		},
		getQueryChatMemberList: {
			url: '/qtrade_org/api/query_chat_members.do',
			method: POST
		},
		getTraderDetailList: {
			url: '/qtrade_org/api/query_member_detail_list.do',
			method: POST
		},
		getDimissionTraderDetailList: {
			url: '/qtrade_org/api/query_resigned_member_detail_list.do',
			method: POST
		},
		getChatTraderList: {
			url: '/qtrade_org/api/query_recent_chaters.do',
			method: POST
		},
		getChatRecordData: {
			url: '/qtrade_org/api/query_msg_list.do',
			method: POST
		},
		getGroupChatRecordData: {
			url: '/qtrade_org/api/query_group_msg_list.do',
			method: POST
		},
		getDiscussionGroupChatRecordData: { // 讨论组
			url: '/qtrade_org/api/query_group_msg_list.do',
			method: POST
		},
		getTradeFundData: {
			url: '/qtrade_org/api/query_fund_list.do',
			method: POST
		},
		getTradeNewBondData: {
			url: '/qtrade_org/api/query_bond_list.do',
			method: POST
		},
		exportTraderUrl: '/qtrade_org/api/export_member_list.do',
		removeDealer: {
			url: '/qtrade_org/api/remove_member.do',
			method: POST
		},
		verifyDealer: {
			url: '/qtrade_org/api/confirm_member.do',
			method: POST
		},
		denyDealer: {
			url: '/qtrade_org/api/refuse_member.do',
			method: POST
		},
		getOperateLogList: {
			url: '/qtrade_org/api/query_op.do',
			method: POST
		},
		getOperateLogMemberList: {
			url: '/qtrade_org/api/query_op_members.do',
			method: POST
		},
		exportOperateLogUrl: '/qtrade_org/api/export_op.do',
		overview: {
			url: '/qtrade_org/api/overview.do',
			method: POST
		},
		reportOverviewUrl: '/qtrade_org/api/export_overview.do',
		getSensitvieWordList: {
			url: '/qtrade_org/api/query_sensitive_words.do',
			method: POST
		},
		addSensitvie: {
			url: '/qtrade_org/api/add_sensitive_word.do',
			method: POST
		},
		deleteSensitvie: {
			url: '/qtrade_org/api/delete_sensitive_word.do',
			method: POST
		},
		getTriggerSensitvieWordList: {
			url: '/qtrade_org/api/query_trigger_word_list.do',
			method: POST
		},
		exportTriggerSensitiveUrl: '/qtrade_org/api/export_trigger_word_list.do',
		getTriggerSensitvieRedPointer: {
			url: '/qtrade_org/api/query_trigger_flag.do',
			method: POST
		},
		getHasModifyInfo: {
			url: '/qtrade_org/api/hasModifyInfo.do',
			method: POST
		},
		exportChatMsgUrl: '/qtrade_org/api/export_msg_list.do',
		exportChatMsgOfAllFriendsUrl: '/qtrade_org/api/export_msg_lists.do',
		exportGroupChatMsgUrl: '/qtrade_org/api/export_group_msg_list.do',
		exportTradeNewBondUrl: '/qtrade_org/api/export_bond_list.do',
		exportTradeFundUrl: '/qtrade_org/api/export_fund_list.do',
		exportChatMsgInContext: '/qtrade_org/api/export_msg_list_from_context.do',
		exportChatFileUrl: '/qtrade_org/api/export_file.do',
		// 权限管理
		getAccountList: {
			url: '/qtrade_org/api/query_accounts.do',
			method: POST
		},
		administratorList: {
			url: '/qtrade_org/api/query_account_list.do',
			method: POST
		},
		addAdministrator: {
			url: '/qtrade_org/api/add_account.do',
			method: POST
		},
		editedAdministrator: {
			url: '/qtrade_org/api/modify_account.do',
			method: POST
		},
		getEditingAdministrator: {
			url: '/qtrade_org/api/query_account.do',
			method: POST
		},
		disablePermissions: {
			url: '/qtrade_org/api/disable_account.do',
			method: POST
		},
		enabledPermissions: {
			url: '/qtrade_org/api/enable_account.do',
			method: POST
		},
		deletePermission: {
			url: '/qtrade_org/api/delete_account.do',
			method: POST
		},
		revisePassword: {
			url: '/qtrade_org/api/modify_account_password.do',
			method: POST
		}
	}
}
