import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import BlockList from '../../blocklist/blocklist';
import Header from '../../header/header';
import WidgetOverview from '../../widget/widget-overview';
import { Pager, Row } from 'react-bootstrap';
import './status.css'
import HttpClient from '../../httpclient.js'
import {prettySize} from 'pretty-size';

class Status extends Component{
	constructor(props) {
    	super(props);
	   	this.state = {
	    	blockchain: {
	    		getblockchaininfo: {
	    			blocks: 0,
	    			headers: 0,
	    			size_on_disk: 0,
	    			chain: "",
	    			pruned: "",
	    			difficulty: 0
	    		},
	    		getnetworkinfo: {
	    			version: "",
	    			subversion: "",
	    			protocolversion: "",
	    			connections: 0,
	    			localaddresses: [{port: 8333}],
	    			warnings: ""
	    		},
	    		getnettotals: {
	    			totalbytesrecv: 0,
	    			totalbytessent: 0
	    		}
	    	},
	    	mempool: {
	    		txns: 0,
	    		bytes: 0
	    	}
	    };
	}

	componentDidMount() {
		this.BlockchainInfo();
		this.MempoolInfo();
	}

	BlockchainInfo() {
		const apiURL = 'https://api.nodepark.com/v1/status/'; // Get 10 results
		const headerOptions = {};

		const get = HttpClient.get(apiURL, headerOptions);

		get.then((response)=>{ // Promise
			console.log(response)
		  this.setState({blockchain: response.result})
		}).catch((err)=>{
		  console.error(err);
		});
	}


	MempoolInfo() {
		const apiURL = 'https://api.nodepark.com/v1/mempool/'; // Get 10 results
		const headerOptions = {};

		const get = HttpClient.get(apiURL, headerOptions);

		get.then((response)=>{ // Promise
			console.log("Mempool:")
			console.log(response)
			this.setState({
			  	mempool: {txns: response.result.txs.length, bytes: response.result.bytes}
		    })
		}).catch((err)=>{
		  console.error(err);
		});
	}

	render (){
		let pruned = this.state.blockchain.getblockchaininfo.pruned;
		if (pruned){
			pruned = "Yes"
		}else{
			pruned = "No"
		}
		return (
			<section className="Status">
				<Header />
				<div className="container">
					<h3>Node status</h3>
					<table className="table">
						<tbody>
						<tr>
							<th className="table-active properties-header">Host : Port</th>
							<td className="monospace">localhost : 8332</td></tr>
						<tr>
							<th className="table-active properties-header">Chain</th>
							<td className="monospace">{this.state.blockchain.getblockchaininfo.chain}</td>
						</tr>
						<tr>
							<th className="table-active properties-header">Version</th>
							<td className="monospace">
								{this.state.blockchain.getnetworkinfo.version}
								<span className="monospace"> ({this.state.blockchain.getnetworkinfo.subversion})</span>
							</td>
						</tr>
						<tr>
							<th className="table-active properties-header">Protocol Version</th>
							<td className="monospace">{this.state.blockchain.getnetworkinfo.protocolversion}</td>
						</tr>
						<tr>
							<th className="table-active properties-header">Blockchain Size</th>
							<td className="monospace">
								{prettySize(this.state.blockchain.getblockchaininfo.size_on_disk, true)}
								<span className="text-muted"> (Pruned: {pruned})</span>
							</td>
						</tr>
						<tr>
							<th className="table-active properties-header">Connections</th>
							<td className="monospace">{this.state.blockchain.getnetworkinfo.connections}</td>
						</tr>
						<tr>
							<th className="table-active properties-header">Block Count</th>
							<td className="monospace">
								{this.state.blockchain.getblockchaininfo.blocks}
								<span className="text-muted"> (header count: {this.state.blockchain.getblockchaininfo.headers})</span>
							</td>
						</tr>
						<tr>
							<th className="table-active properties-header">Difficulty</th>
							<td className="monospace"><span>{this.state.blockchain.getblockchaininfo.difficulty}</span></td>
						</tr>
						<tr>
							<th className="table-active properties-header">Network Traffic</th>
							<td className="monospace">
								<span>Total Download: {prettySize(this.state.blockchain.getnettotals.totalbytesrecv, true)}</span> <br />
								<span>Total Upload: {prettySize(this.state.blockchain.getnettotals.totalbytessent, true)}</span>
							</td>
						</tr>
						<tr>
							<th className="table-active properties-header">Warnings</th>
							<td className="monospace"><span>{this.state.blockchain.getnetworkinfo.warnings}</span></td>
						</tr>
						</tbody>
					</table>
				</div>
			</section>
		)
	}
}


export default Status;