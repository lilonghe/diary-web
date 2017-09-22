import React, { Component } from 'react';
import styles from './layout.styl';
import { Link, NavLink } from 'react-router-dom'; 

class Header extends Component {
    render() {
        return (
            <header>
                <div className='copy'>
                    <Link to='/'>Diary</Link> | <span>lilonghe</span>
                </div>

                <div className={styles.userControl}>
                    <div>
                        <ul>
                            <NavLink to="/list" activeClassName="active"><li>List</li></NavLink>
                            <li>Create</li>
                            <li>Logout</li>                            
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;