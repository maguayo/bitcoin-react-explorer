import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import BlockList from '../../blocklist/blocklist';
import Header from '../../header/header';
import WidgetOverview from '../../widget/widget-overview';
import { Pager, Row } from 'react-bootstrap';
import './block-single.css'
import HttpClient from '../../httpclient.js'
import {prettySize} from 'pretty-size';
import {numeral} from 'numeral';

class BlockSingle extends Component{

	constructor(props) {
    	super(props);
	    this.state = {
	    	url_hash: this.props.match.params.blockHash,
	    	next: "",
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
				size: 0,
				strippedsize: "",
				time: "",
				tx: "",
				version: "",
				nTx: "",
				versionHex: "",
				weight: "",
	    	},
	    	raw: ''
	    };
	}

	componentDidMount() {
		this.BlockGet();
	}

	BlockGet() {
		const apiURL = 'http://api.nodepark.com/v1/blocks/' + this.props.match.params.blockHash;
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


	numberWithCommas(x){
		return x
	}

	render (){

		if(this.state.block.nextblockhash){
			this.state.next = <a className="word-wrap" href={/blocks/ + this.state.block.nextblockhash}>
						{this.state.block.nextblockhash}
					</a>
		}else{
			this.state.next = <span>None</span>
		}
		return (
			<section>
				<Header />
				<section className="container" id="block-single">
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
						<div className="tab-pane active" id="tab-summary" role="tabpanel">
							<div className="row">
								<div className="col-md-6">
									<div className="table-responsive">
										<table className="table">
											<tbody>
												<tr>
													<th className="table-active properties-header">Prev Block</th>
													<td className="monospace word-wrap">
														<a className="word-wrap" href={/blocks/ + this.state.block.previousblockhash}>
															{this.state.block.previousblockhash}
														</a>
													</td>
												</tr>
												<tr>
													<th className="table-active properties-header">Timestamp</th>
													<td className="monospace">
														2018-07-20 12:43:26
													</td>
												</tr>
												<tr>
													<th className="table-active properties-header">TX Count</th>
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
													<td className="monospace"><span>{prettySize(this.state.block.size)}</span></td>
												</tr>
												<tr>
													<th className="table-active properties-header">Weight</th>
													<td className="monospace">
														<span>{prettySize(this.state.block.weight)}</span>
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
													<td className="monospace word-wrap">
														{this.state.next}	
													</td>
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
													<td className="monospace word-wrap">{this.state.block.merkleroot}</td>
												</tr>
												<tr>
													<th className="table-active text-right">Chainwork</th>
													<td className="monospace word-wrap">
														26c8a741f73e965e39950bc<br />
														<span className="text-muted">
															<span>(~</span>
															<span>750.19</span>
															<span> x 10</span>
															<sup>24</sup>
															<span> hashes)</span>
														</span>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane" id="tab-raw" role="tabpanel">
							
						</div>
					</div>

				</section>
			</section>
		)
	}
}


export default BlockSingle;