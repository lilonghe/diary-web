import React, {Component} from 'react';

import Editor from 'react-md-editor';
import ParkItem from '../../../component/ParkItem';
import Request from '../../../config/request';
import marked from 'marked';
import {Button,notification} from 'antd';


// const Editor = () => LazyComponent(() => import('react-md-editor'),this.props);

class DiaryCreate extends Component {
    constructor(props){
        super(props);
        console.log(props);
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
        var GetEditor = () => {
            // import('react-md-editor').then( Component => {
            //     Editor = Component;
            // });

            console.log(promise);
            promise.then((mod) => {
                return (<Editor value={this.state.code} onChange={this.updateCode.bind(this)} />)
            }).then( (res) => {
                console.log(res);
            });
        }
        return (
            <div className="page-park">
                <div className="wrapper">
                        <div className="header-tip"> Create Diary </div>
                        <div className="editor-workspace">
                            {/*<Editor />*/}
                            <Editor value={this.state.code} onChange={this.updateCode.bind(this)} />
                            <div className="preview" dangerouslySetInnerHTML={{__html: html}}></div>
                        </div>
                        <Button style={{marginTop: '20px'}} onClick={this.commit.bind(this)}>Submit</Button>

                </div>
            </div>
        );
    }
}

export default DiaryCreate;