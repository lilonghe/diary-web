import React, {Component} from 'react';

import ParkItem from '../../../component/ParkItem';
import Request from '../../../config/request';
import Chip from 'material-ui/Chip';

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
        let diaries = this.state.diaries.map((diary) => {
            return (
                <ParkItem key={diary.create_time+Math.random()} value={diary} />
            )
        });
        let no_one = '';
        if(!this.state.diaries.length>0) {
            diaries = (
                <div>no one.</div>
            )
        }
        
        return (
            <div className="page-park">
                <div className="wrapper">
                    <Chip className="header-tip"> My Diary </Chip>
                    {diaries}  
                </div>
            </div>
        );
    }
}

export default DiaryList;