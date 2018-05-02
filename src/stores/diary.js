import { action, observable } from 'mobx';
import config from '../utils/config';
import request from '../utils/request';	

class Diary {
    @observable diaries;
    @observable state;
    @observable summary;

    @action
    async getSummary() {
        let { err, data } = await request('siteSummary');

        if (!err) {
            this.summary = data;
        }
    }

    @action 
    async get() {
        let {err, data} = await request('myDiaryList');

        if(!err){
            this.diaries = data;
        }else{
            if(data.status==401) {
                window.location=`${config.sso_endPoint}auth/authorize?app_id=${config.appid}&redirect_uri=${window.location.href}`;
            }else{
                alert(err);
            }
        }
    }

    @action 
    async post(data) {
        let { err } = await request('createDiary', { method: 'post', query: data });

        if(!err){
            this.get();
            return {};
        }else{
            return { err };
        }
    }
}

const diary = new Diary();
export default diary;