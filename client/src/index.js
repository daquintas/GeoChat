import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import CommentBox from './CommentBox';

ReactDOM.render(
  <React.StrictMode>
    <CommentBox />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
