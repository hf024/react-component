export default {
	// TODO: need to use regular expression to check this cookie's value. e.g. length of value should be 18?
	getCookie (documentCookie, cookieName) {
		if (!documentCookie) return ''

		var sections = documentCookie.split(';')

		for (var i = 0; i < sections.length; i++) {
			var section = sections[i].trim()
			var namePart = cookieName + '='
			if (section.indexOf(namePart) === 0) {
				return section.substring(namePart.length, section.length)
			}
		}

		return ''
	}
}
