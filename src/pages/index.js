import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('diary')
@observer
export default class Test extends Component {
    componentWillMount() {
        this.props.diary.getSummary();
    }

    render() {
        const { diary: { summary } } = this.props;
        return (
            <div style={{lineHeight: 1.5}}>
                {summary && summary.count && <div style={{marginBottom: 5}}>
                    <small>{summary.count.user} 位用户记录了 {summary.count.diary} 篇日记</small>
                </div>}

                生活，追求，畅想，每时每刻都有很多事情发生<br/>
                我们可以做点什么呢？<br/><br/>


                希望你能找到生活的意义， 也希望你能享受生活。
            </div>
        );
    }

}