import React, { Component } from 'react';
import styles from './layout.styl';

class Header extends Component {
    render() {
        return (
            <header>
                <div className='copy'>
                    <a>Diary</a> | <span>lilonghe</span>
                </div>

                <div className={styles.userControl}>
                    <div>
                        <ul>
                            <li>List</li>
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