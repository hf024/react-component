import lazy from './lazy'
import PopupService from '../../component/popup/popup-service'

export default {
	UserInfoEditPanel: lazy(() => import('../../page/navigator/qtrade-header/user-info-edit-panel/user-info-edit-panel'), () => {
		PopupService.forceUpdate()
	}),
	RegisterPanel: lazy(() => import('../../page/navigator/qtrade-header/register-panel/register-panel'), () => {
		PopupService.forceUpdate()
	}),
	QuotationCreator: lazy(() => import('../../page/navigator/qtrade-header/quotation-creator/quotation-creator'), () => {
		PopupService.forceUpdate()
	}),
	InvitationPanel: lazy(() => import('../../page/navigator/qtrade-header/invitation-panel/invitation-panel'), () => {
		PopupService.forceUpdate()
	}),
	QuotationManager: lazy(() => import('../../page/navigator/qtrade-header/quotation-manager/quotation-manager'), () => {
		PopupService.forceUpdate()
	}),
	GetPersonInfo: lazy(() => import('../../page/navigator/qtrade-header/get-person-info/get-person-info'), () => {
		PopupService.forceUpdate()
	}),
	AgreementPanel: lazy(() => import('../../page/navigator/qtrade-header/agreement-panel/agreement-panel'), () => {
		PopupService.forceUpdate()
	}),

	AgencyNavigator: lazy(() => import('../../page/agency/agency-navigator')),
	QidianUser: lazy(() => import('../../page/qidian-user/qidian-user')),
	HistoryChart: lazy(() => import('../../page/fund/history-chart/history-chart')),
	PrivateOffer: lazy(() => import('../../page/fund/private-offer/private-offer')),
	Fund: lazy(() => import('../../page/fund/fund')),
	NewBond: lazy(() => import('../../page/new-bond/new-bond')),
	Notice: lazy(() => import('../../page/notice/notice')),
	Question: lazy(() => import('../../page/question/question')),
	Charged: lazy(() => import('../../page/charged/charged')),
	ChargeWay: lazy(() => import('../../page/charge-way/charge-way')),
	SingleNewBond: lazy(() => import('../../page/single-new-bond/single-new-bond')),
	BidNewBond: lazy(() => import('../../page/bid-new-bond/bid-new-bond')),
	Case: lazy(() => import('../../page/case/case')),
	ChatRoom: lazy(() => import('../../page/chat-room/chat-room')),
	Error: lazy(() => import('../../page/error/error')),
	IM: lazy(() => import('../../ui/im/im')),
	IMOpen: lazy(() => import('../../ui/im/im-open')),
	IMConversationBoard: lazy(() => import('../../ui/im/conversation-board/conversation-board')),
	IMChatBoard: lazy(() => import('../../ui/im/chat-board/chat-board')),
	IMShowBubbleDetail: lazy(() => import('../../ui/im/chat-board/chat-window/chat-record/chat-bubble-record-detail')),

	// AgencyAdmin: lazy(() => import('../../page/agency/agency-admin/agency-admin')),
	TraderAdmin: lazy(() => import('../../page/agency/trader-admin/trader-admin')),
	ChatRecord: lazy(() => import('../../page/agency/chat-record/chat-record')),
	TradeRecord: lazy(() => import('../../page/agency/trade-record/trade-record')),
	SensitiveWarn: lazy(() => import('../../page/agency/sensitive-warn/sensitive-warn')),
	OperationLog: lazy(() => import('../../page/agency/operation-log/operation-log')),
	Entitlement: lazy(() => import('../../page/agency/entitlement/entitlement')),
	CommonQuestion: lazy(() => import('../../page/agency/common-question/common-question')),

	ChangePassword: lazy(() => import('../../page/agency/change-password/change-password')),
	ForgetPassword: lazy(() => import('../../page/agency/forget-password/forget-password')),
	OperationDone: lazy(() => import('../../page/agency/operation-done/operation-done'))
}
