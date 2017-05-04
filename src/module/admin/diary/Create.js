import React, {Component} from 'react';

import Editor from 'react-md-editor';

import ParkItem from '../../../component/ParkItem';
import Request from '../../../config/request';
import Chip from 'material-ui/Chip';
import marked from 'marked';
import RaisedButton from 'material-ui/RaisedButton';

import Snackbar from 'material-ui/Snackbar';

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
            this.setState({
                open: true,
                errmsg: err.errmsg
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
                        <Chip className="header-tip"> Create Diary </Chip>
                        <div className="editor-workspace">
                            <Editor value={this.state.code} onChange={this.updateCode.bind(this)} />
                            <div className="preview" dangerouslySetInnerHTML={{__html: html}}></div>
                        </div>
                        <RaisedButton style={{marginTop: '20px'}} onClick={this.commit.bind(this)} label="submit" primary={true} />

                </div>
                <Snackbar
                    className="errtip"
                    open={this.state.open}
                    message={this.state.errmsg}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

export default DiaryCreate;