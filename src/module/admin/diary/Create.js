import React, {Component} from 'react';

import Editor from 'react-md-editor';

import ParkItem from '../../../component/ParkItem';
import Request from '../../../config/request';
// import Chip from 'material-ui/Chip';
import marked from 'marked';
// import RaisedButton from 'material-ui/RaisedButton';

// import Snackbar from 'material-ui/Snackbar';
import {Button,notification} from 'antd';
class DiaryCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            code: '## Heloo!',
            open: false,
            errmsg: ''
        };
    }

    updateCode(newCode) {
		this.setState({
			code: newCode
		});
	}

    commit(){
        Request.postDiary({
            content: this.state.code
        },(err) => {
            console.log(err);
            notification['error']({
                message: '提交失败',
                description: err.errmsg,
            });
        },() => {
            let path = '/admin/diary';
            this.props.history.push(path);
        });
    }

    render(){
        var html = marked(this.state.code);
        return (
            <div className="page-park">
                <div className="wrapper">
                        <div className="header-tip"> Create Diary </div>
                        <div className="editor-workspace">
                            <Editor value={this.state.code} onChange={this.updateCode.bind(this)} />
                            <div className="preview" dangerouslySetInnerHTML={{__html: html}}></div>
                        </div>
                        <Button style={{marginTop: '20px'}} onClick={this.commit.bind(this)}>Submit</Button>

                </div>
                {/*<Snackbar
                    className="errtip"
                    open={this.state.open}
                    message={this.state.errmsg}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />*/}
            </div>
        );
    }
}

export default DiaryCreate;