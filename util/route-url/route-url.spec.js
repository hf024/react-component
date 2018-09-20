import {assert} from 'chai'
import RouteUrl from './route-url'

describe('RouteUrl', () => {
	it('isReferralUrl() should return true if path is like this /referral/67817903', () => {
		assert.ok(RouteUrl.isReferralUrl('/referral/67817903'))
		assert.ok(RouteUrl.isReferralUrl('/referral/c9a0e053024ac524001e0f1c48696e99'))
		assert.isNotOk(RouteUrl.isReferralUrl('/ttt/67817903'))
	})
})
