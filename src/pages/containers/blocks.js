import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import BlockList from '../../blocklist/blocklist';
import Header from '../../header/header';
import WidgetOverview from '../../widget/widget-overview';
import { Pager, Row } from 'react-bootstrap';
import './home.css'
import HttpClient from '../../httpclient.js'
import {prettySize} from 'pretty-size';

class Blocks extends Component{
	constructor(props) {
    	super(props);
	    this.state = {
	    	blocks: [],
	    };
	}

	componentDidMount() {
		this.BlockList();
	}

	BlockList() {
		const apiURL = 'http://api.nodepark.com/v1/blocks/'; // Get 10 results
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

	render (){
		return (
			<section>
				<Header />
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
			</section>
		)
	}
}


export default Blocks;