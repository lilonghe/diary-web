import React,{ Component } from 'react';
import styles from "./index.styl";

export default class List extends Component {
    render() {
        return (
            <div>
                Hope you have fun.
                <p className={styles.title}>This is list page.</p>
            </div>
        )
    }

}