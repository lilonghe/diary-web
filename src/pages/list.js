import React,{ Component } from 'react';
import styles from "./list.styl";
import { inject, observer } from 'mobx-react';
import config from '../utils/config';
import request from '../utils/request';

@inject('diary')
@observer
export default class List extends Component {
    constructor(props) {
        super(props);
        this.props.diary.get();
    }

    getStream = (url, cb) => {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.responseType = "blob";
        xhr.onload = function() {
            console.log(this.status)
            if (this.status == 200) {
                if(cb) cb(this.response);
            }
        };
        xhr.send();
    }

    loadStream = async (url,cb) => {
        if (!url) return;

        let img = new Image();
        img.onload = (e) => {
            console.log(e);
        }
        img.src=url;
        console.log(img)
        
        // this.getStream( url , function(stream){
        //     console.log(stream)
        //     let buffer = new Blob(stream, {type: 'audio/ogg'})
        //     console.log(buffer)
        //     cb(window.URL.createObjectURL(buffer))
        // });
    }

    render() {
        let { diaries } = this.props.diary;
        let host = config.sso_endPoint.substr(0, config.sso_endPoint.length-1);
        let obj = {};
        return (
            <div>
                {!diaries && <div>加载中</div>}
                {diaries && diaries.map(d => {
                    return <div className={styles.diaryItem}>
                        <div className={styles.view} dangerouslySetInnerHTML={{__html: d.generate_content}}></div>
                        { d.record && <audio style={{marginTop: 10}} controls src={host + d.record}></audio>}
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