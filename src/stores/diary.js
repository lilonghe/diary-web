import { action, observable } from 'mobx';
import config from '../utils/config';
import request from '../utils/request';	

class Diary {
    @observable diaries;
    @observable state;
    @observable summary;

    @action
    async getSummary() {
        let { err, data } = await request('diary/summary');

        if (!err) {
            this.summary = data;
        }
    }

    @action 
    async get() {
        let { err, data } = await request('diary/list');

        if(!err){
            this.diaries = data;
        }
    }

    @action 
    async post(data) {
        let { err } = await request('diary/add', { method: 'post', query: data });

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