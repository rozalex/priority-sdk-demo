import React from 'react';
import ReactDOM from 'react-dom';
import './misc/index.css';
import App from './priority/App';
import registerServiceWorker from './misc/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// constructor() {
// 	const priorityPromise = import('priority-web-sdk');

// 	priorityPromise.then(priority => {
// 		_priority = priority;
// 	});
// }
