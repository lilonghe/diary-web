import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.styl';
import { Provider } from 'mobx-react';

import sessionStore from './stores/session';
import diaryStore from './stores/diary';

ReactDOM.render(
  <Provider session={sessionStore} diary={diaryStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
   module.hot.accept();
}