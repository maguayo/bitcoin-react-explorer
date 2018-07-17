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
	    	mempool: {
	    		txns: 0,
	    		bytes: 0
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