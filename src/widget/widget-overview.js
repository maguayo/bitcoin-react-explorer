import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import './widget-overview.css'

class WidgetOverview extends Component{
	render (){
		let widgetStyle = {
		  backgroundImage: 'url(' + this.props.icon + ')',
		};
		let widgetInnerStyle = {
		  backgroundColor: this.props.bg,
		  color: this.props.color
		};
		let this_className = '';
		if(this.props.className){
			this_className = this.props.className;
		}
		return (
			<Col xs={this.props.size_xs} md={this.props.size_md} className={this_className + " WidgetOverview"} style={widgetStyle}>
				<div className="center-inner">
					<div className="inner" style={widgetInnerStyle}>
						<span>{this.props.number}</span>
						<p>{this.props.title}</p>
					</div>
				</div>
			</Col>
		)
	}
}

export default WidgetOverview;