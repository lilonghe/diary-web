import React, {Component} from 'react';

import ParkItem from '../../component/ParkItem';
import 'whatwg-fetch';

class Park extends Component {
    constructor(props){
        super(props);
        this.state = {
            diaries: []
        };
        let that = this;
        fetch('http://127.0.0.1:8360/api/diary?token=ee1a298dc99c466be0f4c963152e6a78',{
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                that.setState({diaries: data.data})
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
                        {diaries}
                </div>
            </div>
        );
    }
}

export default Park;