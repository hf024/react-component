import {assert} from 'chai'
import CSVParser from './csv-parser'
import path from 'path'
import fs from 'fs'
import _ from 'lodash'

describe('CSV Parser', () => {
	it('isPeriod()', () => {
		assert.ok(CSVParser.isPeriod('7'))
		assert.ok(CSVParser.isPeriod('7D'))
		assert.ok(CSVParser.isPeriod('7d'))

		assert.ok(CSVParser.isPeriod('8d'))
		assert.ok(CSVParser.isPeriod('21D'))

		assert.isNotOk(CSVParser.isPeriod('700d'))
		assert.isNotOk(CSVParser.isPeriod('7dooo'))
		assert.isNotOk(CSVParser.isPeriod('7dd'))
	})

	it('getMatchedPeriodIndex()', () => {
		assert.equal(4, CSVParser.getMatchedPeriodIndex([
			'218',
			'text',
			'限价',
			'借',
			'1',
			'~',
			'7',
			'天',
			'资金'
		]))

		assert.equal(4, CSVParser.getMatchedPeriodIndex([
			'218',
			'text',
			'限价',
			'借',
			'8d',
			'~',
			'21D',
			'天',
			'资金'
		]))

		assert.equal(-1, CSVParser.getMatchedPeriodIndex([
			'0',
			'text',
			'出',
			'7',
			'天',
			'隔夜'
		]))
	})

	it('replaceThemByPeriod()', () => {
		let whole = [
			',type,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50',
			'218,text,限价,借,1,~,7,天,资金,，,高价,借,8,~,14,天,资金,8000,万,，,各位,金主,求,翻牌,，,求,上岸,啊,,,,,,,,,,,,,,,,,,,,,,,,',
			'219,label,,side:1,,,tlow,i_tlow,,,,side:1,,,tlow,i_tlow,,total,i_total,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
		]

		let expectedResult = [
			',type,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50',
			'218,text,限价,借,1,~,7,天,资金,，,高价,借,8,~,14,天,资金,8000,万,，,各位,金主,求,翻牌,，,求,上岸,啊,,,,,,,,,,,,,,,,,,,,,,,,',
			'219,label,,side:1,tlow,,thigh,i_tlow,,,,side:1,,,tlow,i_tlow,,total,i_total,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
		]

		let result = CSVParser.replaceThemByPeriod(whole)

		assert.equal(expectedResult.length, result.length)
		for (let i = 0; i < expectedResult.length; i++) {
			assert.equal(expectedResult[i], result[i])
		}
	})

	it('replaceThemByPeriod() unchanged case', () => {
		let whole = [
			',type,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50',
			'0,text,出,7,天,隔夜,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1,label,side:2,tlow,i_tlow,tlow,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
		]

		let expectedResult = [
			',type,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50',
			'0,text,出,7,天,隔夜,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1,label,side:2,tlow,i_tlow,tlow,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
		]

		let result = CSVParser.replaceThemByPeriod(whole)

		assert.equal(expectedResult.length, result.length)
		for (let i = 0; i < expectedResult.length; i++) {
			assert.equal(expectedResult[i], result[i])
		}
	})

	it('replaceThem()', () => {
		let whole = [
			',type,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50',
			'0,text,出,7,天,隔夜,aa,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1,label,side:2,tlow,i_tlow,tlow,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'2,text,出,隔夜,7000,万,，,上午,还款,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'3,label,side:2,tlow,total,i_total,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
		]

		let expectedResult = [
			',type,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50',
			'0,text,出,7,天,隔夜,aa,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1,label,side:2,tlow,i_tlow,tlow,tag:11,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'2,text,出,隔夜,7000,万,，,上午,还款,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'3,label,side:2,tlow,total,i_total,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
		]

		let result = CSVParser.replaceThem(whole, 'aa', 'tag:11', CSVParser.findMatchIndexesPartialy)

		assert.equal(expectedResult.length, result.length)
		for (let i = 0; i < expectedResult.length; i++) {
			assert.equal(expectedResult[i], result[i])
		}
	})

	it('getMatchedIndexesOfMultipleWords()', () => {
		let originString = '1866,text,出,隔夜,1.1,e,，,押券,AA+,可,拆,押券,aa+,可,拆'
		let row = originString.split(',')
		let matchedIndexesOfMultipleWords = CSVParser.getMatchedIndexesOfMultipleWords(row, ['押券', 'AA+'])
		assert.equal(2, matchedIndexesOfMultipleWords.length)
		assert.equal(7, matchedIndexesOfMultipleWords[0])
		assert.equal(11, matchedIndexesOfMultipleWords[1])
	})

	it('getMatchedIndexesOfMultipleWords() with 3 search texts', () => {
		let originString = '1866,text,出,隔夜,1.1,e,，,押券,AA+,可,拆,押券,aa+,可,拆'
		let row = originString.split(',')
		let matchedIndexesOfMultipleWords = CSVParser.getMatchedIndexesOfMultipleWords(row, ['押券', 'AA+', '可'])
		assert.ok(_.isEqual([7, 11], matchedIndexesOfMultipleWords))
	})

	it('getMatchedIndexesOfMultipleWords() with not matched search texts', () => {
		let originString = '1866,text,出,隔夜,1.1,e,，,押券,AA+,可,拆,押券,aa+,可,拆'
		let row = originString.split(',')
		let matchedIndexesOfMultipleWords = CSVParser.getMatchedIndexesOfMultipleWords(row, ['押券', 'AA++', '可'])
		assert.ok(_.isEqual([], matchedIndexesOfMultipleWords))
	})

	it('combineMultipleWordsByIndexes() will combine all appearence of a words', () => {
		let originString = '1866,text,出,隔夜,1.1,e,，,押券,AA+,可,拆,押券,aa+,可,拆'
		let row = originString.split(',')
		let rowCombined = CSVParser.combineMultipleWordsByIndexes(row, [7, 11], ['押券', 'AA+'])
		assert.equal(row.length - 2, rowCombined.length)
		assert.equal('1866,text,出,隔夜,1.1,e,，,押券AA+,可,拆,押券AA+,可,拆', rowCombined.join(','))
	})

	it('replaceMultipleWordsByIndexes() will replace all appearence of words', () => {
		let originString = '1866,text,出,隔夜,1.1,e,，,押券,AA+,可,拆,押券,aa+,可,拆'
		let row = originString.split(',')
		assert.equal(15, row.length)
		let rowCombined = CSVParser.replaceMultipleWordsByIndexes(row, [7, 11], ['押券'], ['oo'])
		assert.equal(row.length, rowCombined.length)
		assert.equal('1866,text,出,隔夜,1.1,e,，,oo,AA+,可,拆,oo,aa+,可,拆', rowCombined.join(','))
	})

	it('replaceMultipleWordsByIndexes() will replace all appearence of words with multiple search texts', () => {
		let originString = '1866,text,出,隔夜,1.1,e,，,押券,AA+,可,拆,押券,aa+,可,拆'
		let row = originString.split(',')
		assert.equal(15, row.length)
		let rowCombined = CSVParser.replaceMultipleWordsByIndexes(row, [7, 11], ['押券', 'AA+'], ['oo', 'ppp'])
		assert.equal(row.length, rowCombined.length)
		assert.equal('1866,text,出,隔夜,1.1,e,，,oo,ppp,可,拆,oo,ppp,可,拆', rowCombined.join(','))
	})

	it('cutThemStateMachine() should return an object contains 2 fields', () => {
		let whole = [
			',type,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50',
			'0,text,出,7,天,隔夜,aa,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1,label,side:2,tlow,i_tlow,tlow,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1866,text,出,隔夜,1.1,e,，,押券,AA+,可,拆,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1867,label,side:2,tlow,total,i_total,,mode:102,tag:11,,mode:101,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
		]
		let result = CSVParser.cutThemStateMachine(whole, [
			{
				searchTexts: ['押券', 'AA+'],
				newValues: ['tag:25', '']
			}], [])
		assert.equal(3, result.originSheet.length)
		assert.equal(3, result.newSheet.length)

		assert.equal('1866,text,出,隔夜,1.1,e,，,押券,AA+,可,拆,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', result.newSheet[0])
		assert.equal('1866,text,出,隔夜,1.1,e,，,押券AA+,可,拆,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', result.newSheet[1])
		assert.equal('1867,label,side:2,tlow,total,i_total,,tag:25,,mode:101,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', result.newSheet[2])
	})

	it('cutThemStateMachine() should return an object contains 2 fields with multiple rules', () => {
		let whole = [
			',type,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50',
			'0,text,出,7,天,隔夜,aa,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1,label,side:2,tlow,i_tlow,tlow,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1866,text,出,隔夜,1.1,e,，,押券,AA+,可,拆,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1867,label,side:2,tlow,total,i_total,,mode:102,tag:11,,mode:101,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
		]
		let result = CSVParser.cutThemStateMachine(whole, [
			{
				searchTexts: ['押券', 'AA+'],
				newValues: ['tag:25', '']
			},
			{
				searchTexts: ['出', '隔夜'],
				newValues: ['bbb', '']
			}
		], [])
		assert.equal(3, result.originSheet.length)
		assert.equal(3, result.newSheet.length)

		assert.equal('1866,text,出,隔夜,1.1,e,，,押券,AA+,可,拆,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', result.newSheet[0])
		assert.equal('1866,text,出隔夜,1.1,e,，,押券AA+,可,拆,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', result.newSheet[1])
		assert.equal('1867,label,bbb,total,i_total,,tag:25,,mode:101,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', result.newSheet[2])
	})

	it('transform() will produce a new state', () => {
		let originState = {
			inNewSheet: false,
			keys: ['1866', 'text', '出', '隔夜', '1.1', 'e'],
			newKeys: ['1866', 'text', '出', '隔夜', '1.1', 'e'],
			values: ['1867', 'label', 'side:2', 'tlow', 'total', 'i_total']
		}

		let newState = originState

		newState = CSVParser.transform(newState, {
			searchTexts: ['出', '隔夜'],
			newValues: ['bbb', '']
		})

		assert.ok(_.isEqual(['1866', 'text', '出隔夜', '1.1', 'e'], newState.newKeys))
		assert.ok(_.isEqual(['1867', 'label', 'bbb', 'total', 'i_total'], newState.values))
	})

	it('transform() will produce a new state with only replacement rule', () => {
		let originState = {
			inNewSheet: false,
			keys: ['1866', 'text', '出', '隔夜', '1.1', 'e'],
			newKeys: ['1866', 'text', '出', '隔夜', '1.1', 'e'],
			values: ['1867', 'label', 'side:2', 'tlow', 'total', 'i_total']
		}

		let newState = originState

		newState = CSVParser.transform(newState, {
			searchTexts: ['出', '隔夜'],
			newSearchTexts: ['出隔', '夜'],
			newValues: ['ttt', 'ooo']
		})

		assert.ok(_.isEqual(['1866', 'text', '出隔', '夜', '1.1', 'e'], newState.newKeys))
		assert.ok(_.isEqual(['1867', 'label', 'ttt', 'ooo', 'total', 'i_total'], newState.values))
	})

	it('cutThemStateMachine() should return an object contains 2 fields with multiple rules and with only replacement rule', () => {
		let whole = [
			',type,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50',
			'0,text,出,7,天,隔夜,aa,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1,label,side:2,tlow,i_tlow,tlow,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1866,text,出,隔夜,1.1,e,，,押券,AA+,可,拆,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'1867,label,side:2,tlow,total,i_total,,mode:102,tag:11,,mode:101,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
		]
		let result = CSVParser.cutThemStateMachine(whole, [
			{
				searchTexts: ['押券', 'AA+'],
				newValues: ['tag:25', '']
			},
			{
				searchTexts: ['出', '隔夜'],
				newValues: ['bbb', '']
			},
			{
				searchTexts: ['1866', 'text'],
				newSearchTexts: ['1866t', 'ext'],
				newValues: ['rrr', 'sss']
			}
		], [])
		assert.equal(3, result.originSheet.length)
		assert.equal(3, result.newSheet.length)

		assert.equal('1866,text,出,隔夜,1.1,e,，,押券,AA+,可,拆,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', result.newSheet[0])
		assert.equal('1866t,ext,出隔夜,1.1,e,，,押券AA+,可,拆,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', result.newSheet[1])
		assert.equal('rrr,sss,bbb,total,i_total,,tag:25,,mode:101,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', result.newSheet[2])
	})

	// ['亿在', '账'], ['亿', '在账'], ['i_total', 'tag:20']

	it('findMatchIndexesPartialy()', () => {
		let matchedIndexes = CSVParser.findMatchIndexesPartialy([
			'0', 'text', '出', '7', '天', '隔夜', 'aa', 'AA'
		], 'aa')

		assert.equal(2, matchedIndexes.length)
		assert.equal(6, matchedIndexes[0])
		assert.equal(7, matchedIndexes[1])
	})

	it('findMatchIndexesExactly()', () => {
		let matchedIndexes = CSVParser.findMatchIndexesExactly([
			'0', 'text', '出', '7', '天', '隔夜', 'aa', 'AA'
		], 'aa')

		assert.equal(2, matchedIndexes.length)
		assert.equal(6, matchedIndexes[0])
		assert.equal(7, matchedIndexes[1])
	})

	it('setNewValueByIndexes()', () => {
		let nextRow = [
			'1', 'label', 'side:2', 'tlow', 'i_tlow', 'tlow', 'ooo', 'ppp'
		]
		let matchedIndexes = [6, 7]
		let target = 'tag:11'

		let resultNextRow = CSVParser.setNewValueByIndexes(nextRow, matchedIndexes, target)

		assert.equal(8, resultNextRow.length)
		assert.equal('tag:11', resultNextRow[6])
		assert.equal('tag:11', resultNextRow[7])
	})

	it('toStaticQuoteCommaQuote(): "," ==> QUOTE_COMMA_QUOTE', () => {
		assert.equal('138,text,出,5D,5000,QUOTE_COMMA_QUOTE,押利率,，,上午,还款,欢迎,来,撩,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			CSVParser.toStaticQuoteCommaQuote('138,text,出,5D,5000,",",押利率,，,上午,还款,欢迎,来,撩,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'))
	})

	it('toSymbleQuoteCommaQuote()', () => {
		assert.equal('138,text,出,5D,5000,",",押利率,，,上午,还款,欢迎,来,撩,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			CSVParser.toSymbleQuoteCommaQuote('138,text,出,5D,5000,QUOTE_COMMA_QUOTE,押利率,，,上午,还款,欢迎,来,撩,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'))
	})

	it('check strange case', () => {
		let whole = [
			',type,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50',
			'138,text,出,5D,5000,",",押利率,，,上午,还款,欢迎,来,撩,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'139,label,side:2,tlow,,,tag:10,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
		]

		let wholeParsed = CSVParser.replaceThem(whole, 'aa', 'tag:11', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '押利率', 'tag:10', CSVParser.findMatchIndexesPartialy)

		let expectedWhole = [
			',type,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50',
			'138,text,出,5D,5000,",",押利率,，,上午,还款,欢迎,来,撩,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
			'139,label,side:2,tlow,,,tag:10,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'
		]

		assert.equal(expectedWhole.length, wholeParsed.length)
		assert.equal(expectedWhole[0], wholeParsed[0])
		assert.equal(expectedWhole[1], wholeParsed[1])
		assert.equal(expectedWhole[2], wholeParsed[2])
	})

	xit('Homework', (done) => {
		let fileName = 'appletree_out_18001-19000'
		let whole = []

		fs.readFileSync(path.join(__dirname, fileName + '.csv')).toString().split('\r\n').forEach((line) => {
			whole.push(line)
		})

		let wholeParsed = whole

		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '收', 'side:1', CSVParser.findMatchIndexesExactly)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '出', 'side:2', CSVParser.findMatchIndexesExactly)

		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '拆借', 'mode:101', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '押利率或存单', 'mode:102', CSVParser.findMatchIndexesPartialy)

		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '质押', 'mode:102', CSVParser.findMatchIndexesExactly)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '买断', 'mode:103', CSVParser.findMatchIndexesExactly)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '质押买断', 'mode:104', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '协议式回购', 'mode:105', CSVParser.findMatchIndexesPartialy)

		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '押利率', 'tag:10', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '利率', 'tag:10', CSVParser.findMatchIndexesExactly)
		wholeParsed = CSVParser.replaceThem(wholeParsed, 'aa', 'tag:11', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '2A', 'tag:11', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '3A', 'tag:11', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, 'AA+', 'tag:11', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '押信用', 'tag:11', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '押中债', 'tag:12', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '押上清', 'tag:13', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '押存单', 'tag:14', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '押CD', 'tag:14', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '不限押', 'tag:15', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '限银行', 'tag:16', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '限农信', 'tag:17', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '限农商', 'tag:17', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '限非银', 'tag:18', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '限直连', 'tag:19', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '钱在账', 'tag:20', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '秒到', 'tag:20', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '上午到账', 'tag:20', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '早还款', 'tag:21', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '早后台', 'tag:22', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '押券宽松', 'tag:23', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '压券宽松', 'tag:23', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '宽松', 'tag:23', CSVParser.findMatchIndexesExactly)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '不限户', 'tag:24', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '限AA以上', 'tag:25', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '押AA+', 'tag:25', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '押AAA', 'tag:25', CSVParser.findMatchIndexesPartialy)
		//
		wholeParsed = CSVParser.replaceThem(wholeParsed, '限AA', 'tag:26', CSVParser.findMatchIndexesExactly)

		wholeParsed = CSVParser.replaceThem(wholeParsed, '隔夜', 'tlow', CSVParser.findMatchIndexesExactly)

		wholeParsed = CSVParser.replaceThem(wholeParsed, '加权', 'price:1', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '加点', 'price:2', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '减点', 'price:3', CSVParser.findMatchIndexesPartialy)
		wholeParsed = CSVParser.replaceThem(wholeParsed, '定价', 'price:4', CSVParser.findMatchIndexesPartialy)

		wholeParsed = CSVParser.replaceThemByPeriod(wholeParsed)

		let combined = {
			originSheet: wholeParsed,
			newSheet: []
		}

		assert.equal(2001, combined.originSheet.length)
		assert.equal(0, combined.newSheet.length)

		combined = CSVParser.cutThemStateMachine(combined.originSheet, [
			{
				searchTexts: ['在', '帐'],
				newValues: ['tag:20', '']
			},
			{
				searchTexts: ['在', '账'],
				newValues: ['tag:20', '']
			},
			{
				searchTexts: ['不限', '户'],
				newValues: ['tag:24', '']
			},
			{
				searchTexts: ['押券', 'AA+'],
				newValues: ['tag:25', '']
			},
			{
				searchTexts: ['押券', 'AA'],
				newValues: ['tag:25', '']
			},
			{
				searchTexts: ['押', 'AA'],
				newValues: ['tag:25', '']
			},
			{
				searchTexts: ['压', 'AA'],
				newValues: ['tag:25', '']
			},
			{
				searchTexts: ['押', '2A'],
				newValues: ['tag:25', '']
			},
			{
				searchTexts: ['押', 'AA+'],
				newValues: ['tag:25', '']
			},
			{
				searchTexts: ['压', 'AA+'],
				newValues: ['tag:25', '']
			},
			{
				searchTexts: ['押', 'AAA'],
				newValues: ['tag:25', '']
			},
			{
				searchTexts: ['押', '3A'],
				newValues: ['tag:25', '']
			},
			{
				searchTexts: ['限', 'AA+'],
				newValues: ['tag:25', '']
			},
			{
				searchTexts: ['限', '直连'],
				newValues: ['tag:19', '']
			},
			{
				searchTexts: ['压', '利率'],
				newValues: ['tag:10', '']
			},
			{
				searchTexts: ['压', '信用'],
				newValues: ['tag:11', '']
			},
			{
				searchTexts: ['上午', '还款'],
				newValues: ['tag:21', '']
			},
			{
				searchTexts: ['上午', '还', '钱'],
				newValues: ['tag:21', '', '']
			},
			{
				searchTexts: ['3', '点前', '还款'],
				newValues: ['tag:21', '', '']
			},
			{
				searchTexts: ['上午', '到', '账'],
				newValues: ['tag:20', '']
			},
			{
				searchTexts: ['亿在', '账'],
				newSearchTexts: ['亿', '在账'],
				newValues: ['i_total', 'tag:20']
			}
		], combined.newSheet)

		assert.equal(1477, combined.originSheet.length)
		assert.equal(786, combined.newSheet.length)

		arrayToFile(combined.originSheet, path.join(__dirname, fileName + '-result.csv'))
		arrayToFile(combined.newSheet, path.join(__dirname, fileName + '-special.csv'))

		done()
	}).timeout(30000)
})

function arrayToFile (wholeParsed, fileFullPath) {
	fs.writeFileSync(fileFullPath, '')
	wholeParsed.forEach((row) => {
		if (row !== '') fs.appendFileSync(fileFullPath, row + '\r\n')
	})
}
