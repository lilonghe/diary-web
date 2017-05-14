import React, {Component} from 'react';

import ParkItem from '../../../component/ParkItem';
import Request from '../../../config/request';
// import Chip from 'material-ui/Chip';

class DiaryList extends Component {
    constructor(props){
        super(props);
        this.state = {
            diaries: []
        };
        let that = this;
        Request.userDiaryList(null, (err) => { }, (data) => {
            that.setState({diaries:data.data.data})
        });
    }

    render(){
        var diaries = this.state.diaries.map((diary) => {
            return (
                <ParkItem key={diary.create_time+Math.random()} value={diary} />
            )
        });
        if(!this.state.diaries.length>0) {
            diaries = (
                <div>还木有呀～</div>
            )
        }
        
        return (
            <div className="page-park">
                <div className="wrapper">
                    <div className="header-tip"> My Diary </div>
                    {diaries}  
                </div>
            </div>
        );
    }
}

export default DiaryList;