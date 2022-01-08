import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import './header.css'
function Header() {
    return (
        <div className='header'>
            <Navbar bg="info" fixed="top" expand="xl" collapseOnSelect>
                <div className='leftLogo'>
                    <img src="https://pbs.twimg.com/profile_images/831015989995257856/NlRTgXrr_400x400.jpg" alt=" " />
                </div>
                <div className='leftLogo2'>
                    <img src='https://cdn2.steamgriddb.com/file/sgdb-cdn/logo/b8043b9b976639acb17b035ab8963f18.png' alt=" " />
                </div>
                <div className='header_right' >
                    <Navbar.Toggle />
                    <Navbar.Collapse className ="right-aligned">
                        <Nav className='navmenu'>
                            <Nav.Link href="Home">Home</Nav.Link>
                            <Nav.Link href="aboutGame">Rules</Nav.Link>
                            <NavDropdown title="Our Team">
                                <NavDropdown.Item>Manas Miglani</NavDropdown.Item>
                                <NavDropdown.Item>Shivam  Tiwari</NavDropdown.Item>
                                <NavDropdown.Item>Roshan Rane</NavDropdown.Item>
                                <NavDropdown.Item>Mayur Pimpale</NavDropdown.Item>
                                <NavDropdown.Item>Vinit Sawant</NavDropdown.Item>
                                <NavDropdown.Item>Kaushal Parmar</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="Quit">Quit</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    )
}

export default Header
