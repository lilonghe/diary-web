import React, { Component } from 'react'

class Dynamic extends Component {
  state = {
    mod: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    })

    props.load().then((mod)=>{
        this.setState({
            mod: mod.default ? mod.default : mod
        })
    });
  }

  render() {
    if(this.state.mod)
        return this.props.children(this.state.mod)
    else
        return (<div></div>)
  }
}

export default Dynamic;