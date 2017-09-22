import React,{ Component } from 'react';
import asyncComponent from './utils/asyncComponent';

import { Route, Switch, Redirect } from 'react-router-dom';

const IndexPage = asyncComponent(() => import(/* webpackChunkName: "index_page" */'./pages/index'));
import Header from './components/layout/header';
import Footer from './components/layout/footer';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                
                <div className="wrapper">
                    <Route path="/" component={IndexPage} />
                </div>
            
                <Footer />
            </div>
        )
    }
}