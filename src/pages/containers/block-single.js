import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import BlockList from '../../blocklist/blocklist';
import Header from '../../header/header';
import WidgetOverview from '../../widget/widget-overview';
import { Pager, Row } from 'react-bootstrap';
import './home.css'
import HttpClient from '../../httpclient.js'
import {prettySize} from 'pretty-size';

class BlockSingle extends Component{
	constructor(props) {
    	super(props);
	    this.state = {
	    	block: {
	    		bits: "",
				chainwork: "",
				confirmations: "",
				difficulty: "",
				hash: "",
				height: "",
				mediantime: "",
				merkleroot: "",
				nextblockhash: "",
				nonce: "",
				previousblockhash: "",
				size: "",
				strippedsize: "",
				time: "",
				tx: "",
				version: "",
				nTx: "",
				versionHex: "",
				weight: ""
	    	}
	    };
	}

	componentDidMount() {
		this.BlockGet();
	}

	BlockGet() {
		console.log("BlockHash:")
		console.log(this.props.match.params.blockHash);
		const apiURL = 'https://api.nodepark.com/v1/blocks/' + this.props.match.params.blockHash;
		const headerOptions = {};

		const get = HttpClient.get(apiURL, headerOptions);

		get.then((response)=>{ // Promise
			console.log("Block:")
			console.log(response)
		  this.setState({block: response.result})
		}).catch((err)=>{
		  console.error(err);
		});
	}

	render (){
		return (
			<section>
				<Header />
				<section className="container">
					<h3> Block: {this.state.block.height} <br /> <small>{this.state.block.hash}</small> </h3>
					<hr />
					<ul className="nav nav-tabs mb-3">
						<li className="nav-item">
							<a className="nav-link active show" data-toggle="tab" href="#tab-summary" role="tab" aria-selected="true">Summary</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" data-toggle="tab" href="#tab-raw" role="tab" aria-selected="false">Raw</a>
						</li>
					</ul>
					<div className="tab-content">
						<div className="tab-pane active show" id="tab-summary" role="tabpanel">
							<div className="row">
								<div className="col-md-6">
									<div className="table-responsive">
										<table className="table">
											<tbody>
												<tr>
													<th className="table-active properties-header">Previous Block</th>
													<td className="monospace word-wrap">
														<a className="word-wrap" href="/block/000000000000000000019dc28ec384756c7ec120ef10d07a50527bffa1511411">
															000000000000000000019dc28ec384756c7ec120ef10d07a50527bffa1511411
														</a>
														<br />
														<span className="text-muted">#532,799</span>
													</td>
												</tr>
												<tr>
													<th className="table-active properties-header">Timestamp (utc)</th>
													<td className="monospace">
														2018-07-20 12:43:26<br /><span className="text-muted"> (age 4:39)</span>
													</td>
												</tr>
												<tr>
													<th className="table-active properties-header">Transaction Count</th>
													<td className="monospace">{this.state.block.nTx}</td>
												</tr>
												<tr>
													<th className="table-active properties-header">Total Fees</th>
													<td className="monospace">
														<span className="monospace">0.07884305 BTC </span>
													</td>
												</tr>
												<tr>
													<th className="table-active properties-header">Average Fee</th>
													<td className="monospace"><span className="monospace">0.00012455 BTC</span></td>
												</tr>
												<tr>
													<th className="table-active properties-header">Size</th>
													<td className="monospace"><span>355,706 bytes</span></td>
												</tr>
												<tr>
													<th className="table-active properties-header">Weight</th>
													<td className="monospace">
														<span>1,147,346 wu</span><br /><span className="text-muted"> (28.68% full)</span>
													</td>
												</tr>
												<tr className="border-bottom">
													<th className="table-active properties-header">Confirmations</th>
													<td className="monospace"><strong className="text-warning">1</strong></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div className="col-md-6">
									<div className="table-responsive">
										<table className="table">
											<tbody>
												<tr>
													<th className="table-active properties-header">Next Block</th>
													<td className="monospace word-wrap"><span>None</span><br /><span className="text-muted">(latest block)</span></td>
												</tr>
												<tr>
													<th className="table-active properties-header">Difficulty</th>
													<td className="monospace"
														><span title="" data-toggle="tooltip" data-original-title="5,178,671,069,072.251"><span>5.179</span><span> x 10</span><sup>12</sup></span>
													</td>
												</tr>
												<tr>
													<th className="table-active text-right">Version</th>
													<td className="monospace">0x20000000<span className="text-muted"> (decimal: 536870912)</span></td>
												</tr>
												<tr>
													<th className="table-active text-right">Nonce</th>
													<td className="monospace">{this.state.block.nonce}</td>
												</tr>
												<tr>
													<th className="table-active text-right">Bits</th>
													<td className="monospace">{this.state.block.bits}</td>
												</tr>
												<tr>
													<th className="table-active text-right">Merkle Root</th>
													<td className="monospace word-wrap">a55a2c2a561d49cf5dabc800a22d45d66f49586ada6a861c75678eeeedbc4884</td>
												</tr>
												<tr>
													<th className="table-active text-right">Chainwork</th>
													<td className="monospace word-wrap">26c8a741f73e965e39950bc<br /><span className="text-muted"><span>(~</span><span>750.19</span><span> x 10</span><sup>24</sup><span> hashes)</span></span>
												</td>
												</tr>
												<tr className="border-bottom">
													<th className="table-active text-right">Miner</th>
													<td className="monospace word-wrap">
														<span>ViaBTC</span>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>

				</section>
			</section>
		)
	}
}


export default BlockSingle;