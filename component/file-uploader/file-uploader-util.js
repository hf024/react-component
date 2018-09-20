export const extensionList = ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.rar', '.zip', '.pdf']

export const isValidExtension = (fileName, list) => {
	if (!fileName || fileName === '') return false
	return list.some((extension) => {
		return fileName.toLowerCase().lastIndexOf(extension.toLowerCase()) === (fileName.length - extension.length)
	})
}

export const setValueWhenItemExist = (list, key, fieldName, newValue) => {
	let matchedItem = list.find((item) => {
		return !item.hidden && item.fileName === key
	})

	if (!matchedItem) return list

	matchedItem[fieldName] = newValue
	return list
}

export const setValueWithCreation = (list, key, fieldName, newValue) => {
	let matchedItem = list.find((item) => {
		return !item.hidden && item.fileName === key
	})
	if (matchedItem) {
		matchedItem[fieldName] = newValue
	} else {
		list.push({
			fileName: key,
			[fieldName]: newValue
		})
	}
	return list
}

export const toMB = (size) => {
	return size / 1024 / 1024
}
