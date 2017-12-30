import React,{ Component } from 'react';
import styles from './create.styl';
import { inject, observer } from 'mobx-react';
import marked from 'marked';
import AddVolumeRecord from '../components/AddVolumeRecord';

@inject('diary')
@observer
export default class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: '',
            mood: '',
            weather: '',
            location: '',
            showRecord: false,
            mode: 'normal'
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
         if(this.state.code=='') {
             if (!confirm('没有输入内容哦! 确认要提交吗？')) return;
         }
         let { err } = await this.props.diary.post({
             content: this.state.code,
             weather: this.state.weather,
             mood: this.state.mood,
             location: this.state.location,
             record: this.state.showRecord ? this.recordData : ''
         });
         if(err) {
             alert(err);
         }else{
             this.clearTemp();
             this.props.history.push('/list');
         }
     }

    toggleRecord = () => {
        this.setState({
            showRecord: !this.state.showRecord
        });
    }

    setRecord = (record) => {
        console.log(record);
        this.recordData = record;
    }

    render() {
        var html = marked(this.state.code);
        return (
            <div className="page-park">
                <div className="edit-wrapper">
                    <p>请使用 Markdown 语法书写</p>
                    <div className={styles.workspace}>
                       
                        <div className={styles.editorWorkspace} style={{ height: window.innerHeight / 2 }}>
                            {!this.state.previewMode && <textarea placeholder="## Hope you have a good day" onChange={(e) => this.updateCode(e.target.value)}>{this.state.code}</textarea>}
                            <div className={styles.preview+' marked-view'} dangerouslySetInnerHTML={{__html: html}}></div>
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
                            <button onClick={this.toggleRecord} className="button">{this.state.showRecord ? '移除声音' : '添加声音'}</button>
                        </div>
                    </div>
                    <p>互联网时代，请注意保护个人隐私</p>
                        
                    {this.state.showRecord && <div style={{marginTop: 10}}><AddVolumeRecord setRecord={this.setRecord} /></div> }
                    <button className={styles.submitBtn} onClick={this.commit}>提交</button>
                </div>
            </div>
        );
    }

}