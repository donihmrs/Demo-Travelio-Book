import React from "react";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true };
    }

    handleToggleMenu() {
        this.setState({ active: !this.state.active });
    }

    render() {
        return (
            <nav className={"navbar"} role="navigation" aria-label="main navigation">
                <div className={"navbar-brand"}>
                    <a className={"navbar-item"} href="/">
                        <img alt="logo-bulma" src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </a>
    
                    {/* eslint-disable-next-line */}
                    <a onClick={() => this.handleToggleMenu()} role="button" className={"navbar-burger" + (this.state.active ? "" : " is-active")} aria-label="menu" aria-expanded="false" data-target="navbarBasic">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
    
                <div id="navbarBasic" className={"navbar-menu" + (this.state.active ? "" : " is-active")}>
                    <div className={"navbar-start"}>
                        <a href="/" className={"navbar-item"}>
                            Home
                        </a>
    
                        <a href="/wishlist" className={"navbar-item"}>
                            Wishlist
                        </a>
                    </div>
                </div>
            </nav>
        )
    }
}


export default Header;