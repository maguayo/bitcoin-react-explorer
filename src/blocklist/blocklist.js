import React from 'react';
import BlockItem from './blockitem';
import { Table } from 'react-bootstrap';

function BlockList(props){
	const blocks = props.data
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Height</th>
					<th>Age</th>
					<th>Txs</th>
					<th className="hidden-xs">Miner</th>
					<th className="hidden-xs">Weight</th>
					<th>Size</th>
				</tr>
			</thead>
			<tbody>
				{
					blocks.map((item) => {
						return <BlockItem key={item.height} hash={item.hash} height={item.height} age={item.time} txs={item.tx_num} weight={item.weight} size={item.size} />
					})
				}
			</tbody>
		</Table>
	)
}

export default BlockList;