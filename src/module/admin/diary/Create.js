import React, {Component} from 'react';

import ParkItem from '../../../component/ParkItem';
import Request from '../../../config/request';
import Chip from 'material-ui/Chip';

class DiaryCreate extends Component {
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
        return (
            <div className="page-park">
                <div className="wrapper">
                        <Chip className="header-tip"> Create Diary </Chip>
                </div>
            </div>
        );
    }
}

export default DiaryCreate;