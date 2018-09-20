export default {
	averageWidthStyle (length) {
		let result = Math.floor((100 / length) * 100) / 100
		return {width: result + '%'}
	}
}
