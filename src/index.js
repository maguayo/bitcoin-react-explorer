import React from 'react';
import { render } from 'react-dom';

// import componentns
import Home from './pages/containers/home';
import Blocks from './pages/containers/blocks';
import Status from './pages/containers/status';
import Mempool from './pages/containers/mempool';
import BlockSingle from './pages/containers/block-single';

// import react router
import { BrowserRouter, Route } from 'react-router-dom'

import './index.css'

const App = () => (
  <BrowserRouter>
    <div className="sans-serif">
      <Route exact path="/" component={Home} />
      <Route path="/mempool" component={Mempool} />
      <Route path="/status" component={Status} />
      <Route exact path="/blocks" component={Blocks} />
      <Route path="/blocks/:blockHash" component={BlockSingle}  />
    </div>
  </BrowserRouter>
);

render(<App />, document.getElementById('app'));