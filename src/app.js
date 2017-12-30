import React, { Component } from 'react';
import asyncComponent from './utils/asyncComponent';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/layout/header';
import Footer from './components/layout/footer';

const IndexPage = asyncComponent(() => import(/* webpackChunkName: "index_page" */'./pages/index'));
const ListPage = asyncComponent(() => import(/* webpackChunkName: "list_page" */'./pages/list'));
const CreatePage = asyncComponent(() => import(/* webpackChunkName: "create_page" */'./pages/create'));

@inject('session')
@observer
export default class App extends Component {
    constructor(props) {
        super(props);
        this.props.session.getUser();
    }

    render() {
        let { session: { user } } = this.props;
        return (
            <div className="container">
                <Header location={this.props.location} />

                <div className="wrapper" style={{ minHeight:window.innerHeight - 200 }}>
                    {user ? <div>
                        <Switch>
                            <Route exact title="日记" path="/" component={IndexPage} />
                            <Route title="我的日记" path="/list" component={ListPage} />
                            <Route title="添加日记" path="/create" component={CreatePage} />
                        </Switch>
                    </div> : <div>加载中</div>}
                </div>

                <Footer />
            </div>
        );
    }
}