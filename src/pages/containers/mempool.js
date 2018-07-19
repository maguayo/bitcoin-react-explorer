import React, { Component } from 'react';
import Header from '../../header/header';
import { Pager, Row, Table } from 'react-bootstrap';
import './mempool.css'
import HttpClient from '../../httpclient.js'
import {prettySize} from 'pretty-size';
import socketIOClient from 'socket.io-client'

class Status extends Component{
	constructor(props) {
    	super(props);
	   	this.state = {
	    	mempool: {
	    		txns: 0,
	    		bytes: 0,
	    		txs: [""]
	    	}
	    };
	}

	componentDidMount() {
		this.MempoolInfo();
	}

	MempoolInfo() {
		const apiURL = 'https://api.nodepark.com/v1/mempool/'; // Get 10 results
		const headerOptions = {};

		const get = HttpClient.get(apiURL, headerOptions);

		get.then((response)=>{ // Promise
			console.log("Mempool:")
			console.log(response)
			this.setState({
			  	mempool: {txns: response.result.txs.length, bytes: response.result.bytes, txs: response.result.txs}
		    })
		}).catch((err)=>{
		  console.error(err);
		});
	}

	render (){
		var cont = 0;
		const socket = socketIOClient("http://127.0.0.1:3002", { transport : ['websocket'] })
    
	    // socket.on is another method that checks for incoming events from the server
	    // This method is looking for the event 'change color'
	    // socket.on takes a callback function for the first argument
	    socket.on('change tx', (msg) => {
	      // setting the color of our button
	      	var d1 = document.getElementById('tBodyMempoolTxs');
			d1.insertAdjacentHTML('afterbegin', '<tr class="new-tx"><td>' + msg + '</td></tr>')
	    })

		return (
			<section>
				<Header />
				<div className="container">
					<h3>Mempool summary</h3>
					<hr />
					<table className="table tableMempoolSummary">
						<tbody>
							<tr>
								<th className="table-active properties-header">Transaction Count</th>
								<td>{this.state.mempool.txns}</td>
							</tr>
							<tr>
								<th className="table-active properties-header">Memory Usage</th>
								<td className="monospace"><span>{prettySize(this.state.mempool.bytes, true)}</span></td>
							</tr>
							<tr>
								<th className="table-active properties-header">Total Fees</th>
								<td className="monospace"><span className="monospace">- BTC</span></td>
							</tr>
							<tr>
								<th className="table-active properties-header">Average Fee</th>
								<td className="monospace">- BTC</td>
							</tr>
							<tr>
								<th className="table-active properties-header">Average Fee per Byte</th>
								<td className="monospace">- sat/B</td>
							</tr>
						</tbody>
					</table>
					<h3>Mempool transactions</h3>
					<hr />
					<Table striped bordered hover>
						<tbody id="tBodyMempoolTxs">
							{
								this.state.mempool.txs.map((t) => {
									cont = cont + 1
									return <tr key={cont}><td>{t}</td></tr>
								})
							}
						</tbody>
					</Table>
				</div>
			</section>
		)
	}
}


export default Status;