import React, {Component} from 'react';

import ParkItem from '../../component/ParkItem';
import Request from '../../config/request';
// import Chip from 'material-ui/Chip';
// import {Tag} from 'antd';
class Park extends Component {
    constructor(props){
        super(props);
        this.state = {
            diaries: []
        };
        let that = this;
        Request.diaryList(null, (err) => { }, (data) => {
            that.setState({diaries:data.data.data})
        });
    }

    render(){
        var diaries = this.state.diaries.map((diary) => {
            return (
                <ParkItem key={diary.create_time+Math.random()} value={diary} />
            )
        });

        if(this.state.diaries.length < 1){
            diaries = (
                <div>还木有啦～</div>
            )
        }

        return (
            <div className="page page-park">
                <div className="wrapper">
                     <div className="header-tip"> Park </div>
                        {diaries}
                </div>
            </div>
        );
    }
}

export default Park;