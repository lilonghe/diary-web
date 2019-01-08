import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.styl';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './common.styl';

if (process.env.NODE_ENV != 'development') {
    console.log = () => {};
    global.dev = false;
}

import sessionStore from './stores/session';
import diaryStore from './stores/diary';

ReactDOM.render(
    <Provider session={sessionStore} diary={diaryStore}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}