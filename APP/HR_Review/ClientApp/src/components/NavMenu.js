import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import authService from './api-authorization/AuthorizeService';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      isAuthenticated: false,
      role: null
    };
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.poplulateState());
    this.poplulateState();
  }

  async poplulateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated,
      role: user && user.role
    });
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const role = this.state.role;
    console.log(role);
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">HR_Review</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                {role && role.includes("Admin") ?
                  <>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/fetch-performances">Performances</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/fetch-users">Users</NavLink>
                    </NavItem>
                  </>
                  : null}

                {role && role.includes("User") ?
                  <span>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/review-user">Review</NavLink>
                    </NavItem>
                  </span>
                  : null
                }
                <NavItem>
                </NavItem>

                <LoginMenu>
                </LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
