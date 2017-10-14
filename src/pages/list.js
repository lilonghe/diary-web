import React,{ Component } from 'react';
import styles from "./list.styl";
import { inject, observer } from 'mobx-react';

@inject('diary')
@observer
export default class List extends Component {
    constructor(props) {
        super(props);
        this.props.diary.get();
    }

    render() {
        let { diaries } = this.props.diary;
        return (
            <div>
                {!diaries && <div>加载中</div>}
                {diaries && diaries.map(d => {
                    return <div className={styles.diaryItem}>
                        <div className="marked-view" dangerouslySetInnerHTML={{__html: d.generate_content}}></div>
                        <div className={styles.meta}>
                            <span className={styles.time}>{d.date}</span><br/>
                            <span className={styles.tag} style={{ backgroundColor: '#fde3cf', color:'#f56a00' }}>{d.location}</span>
                            <span className={styles.tag} style={{ backgroundColor: '#fdd8e7', color:'#f5317f' }}>{d.weather}</span>
                            <span className={styles.tag} style={{ backgroundColor: '#cfefdf', color:'#00a854' }}>{d.mood}</span>
                        </div>
                    </div>
                })}
            </div>
        )
    }

}