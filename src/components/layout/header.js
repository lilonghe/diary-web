import React, { Component } from 'react';
import styles from './layout.styl';
import { Link, NavLink } from 'react-router-dom'; 
import { inject, observer } from 'mobx-react';

@inject('session')
@observer
class Header extends Component {

    checkActionLink = (match, location) => {
        if (!match) {
            return false;
        }
        return match.path = location.pathname ? true : false;
    }
    
    render() {
        const { session: { user } } = this.props;
        return (
            <header>
                <div className='copy'>
                    <Link exact to='/'>Diary</Link> {user && '|'} <span>{user && user.nickname}</span>
                </div>

                { user && <div className={styles.userControl}>
                    <div>
                        <ul>
                            <NavLink exact to="/list" activeClassName="active"><li>我的日记</li></NavLink>
                            <NavLink exact to="/create" activeClassName="active"><li>添加日记</li></NavLink>
                            <a onClick={() => this.props.session.logout()}><li>退出</li></a>
                        </ul>
                    </div>
                </div> }
            </header>
        );
    }
}

export default Header;