import React, { Component } from 'react';
import Utils from './common/utils';
import {Layout, Menu, notification} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import store from './store/appStore';
import {Route, BrowserRouter as Router, Redirect, Link, withRouter} from 'react-router-dom';

import Park from './module/park/Park';
import Login from './module/user/Login';
import Reg from './module/user/Reg';
import DiaryList from './module/admin/diary/List';
// import CreateDiary from './module/admin/diary/Create';

import Dynamic from './common/Dynamic';

const lazyLoad = (func, props) => {
  console.log(props);
    return <Dynamic load={func}>
        {(Com) => (<Com {...props} />)}
    </Dynamic>
}

class App extends Component {

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      user: {}
    };
    let that = this;
    store.addLoginCallBack(function(){
      that.setState({
        user: JSON.parse(Utils.getItem('user'))
      });
    }.bind(this));
  }

  componentWillMount(){
    store.executeLogin();
    notification.config({
          placement: 'bottomRight',
          bottom: 50,
          duration: 3,
    });
  }

  logout(){
    store.logout();
    this.setState({
      user: {}
    })
  }

  render() {
    console.log(this.props);
    const CreateDiary = () => lazyLoad(() => import('./module/admin/diary/Create'),this.props);
      

      var status;
      if(this.state.user.name){
        status = (
          <Menu mode="horizontal">
            <SubMenu title={this.state.user.name}>
              <Menu.Item><Link to="/admin/diary">List</Link></Menu.Item>
              <Menu.Item><Link to="/admin/diary/create">Create</Link></Menu.Item>
              <Menu.Item><span  onClick={this.logout.bind(this)}>Logout</span></Menu.Item>
            </SubMenu>
          </Menu>
        )
      }else{
        status = (<ul className='no-login'>
          <li><Link to="/login">Login</Link></li>
        </ul>)
      }
      return (
            <Layout className='layout'>
              <header>
                <div className='copy'>
                  <Link to="/">Diary</Link>
                </div>
                {status}
              </header>
              <Content style={{ padding: '0 50px' }} className='content'>
                <Route path='/login' component={Login} />
                <Route path='/reg' component={Reg} />
                
                {
                  !this.state.user.name ? <Redirect to={'/login'} />:(
                    <div>
                    <Route exact path='/' component={Park} />                  
                    <Route path='/logout' component={Login} />
                    <Route exact path="/admin/diary" component={DiaryList} />
                    <Route path="/admin/diary/create" component={CreateDiary} />
                    </div>
                  )
                }
              </Content>
              <footer>Diary @2017</footer>
            </Layout>
            
          
    );
  }
}
export default withRouter(App);


