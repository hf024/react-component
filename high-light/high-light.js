import React from 'react'

export default {
	tagKeyWords (keywords, content) {
		return this.tagMatchedKeyword(keywords, content, false)
	},

	tagHtmlKeyWord (keywords, content) {
		return this.tagMatchedKeyword(keywords, content, true)
	},

	tagMatchedKeyword (keywords, content, isForHtml) {
		keywords = keywords.trim()
		if (keywords.length === 0) return content
		let matchedIndexList = []
		let matchedLenList = {}
		this.getMatchedInfo(keywords, content, matchedIndexList, matchedLenList)
		let sortMatchedIndexList = matchedIndexList.sort((index1, index2) => index1 - index2)

		let html = isForHtml ? '' : []
		html = this.setNoMatchedContent(html, content.substr(0, matchedIndexList[0]), isForHtml)
		sortMatchedIndexList.forEach((matchedIndex, index) => {
			let matchedLen = matchedLenList[matchedIndex]
			let tagKeyword = content.substr(matchedIndex, matchedLen)
			html = this.setMatchedContent(html, tagKeyword, isForHtml)

			let isLastMatched = index >= matchedIndexList.length - 1
			let noTagMatchedLen = isLastMatched ? content.length : matchedIndexList[index + 1]
			html = this.setNoMatchedContent(html, content.substring(matchedIndex + matchedLen, noTagMatchedLen), isForHtml)
		})
		return html
	},

	setNoMatchedContent (html, content, isForHtml) {
		if (isForHtml) {
			html += content
		} else {
			html.push(content)
		}

		return html
	},

	setMatchedContent (html, content, isForHtml) {
		if (isForHtml) {
			html += '<span class="highlight">' + content + '</span>'
		} else {
			html.push(<span className='highlight'>{content}</span>)
		}

		return html
	},

	getEmptyKeyword (keyword) {
		let str = ''
		for (let i = 0; i < keyword.length; i++) {
			str += ' '
		}
		return str
	},

	getMatchedInfo (keywords, content, indexList, lenList) {
		let lowerContent = content.toLowerCase()
		let keywordList = keywords.trim().split(/\s/)
		let sortKeywordList = keywordList.sort((keyword1, keyword2) => keyword2.length - keyword1.length)
		sortKeywordList.forEach((keyword, index) => {
			let lowerKeyword = keyword.toLowerCase()
			this.getSingleMatchedIndexList(lowerKeyword, lowerContent, 0, indexList, lenList)
			lowerContent = lowerContent.replace(new RegExp(keyword, 'gi'), this.getEmptyKeyword(keyword))
		})
	},

	getSingleMatchedIndexList (keyword, content, index, indexList, lenList) {
		let i = content.indexOf(keyword, index)
		if (i === -1) {
			// do nothing
		} else {
			let keywordLen = keyword.length
			indexList.push(i)
			lenList[i] = keywordLen
			this.getSingleMatchedIndexList(keyword, content, i + keywordLen, indexList, lenList)
		}
	}
}
