import config from '../http/config'
import {request} from '../http/ajax'

export default {
	track (userEventType) {
		request(config.USER_TRACKING.trackUserEvent, {
			user_event_type: userEventType
		})
	}
}
