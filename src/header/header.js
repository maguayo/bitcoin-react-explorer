import React, { Component } from 'react';
import { Navbar, NavDropdown, Nav, MenuItem, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './header.css';

class Header extends Component{
	render (){
		return (
			<Navbar className="main-header">
			  <Navbar.Header>
			    <Navbar.Brand>
			    	<Link to='/'><img src={logo} className="logo" /> Bitcoin Explorer</Link>
			    </Navbar.Brand>
			  </Navbar.Header>
			  <ul className="nav navbar-nav">
			    <li><Link to='/blocks'>Blocks</Link></li>
			    <li><Link to='/mempool'>Mempool</Link></li>
			    <li><Link to='/status'>Node status</Link></li>
			    <li className="hide"><Link to='/stats'>Stats</Link></li>
			  </ul>
			</Navbar>
		)
	}
}

export default Header;