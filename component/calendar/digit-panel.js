import React from 'react'
import PropTypes from 'prop-types'
import NumberGrid from '../number-grid/number-grid'
import CalendarUtil from './calendar-util'
import _ from 'lodash'

const DigitPanel = (props) => {
	return (
		<div className='digit-panel'>
			<div className='digit-header'>
				<div className='type-name'>{props.digitScope.label}</div>
			</div>
			<NumberGrid cells={_.range(props.digitScope.scope)}
				columnCount={props.digitScope.columnCount}
				calculateColorStyleName={(item) => (CalendarUtil.calculateColorStyleNameOfDigitPanel(item, props))}
				onCellSelected={props.onDigitChanged} />
		</div>
	)
}

export default DigitPanel

DigitPanel.propTypes = {
	digitScope: PropTypes.obj,
	onDigitChanged: PropTypes.func
}
