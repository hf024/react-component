export default {
	STORE_TYPE: {
		QTRADE: '1',
		SELLER: '2',
		MINE: '3'
	},

	COMPANY_TYPE: { // 企业性质
		'--': '--',
		'1': '中央国企',
		'2': '地方国企',
		'3': '公众企业',
		'4': '民营企业',
		'5': '三资企业'
	},

	BOND_TYPE: { // 债券品种
		'0': '',
		'--': '--',
		'101': 'NCD',
		'102': '政金债',
		'103': '商行债',
		'104': '次级债',
		'105': '其他金融债',
		'106': '企业债',
		'107': 'ABS',
		'108': '公司债',
		'109': '小公募',
		'110': '私募债',
		'111': 'SCP',
		'112': 'CP',
		'113': 'MTN',
		'114': 'PPN'
	},

	PUBLIC_PLACE: { // 上市地点
		'--': '--',
		'1': '银行间',
		'2': '上交所',
		'3': '深交所',
		'4': '其他'
	},

	RATE_WAY: { // 利率方式
		'--': '--',
		'1': '利随本清',
		'2': '固定利率',
		'3': '浮动利率',
		'4': '累积利率'
	},

	ISSUE_WAY: { // 发行方式
		'--': '--',
		'1': '簿记建档',
		'2': '荷兰式',
		'3': '混合式'
	},

	SALE_TYPE: { //  销售方式
		'--': '--',
		'1': '分销',
		'2': '上市'
	},

	SPECIFIC_ITEMS: { // 特殊条款，
		'--': '--',
		'1': '调整票面',
		'2': '赎回',
		'3': '延期',
		'4': '交叉违约'
	},

	STORE_DETAIL_ITEM_LIST: [
		{name: 'history_bond', label: '历史债券：', hasSplitLine: true},
		{name: 'onsale_bond', label: '在售债券：', hasSplitLine: true},
		{name: 'click_num', label: '点击量：', hasSplitLine: true},
		{name: 'share_num', label: '已经分享：'}
	],

	getSingleNewBondDetailUrl (bondId, userId, from, date) {
		return '/qtrade/single-new-bond/' + bondId + '/' + userId + '?from=' + from + '&&date=' + date
	},

	getSingleNewBondDetailUrlFromMyStore (bondId, userId) {
		return '/qtrade/single-new-bond/' + bondId + '/' + userId
	}
}
