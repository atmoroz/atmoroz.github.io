import React from 'react';
import './header.css';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="layout">
                    <img className="logo" src="image/logo.svg" />
                </div>
            </header>
        );
    }
}

export default Header;