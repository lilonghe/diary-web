import { action, observable } from 'mobx';
import config from '../utils/config';
import request from '../utils/request';	

class Diary {
    @observable diaries;
    @observable state;
    @observable summary;
    @observable mapDiaries;
    @observable motto;

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
            
            let mapDiaries = {};
            data.map(item => {
                if (!mapDiaries[item.date]) {
                    mapDiaries[item.date] = [];
                }
                mapDiaries[item.date].push(item);
            });
            this.mapDiaries = mapDiaries;
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

    @action
    async getMotto() {
        let { err, data } = await request('diary/motto');
        if (!err) {
            this.motto = data;
        }
    }
}

const diary = new Diary();
export default diary;