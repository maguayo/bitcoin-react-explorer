import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import BlockList from '../../blocklist/blocklist';
import Header from '../../header/header';
import WidgetOverview from '../../widget/widget-overview';
import { Pager, Row } from 'react-bootstrap';
import './home.css'
import HttpClient from '../../httpclient.js'
import {prettySize} from 'pretty-size';

class Status extends Component{
	constructor(props) {
    	super(props);
	   	this.state = {
	    	blockchain: {
	    		getblockchaininfo: {
	    			size_on_disk: 0
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
		return (
			<section>
				<Header />
				
			</section>
		)
	}
}


export default Status;