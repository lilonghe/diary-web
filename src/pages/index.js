import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';
import styles from './index.styl';

@inject('diary')
@observer
export default class Test extends Component {
    componentWillMount() {
        this.props.diary.getMotto();
    }

    render() {
        const { diary: { motto } } = this.props;
        return (
            <div style={{lineHeight: 1.5}}>
                <div style={{display:'none'}}>
                    生活，追求，畅想，每时每刻都有很多事情发生<br />
                    我们可以做点什么呢？<br /><br />


                    希望你能找到生活的意义， 也希望你能享受生活。
                </div>

                { motto && <div className={styles.mottoWrapper}>
                    <p className={styles.mottoContent}>{motto.hitokoto}</p>
                    <p className={styles.mottoFrom}>- {motto.from} @{motto.creator}</p> 
                    <p className={styles.mottoFrom}>- hitokoto.cn</p>
                </div>  }               
            </div>
        );
    }

}