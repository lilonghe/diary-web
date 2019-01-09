import React,{ Component } from 'react';
import styles from './list.styl';
import { inject, observer } from 'mobx-react';
import config from '../utils/config';

@inject('diary')
@observer
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
    }

    componentDidMount() {
        this.props.diary.get();
    }

    getStream = (url, cb) => {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function() {
            console.log(this.status);
            if (this.status == 200) {
                if(cb) cb(this.response);
            }
        };
        xhr.send();
    }

    loadStream = async (url) => {
        if (!url) return;

        let img = new Image();
        img.onload = (e) => {
            console.log(e);
        };
        img.src=url;
        console.log(img);
    }

    changeActiveIndex(vector) {
        const i = this.state.activeIndex + vector;
        if (i>this.props.diary.diaries.length) return;
        if (i<0) return;

        this.setState({
            activeIndex: i
        });
    }

    render() {
        let { diaries, mapDiaries } = this.props.diary;
        const { activeIndex } = this.state;

        const activeItem = diaries && diaries[activeIndex];
        return (
            <div>
                {!diaries && <div>加载中</div>}
                {activeItem && <div className={styles.activeItem}>
                    <div className={styles.itemHead}>
                        <div>
                            {activeItem.location && <span className={styles.tag} style={{ backgroundColor: '#fde3cf', color:'#f56a00' }}>{activeItem.location}</span>}
                            {activeItem.weather && <span className={styles.tag} style={{ backgroundColor: '#fdd8e7', color:'#f5317f' }}>{activeItem.weather}</span>}
                            {activeItem.mood && <span className={styles.tag} style={{ backgroundColor: '#cfefdf', color:'#00a854' }}>{activeItem.mood}</span>}
                        </div>
                        <div>
                            {activeItem.date}
                        </div>
                    </div>
                    <div className={styles.itemView}>
                        <div dangerouslySetInnerHTML={{__html: activeItem.generate_content}}></div>
                        <div></div>
                    </div>

                    <div className={styles.itemAction}>
                        {activeIndex != 0 && <div onClick={()=>this.changeActiveIndex(-1)} className={styles.prevBtn}>上一篇</div> }
                        {activeIndex<diaries.length && <div onClick={()=>this.changeActiveIndex(1)} className={styles.nextBtn}>下一篇</div> }
                    </div>

                </div>}

                {/*{diaries && <div>*/}
                    {/*<div className={styles.diarySummary}>*/}
                        {/*<span>自 {diaries[0].date} 起, 你共记下了 {diaries.length} 篇日记</span>                        */}
                    {/*</div>*/}
                    {/*{diaries.map((d,i) => {*/}
                        {/*return <div key={i} className={styles.diaryItem}>*/}
                            {/*<div className={styles.view} dangerouslySetInnerHTML={{__html: d.generate_content}}></div>*/}
                            {/*{ d.record && d.record != 'undefined' && <audio style={{marginTop: 10}} controls src={d.record}></audio>}*/}
                            {/*<div className={styles.meta}>*/}
                                {/*<span className={styles.time}>*/}
                                    {/*{mapDiaries && mapDiaries[d.date].length > 1 ? d.created_at : d.date }*/}
                                {/*</span><br />*/}
                                {/*{d.location && <span className={styles.tag} style={{ backgroundColor: '#fde3cf', color:'#f56a00' }}>{d.location}</span>}*/}
                                {/*{d.weather && <span className={styles.tag} style={{ backgroundColor: '#fdd8e7', color:'#f5317f' }}>{d.weather}</span>}*/}
                                {/*{d.mood && <span className={styles.tag} style={{ backgroundColor: '#cfefdf', color:'#00a854' }}>{d.mood}</span>}*/}
                            {/*</div>*/}
                        {/*</div>;*/}
                    {/*})}*/}
                {/*</div>}*/}
            </div>
        );
    }

}