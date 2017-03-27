import React, {Component} from 'react';

import Editor from 'react-md-editor';

import ParkItem from '../../../component/ParkItem';
import Request from '../../../config/request';
import Chip from 'material-ui/Chip';

class DiaryCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            code: '## Heloo!'
        };
    }

    updateCode(newCode) {
		this.setState({
			code: newCode
		});
	}

    render(){
        return (
            <div className="page-park">
                <div className="wrapper">
                        <Chip className="header-tip"> Create Diary </Chip>
                        <Editor value={this.state.code} onChange={this.updateCode} />
                </div>
            </div>
        );
    }
}

export default DiaryCreate;