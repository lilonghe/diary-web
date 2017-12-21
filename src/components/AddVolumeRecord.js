import React,{ Component } from 'react';

export default class AddVolumeRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordTime: 0,
            maxRecordTime: 60,
            recordSize : 0
        };
        this.startTime = 0;
    }
    startRecord = () => {
        this.recordStream = null, this.media = null;
        window.countRecord && window.clearInterval(window.countRecord);

        this.media = navigator.mediaDevices.getUserMedia({audio: true});
        this.media.then((stream) => {
            this.executeStream(stream);
        })
            .catch(function(err) {
                console.log(err);
            });
    }

    executeStream = (stream) => {
        this.recordStream = new MediaRecorder(stream);
        this.stream = [];
        this.recordStream.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                this.stream.push(event.data);
            }
        };
        this.recordStream.onstop = () => {
            window.clearInterval(window.countRecord);
            var video = document.querySelector('audio');
            var superBuffer = new Blob(this.stream, {type: 'audio/mp3'});
            // this.props.setRecord(this.stream);
            this.props.setRecord(superBuffer);
            video.src = window.URL.createObjectURL(superBuffer);
            this.setState({
                recordSize: superBuffer.size
            });
        };
        this.recordStream.start();
        this.startTime = new Date().getTime();
        window.countRecord = setInterval(() => {
            if((this.state.recordTime - this.startTime) * 1.0 / 1000 >= 60) {
                this.stopRecord();
            }
            this.setState({
                recordTime: new Date().getTime()
            });
        }, 100);
    }

    stopRecord = () => {
        if(this.recordStream && this.recordStream.state != 'inactive') {
            this.recordStream.stop();
        }
    }

    deleteRecord = () => {
        this.recordStream = null;
        this.setState({
            recordTime: this.startTime,
            recordSize: 0
        });
        this.props.setRecord();
        document.querySelector('audio').src = '';
    }

    // download = () => {
    //     var blob = new Blob(this.stream, {type: 'audio/ogg'});
    //     var url = window.URL.createObjectURL(blob);
    //     var a = document.createElement('a');
    //     a.style.display = 'none';
    //     a.href = url;
    //     a.download = new Date().getTime() + '.ogg';
    //     document.body.appendChild(a);
    //     a.click();
    //     setTimeout(function() {
    //         document.body.removeChild(a);
    //         window.URL.revokeObjectURL(url);
    //     }, 100);
    // }

    render() {
        return (
            <div style={{border:'1px dashed #CCC', padding: 20}}>
                <audio controls></audio><br/>
                <button onClick={this.startRecord} className="button">开始</button>&nbsp;
                <button onClick={this.stopRecord} className="button">结束</button>&nbsp;
                { this.state.recordSize > 0 && <button onClick={this.deleteRecord} className="button">删除</button> }
                <span style={{display: 'inline-block', width:100, textAlign: 'center'}}>{ ((this.state.recordTime - this.startTime) * 1.0 / 1000).toFixed(1)  }s</span>
                { this.state.recordSize > 0 && <span style={{display: 'inline-block', width:100, textAlign: 'center'}}>{ (this.state.recordSize * 1.0 / 1024).toFixed(1)  }kb</span> }                
            </div>
        );
    }
}