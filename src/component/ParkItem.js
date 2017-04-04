import React, {Component} from 'react';

import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import marked from 'marked';
class ParkItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            diary: this.props.value
        };
    }
    

    render(){
        var html = marked(this.state.diary.content);
        return (
            
            <div className="park-item">
                    <Card>
                            <CardText dangerouslySetInnerHTML={{__html: html}}></CardText>
                    </Card>
            </div>
        );
    }
}

export default ParkItem;