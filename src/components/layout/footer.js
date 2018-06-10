import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styles from './layout.styl';

@inject('diary')
@observer
class Footer extends Component {

    componentWillMount() {
        this.props.diary.getSummary();
    }

    render() {
        const { diary: {summary} } = this.props;
        return (
            <footer>
                
                {summary && summary.count && <div className={styles.summary}>
                    共 {summary.count.user} 个账号记录了 {summary.count.diary} 篇日记
                </div>}
                <br/>
                Diary @2018
            </footer>
        );
    }
}

export default Footer;