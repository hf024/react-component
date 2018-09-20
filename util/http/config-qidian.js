import {GET, POST} from './method'

export default {
	BROKER: {
		getBondDetail: {
			url: '/qtrade_bond/api/ic/get_quote_basic_info.do',
			method: POST
		},
		getQuotationList: {
			url: '/qtrade_bond/api/ic/get_quote_list_bycondition.do',
			method: POST
		},
		getBondQuotation: {
			url: '/qtrade_bond/api/ic/get_quote_list_bytradeid.do',
			method: POST
		},
		getBondDealList: {
			url: '/qtrade_bond/api/ic/get_deal_list_bytradeid.do',
			method: POST
		},
		getBondValuationList: {
			url: '/qtrade_bond/api/ic/get_quote_valuation_list.do',
			method: POST
		},
		generalQidianLogin: {
			url: '/qtrade_bond/api/qidian/general_qidian_login.do',
			method: GET
		}
	}
}
