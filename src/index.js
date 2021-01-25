import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
  // Redux Store
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers';
import Main from './Main'

const store = createStore(reducers)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Main/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
