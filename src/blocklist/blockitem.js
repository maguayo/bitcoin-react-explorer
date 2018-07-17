import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BlockItem extends Component{
	handleClick = (event) => {
		console.log(this.props.height)
	}
	render (){
		return (
			<tr onClick={this.handleClick}>
				<td>{this.props.height}</td>
				<td>{this.props.age}</td>
				<td>{this.props.txs}</td>
				<td>?</td>
				<td>{this.props.weight}</td>
				<td>{this.props.size}</td>
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