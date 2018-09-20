import _ from 'lodash'

function findMatchIndexesPartialy (items, origin) {
	let matchedIndexes = []

	items.forEach((item, index) => {
		if (item.toLowerCase().indexOf(origin.toLowerCase()) >= 0) {
			matchedIndexes.push(index)
		}
	})

	return matchedIndexes
}

function findMatchIndexesExactly (items, origin) {
	let matchedIndexes = []

	items.forEach((item, index) => {
		if (item.toLowerCase() === origin.toLowerCase()) {
			matchedIndexes.push(index)
		}
	})

	return matchedIndexes
}

function setNewValueByIndexes (nextRow, matchedIndexes, target) {
	matchedIndexes.forEach((value) => {
		nextRow[value] = target
	})
	return nextRow
}

function toStaticQuoteCommaQuote (input) {
	return input.replace('","', 'QUOTE_COMMA_QUOTE')
}

function toSymbleQuoteCommaQuote (input) {
	return input.replace('QUOTE_COMMA_QUOTE', '","')
}

function replaceThem (list, origin, target, matchFunction) {
	let resultList = []

	resultList.push(list[0])

	for (let i = 1; i < list.length; i = i + 2) {
		if (list[i] === '') continue

		let row = toStaticQuoteCommaQuote(list[i]).split(',')

		let nextRow = list[i + 1].split(',')

		let matchedIndexes = matchFunction(row, origin)
		nextRow = setNewValueByIndexes(nextRow, matchedIndexes, target)

		resultList.push(toSymbleQuoteCommaQuote(row.join(',')))
		resultList.push(nextRow.join(','))
	}

	return resultList
}

function isPeriod (input) {
	return /^\d{1,2}[Dd]{0,1}$/g.test(input)
}

function isDash (input) {
	return input === '-' || input === '~'
}

function getMatchedPeriodIndex (row) {
	for (let i = 0; i < row.length - 2; i++) {
		if (isPeriod(row[i]) && isDash(row[i + 1]) && isPeriod(row[i + 2])) return i
		continue
	}
	return -1
}

function replaceThemByPeriod (list) {
	let resultList = []

	resultList.push(list[0])

	for (let i = 1; i < list.length; i = i + 2) {
		if (list[i] === '') continue

		let row = toStaticQuoteCommaQuote(list[i]).split(',')
		let nextRow = list[i + 1].split(',')

		let matchedIndex = getMatchedPeriodIndex(row)

		if (matchedIndex >= 0) {
			nextRow[matchedIndex] = 'tlow'
			nextRow[matchedIndex + 1] = ''
			nextRow[matchedIndex + 2] = 'thigh'
		}

		resultList.push(toSymbleQuoteCommaQuote(row.join(',')))
		resultList.push(nextRow.join(','))
	}

	return resultList
}

function isEqualIgnoreCase (currentTexts, searchTexts) {
	return currentTexts.length === searchTexts.length && currentTexts.every((v, i) => { return v.toLowerCase() === searchTexts[i].toLowerCase() })
}

function getMatchedIndexesOfMultipleWords (row, searchTexts) {
	let matchedIndexes = []
	for (let i = 0; i < row.length - searchTexts.length;) {
		let currentTexts = row.slice(i, i + searchTexts.length)
		if (isEqualIgnoreCase(currentTexts, searchTexts)) {
			matchedIndexes.push(i)
			i = i + searchTexts.length
			continue
		}
		i = i + 1
	}
	return matchedIndexes
}

function combineMultipleWordsByIndexes (row, matchedIndexes, searchTexts) {
	let cloneRow = _.cloneDeep(row)

	matchedIndexes.forEach((matchedIndex, index) => {
		let newMatchedIndex = matchedIndex - index * (searchTexts.length - 1)
		cloneRow.splice(newMatchedIndex, searchTexts.length, searchTexts.join(''))
	})

	return cloneRow
}

function replaceMultipleWordsByIndexes (row, matchedIndexes, searchTexts, newValues) {
	let cloneRow = _.cloneDeep(row)
	matchedIndexes.forEach((matchedIndex, index) => {
		cloneRow.splice(matchedIndex, searchTexts.length, ...newValues)
	})

	return cloneRow
}

function transform (state, rule) {
	let matchedIndexes = getMatchedIndexesOfMultipleWords(state.newKeys, rule.searchTexts)

	if (matchedIndexes.length > 0) {
		state.inNewSheet = true

		if (rule.newSearchTexts) {
			state.newKeys = replaceMultipleWordsByIndexes(state.newKeys, matchedIndexes, rule.searchTexts, rule.newSearchTexts)
			state.values = replaceMultipleWordsByIndexes(state.values, matchedIndexes, rule.searchTexts, rule.newValues)
		} else {
			state.newKeys = combineMultipleWordsByIndexes(state.newKeys, matchedIndexes, rule.searchTexts)
			state.values = combineMultipleWordsByIndexes(state.values, matchedIndexes, rule.newValues)
		}
	}

	return state
}

function cutThemStateMachine (list, rules, newSheet) {
	let originSheet = []
	originSheet.push(list[0])

	for (let i = 1; i < list.length; i = i + 2) {
		if (list[i] === '') continue

		let originState = {
			inNewSheet: false,
			keys: toStaticQuoteCommaQuote(list[i]).split(','),
			newKeys: toStaticQuoteCommaQuote(list[i]).split(','),
			values: list[i + 1].split(',')
		}

		let newState = originState

		rules.forEach((rule) => {
			newState = transform(newState, rule)
		})

		if (newState.inNewSheet) {
			let items = []
			items.push(toSymbleQuoteCommaQuote(newState.keys.join(',')))
			items.push(toSymbleQuoteCommaQuote(newState.newKeys.join(',')))
			items.push(newState.values.join(','))

			newSheet = newSheet.concat(items)
			continue
		}

		originSheet.push(toSymbleQuoteCommaQuote(newState.keys.join(',')))
		originSheet.push(newState.values.join(','))
	}

	return {
		originSheet: originSheet,
		newSheet: newSheet
	}
}

export default {
	replaceThem,
	findMatchIndexesPartialy,
	findMatchIndexesExactly,
	setNewValueByIndexes,
	toStaticQuoteCommaQuote,
	toSymbleQuoteCommaQuote,
	replaceThemByPeriod,
	getMatchedPeriodIndex,
	isPeriod,
	getMatchedIndexesOfMultipleWords,
	combineMultipleWordsByIndexes,
	replaceMultipleWordsByIndexes,
	cutThemStateMachine,
	transform
}
