import React, {Component} from 'react';

import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';

class ParkItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            diary: this.props.value
        };
    }
    

    render(){
        return (
            
            <div className="park-item">
                    <Card>
                        <CardHeader
                        title={this.state.diary.user.name} subtitle={this.state.diary.date.substr(0,10)} />
                            <CardText>{this.state.diary.content}</CardText>
                    </Card>
            </div>
        );
    }
}

export default ParkItem;