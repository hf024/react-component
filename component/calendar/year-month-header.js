import React, {Component} from 'react'
import PropTypes from 'prop-types'
import NumberSelector from '../number-selector/number-selector'

export default class YearMonthHeader extends Component {
	render () {
		return <div className='year-month-header'>
			<div className='inline-block'>
				<NumberSelector value={this.props.year} onUpdate={this.props.onYearChanged} label={'年'} />
			</div>
			<div className='inline-block'>
				<NumberSelector value={this.props.month} onUpdate={this.props.onMonthChanged} label={'月'} />
			</div>
		</div>
	}
}

YearMonthHeader.propTypes = {
	year: PropTypes.string,
	month: PropTypes.string,
	onYearChanged: PropTypes.func,
	onMonthChanged: PropTypes.func
}
