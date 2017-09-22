import React,{ Component } from 'react';
import asyncComponent from './utils/asyncComponent';

import { Route, Switch, Redirect } from 'react-router-dom';

const IndexPage = asyncComponent(() => import(/* webpackChunkName: "index_page" */'./pages/index'));
const ListPage = asyncComponent(() => import(/* webpackChunkName: "list_page" */'./pages/list'));

import Header from './components/layout/header';
import Footer from './components/layout/footer';

export default class App extends Component {
    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)    // path/to/abc
    }

    render() {
        return (
            <div className="container">
                <Header />
                
                <div className="wrapper">
                    <Switch>
                        <Route exact title="Diary" path="/" component={IndexPage} />
                        <Route title="List" path="/list" component={ListPage} />
                    </Switch>
                </div>
            
                <Footer />
            </div>
        )
    }
}