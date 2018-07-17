import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {prettySize} from 'pretty-size';

class BlockItem extends Component{
	handleClick = (event) => {
		console.log(this.props.height)
	}
	render (){
		return (
			<tr onClick={this.handleClick}>
				<td>{this.props.height}</td>
				<td><Moment unix fromNow>{this.props.age}</Moment></td>
				<td>{this.props.txs}</td>
				<td>?</td>
				<td>{prettySize(this.props.weight, true)}</td>
				<td>{prettySize(this.props.size, true)}</td>
			</tr>
		)
	}
}

BlockItem.propTypes = {
	height: PropTypes.number,
	age: PropTypes.number,
	txs: PropTypes.number,
	size: PropTypes.number,
	weight: PropTypes.number
}

export default BlockItem;