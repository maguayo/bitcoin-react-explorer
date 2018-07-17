import React, { Component } from 'react';
import { Navbar, NavDropdown, Nav, MenuItem, NavItem } from 'react-bootstrap';
import logo from '../../images/logo.svg'
import './header.css'

class Header extends Component{
	render (){
		return (
			<Navbar className="main-header">
			  <Navbar.Header>
			    <Navbar.Brand><a href="#home"><img src={logo} className="logo" /> Bitcoin Explorer</a></Navbar.Brand>
			  </Navbar.Header>
			  <Nav>
			    <NavItem eventKey={1} href="#">Blocks</NavItem>
			    <NavItem eventKey={2} href="#">Mempool</NavItem>
			    <NavItem eventKey={3} href="#">Node status</NavItem>
			    <NavDropdown eventKey={4} title="Stats" id="basic-nav-dropdown">
			      <MenuItem eventKey={4.1}>Txs</MenuItem>
			      <MenuItem eventKey={4.2}>Price</MenuItem>
			      <MenuItem eventKey={4.3}>Segwit</MenuItem>
			      <MenuItem eventKey={4.4}>LN</MenuItem>
			    </NavDropdown>
			  </Nav>
			</Navbar>
		)
	}
}

export default Header;