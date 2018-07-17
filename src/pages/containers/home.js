import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import BlockList from '../../blocklist/blocklist';
import Header from '../../header/header';
import WidgetOverview from '../../widget/widget-overview';
import data from '../../api.json';
import { Pager, Row } from 'react-bootstrap';
import './home.css'
import HttpClient from '../../httpclient.js'


class Home extends Component{
	constructor(props) {
    	super(props);
	    this.state = {blocks: []};
	}

	componentDidMount() {
		this.UserList();
	}

	UserList() {
		const apiURL = 'http://api.nodepark.com/v1/blocks/'; // Get 10 results
		const headerOptions = {};

		const get = HttpClient.get(apiURL, headerOptions);

		get.then((response)=>{ // Promise
		  this.setState({blocks: response.result})
		}).catch((err)=>{
		  console.err(err);
		});
	 }

	render (){
		console.log("This works: ")
		console.log(this.state.blocks)
		return (
			<HomeLayout>
				<Header />
				<section className="WidgetOverviewContainer container">
					<Row>
						<WidgetOverview size_xs={6} size_md={3} number="221 days, 7 hours" title="Uptime" icon="a" bg="#3598dc" color="#fff"/>
						<WidgetOverview size_xs={6} size_md={3} number="221.056" title="Txns per day" icon="a" bg="#8BC34A" color="#fff" />
						<WidgetOverview size_xs={6} size_md={3} number="132.865 tx / 50 MB" title="Mempool" icon="a" bg="#3598dc" color="#fff" />
						<WidgetOverview size_xs={6} size_md={3} number="200 GB" title="Blockchain Size" icon="a" bg="#32c5d2" color="#fff" />
					</Row>
				</section>
				<section className="container">
					<h3>Latest Blocks</h3>
					<BlockList data={this.state.blocks} />
					<Pager>
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