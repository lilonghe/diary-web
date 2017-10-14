import React,{ Component } from 'react';
import styles from "./create.styl";
import { inject, observer } from 'mobx-react';
import marked from 'marked';

@inject('diary')
@observer
export default class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: '## Hello',
            mood: '',
            weather: '',
            location: ''
        };
        this.openid = window.diary_openid;
    }

    clearTemp = () => {
        localStorage.removeItem(this.openid+'_diary');
    }

    componentWillMount(){
        let cacheDiary = localStorage.getItem(this.openid+'_diary');
        if(cacheDiary){
            try {
                cacheDiary = JSON.parse(cacheDiary);
                let resu = confirm('检测到有未提交的 diary\n点击确定恢复 点击取消清除');
                if(resu){
                    this.setState(cacheDiary);
                } else {
                    this.clearTemp();
                }
            } catch (e) {
                this.clearTemp();
            }
        }
    }

    updateCode = (newCode) => {
        this.setState({
            code: newCode
        });
        localStorage.setItem(this.openid+'_diary',JSON.stringify(this.state));
    }

     commit = async () => {
        let { err } = await this.props.diary.post({
            content: this.state.code,
            weather: this.state.weather,
            mood: this.state.mood,
            location: this.state.location
        });
        if(err) {
            alert(err);
        }else{
            this.clearTemp();
            this.props.history.push('/list');
        }
    }

    render() {
        var html = marked(this.state.code);
        return (
            <div className="page-park">
                <div className="wrapper">
                        <div className={styles.workspace}>
                            <div className={styles.editorWorkspace}>
                                <textarea onChange={(e) => this.updateCode(e.target.value)}>{this.state.code}</textarea>
                                <div className={styles.preview+" marked-view"} dangerouslySetInnerHTML={{__html: html}}></div>
                            </div>
                            <div className={styles.tags}>
                                <input type="text" placeholder='心情' list='mood_list' maxLength='100' onChange={ (event) => this.setState({mood: event.target.value})}/>
                                <input type="text" placeholder='天气' list='weather_list' maxLength='100' onChange={ (event) => this.setState({weather: event.target.value})}/>
                                <input type="textarea" placeholder='地点' maxLength='100' onChange={ (event) => this.setState({location: event.target.value})}/>

                                <datalist id='mood_list'>
                                    <option value="甜蜜"></option>
                                    <option value="愉快"></option>
                                    <option value="开心"></option>
                                    <option value="无感"></option>
                                    <option value="孤独"></option>
                                    <option value="寂寞空虚"></option>
                                </datalist>

                                <datalist id='weather_list'>
                                    <option value="晴天"></option>
                                    <option value="多云"></option>
                                    <option value="小雨"></option>
                                    <option value="高温"></option>
                                </datalist>
                            </div>
                        </div>
                        <p>注：每天可以提交一次，提交后不可修改</p>
                        <button className={styles.submitBtn} onClick={this.commit}>Submit</button>
                </div>
            </div>
        )
    }

}