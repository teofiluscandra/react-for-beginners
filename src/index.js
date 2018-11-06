import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './css/style.css';
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';

const Root = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact component={StorePicker}/>
                <Route path="/store/:storeid" component={App}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
)


ReactDOM.render(<Root />, document.getElementById('main'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
