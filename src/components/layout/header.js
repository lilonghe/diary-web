import React, { Component } from 'react';
import styles from './layout.styl';
import { Link, NavLink } from 'react-router-dom'; 
import { inject, observer } from 'mobx-react';

@inject('session')
@observer
class Header extends Component {

    checkActionLink = (match, location) => {
        if (!match) {
            return false
        }
        return match.path = location.pathname ? true : false;
    }
    
    render() {
        console.log(this.props);
        return (
            <header>
                <div className='copy'>
                    <Link exact to='/'>Diary</Link> | <span>{this.props.session.user && this.props.session.user.nickname}</span>
                </div>

                { this.props.session.user && <div className={styles.userControl}>
                    <div>
                        <ul>
                            <NavLink exact to="/list" activeClassName="active"><li>List</li></NavLink>
                            <NavLink exact to="/create" activeClassName="active"><li>Create</li></NavLink>
                             <a onClick={() => this.props.session.logout()}><li>Logout</li></a>
                        </ul>
                    </div>
                </div> }
            </header>
        )
    }
}

export default Header;