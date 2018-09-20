export default {
	isReferralUrl (path) {
		return /\/referral\/\w+/.test(path)
	}
}
