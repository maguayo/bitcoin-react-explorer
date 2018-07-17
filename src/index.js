import React from 'react';
import { render } from 'react-dom';

// import componentns
import Home from './pages/containers/home';
import Blocks from './pages/containers/blocks';
import Status from './pages/containers/status';
import Mempool from './pages/containers/mempool';
import Single from './single';
// import react router
import { BrowserRouter, Route } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div className="sans-serif">
      <Route path="/view/:postId" component={Single} />
      <Route path="/contact" render={() => <h1>Contact Us</h1>} />
      
      <Route path="/mempool" component={Mempool} />
      <Route path="/status" component={Status} />
      <Route path="/blocks" component={Blocks} />
      <Route exact path="/" component={Home} />
    </div>
  </BrowserRouter>
);

render(<App />, document.getElementById('app'));