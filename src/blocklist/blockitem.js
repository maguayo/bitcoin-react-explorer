import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {prettySize} from 'pretty-size';
import { Link } from 'react-router-dom'


class BlockItem extends Component{
	render (){
		return (
			<tr>
				<td><Link to={"/block/" + this.props.height}>{this.props.height}</Link></td>
				<td><Moment unix fromNow>{this.props.age}</Moment></td>
				<td>{this.props.txs}</td>
				<td className="hidden-xs">?</td>
				<td className="hidden-xs">{prettySize(this.props.weight, true)}</td>
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