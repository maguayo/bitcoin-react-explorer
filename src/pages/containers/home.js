import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import BlockList from '../../blocklist/blocklist';
import Header from '../../header/header';
import WidgetOverview from '../../widget/widget-overview';
import { Pager, Row } from 'react-bootstrap';
import './home.css'
import HttpClient from '../../httpclient.js'
import {prettySize} from 'pretty-size';

class Home extends Component{
	constructor(props) {
    	super(props);
	    this.state = {
	    	blocks: [],
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
		this.BlockList();
		this.BlockchainInfo();
		this.MempoolInfo();
	}

	BlockList() {
		const apiURL = 'https://api.nodepark.com/v1/blocks/'; // Get 10 results
		const headerOptions = {};

		const get = HttpClient.get(apiURL, headerOptions);

		get.then((response)=>{ // Promise
			console.log("Blocks:")
			console.log(response)
		  this.setState({blocks: response.result})
		}).catch((err)=>{
		  console.error(err);
		});
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
			<HomeLayout>
				<Header />
				<section className="WidgetOverviewContainer container">
					<Row>
						<WidgetOverview size_xs={6} size_md={3} number={prettySize(this.state.blockchain.getnettotals.totalbytesrecv, true)} title="Network (recv)" icon="a" bg="#3598dc" color="#fff"/>
						<WidgetOverview size_xs={6} size_md={3} number={prettySize(this.state.blockchain.getnettotals.totalbytessent, true)} title="Network (sent)" icon="a" bg="#8BC34A" color="#fff" />
						<WidgetOverview size_xs={6} size_md={3} number={this.state.mempool.txns + " tx / " + prettySize(this.state.mempool.bytes, true)} title="Mempool" icon="a" bg="#F44336" color="#fff" />
						<WidgetOverview size_xs={6} size_md={3} number={prettySize(this.state.blockchain.getblockchaininfo.size_on_disk, true)} title="Blockchain Size" icon="a" bg="#32c5d2" color="#fff" />
					</Row>
				</section>
				<section className="container">
					<h3>Latest Blocks</h3>
					<BlockList data={this.state.blocks} />
					<Pager className="hide">
					  <Pager.Item previous href="#">
					    &larr; Previous Page
					  </Pager.Item>
					  <Pager.Item next href="#">
					    Next Page &rarr;
					  </Pager.Item>
					</Pager>
				</section>
			</HomeLayout>
		)
	}
}


export default Home;