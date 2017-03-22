import React, {Component} from 'react';

import ParkItem from '../../component/ParkItem';
import Request from '../../config/request';
import Chip from 'material-ui/Chip';
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
        const diaries = this.state.diaries.map((diary) => {
            return (
                <ParkItem key={diary.id} value={diary} />
            )
        });

        return (
            <div className="page-park">
                <div className="wrapper">
                     <Chip className="header-tip"> Park </Chip>
                        {diaries}
                </div>
            </div>
        );
    }
}

export default Park;