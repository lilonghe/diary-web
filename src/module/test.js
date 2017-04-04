import React, {Component} from 'react';
import Editor from 'react-md-editor';
import marked from 'marked';
import './test.css';
class Test extends Component {
    constructor(prop){
        super(prop);
        this.state = {
            code : '# Markdown'
        };
    }

    updateCode(newCode) {
		this.setState({
			code: newCode
		});
	}

    render(){
        var html = marked(this.state.code);
        return(
            <view className="editor-workspace">
                <Editor value={this.state.code} onChange={this.updateCode.bind(this)} />
                <div className="preview" dangerouslySetInnerHTML={{__html: html}}></div>
            </view>
        )
    }
}

export default Test;