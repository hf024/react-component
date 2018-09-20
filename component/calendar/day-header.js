import React from 'react'
import CalendarUtil from './calendar-util'
import Layout from '../../util/layout/layout'

const DayHeader = () => (
	<ul className='day-header'>
		{
			CalendarUtil.DAY_HEADER.map((item, index) => {
				return <li className='day-label'
					key={index}
					style={Layout.averageWidthStyle(CalendarUtil.DAY_HEADER.length)}>{item}</li>
			})
		}
	</ul>
)

export default DayHeader
