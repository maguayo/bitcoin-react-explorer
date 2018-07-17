import React from 'react';
import { render } from 'react-dom';
import BlockList from '../blocklist/blocklist';
import data from '../api.json';
import Home from '../pages/containers/home'

const app = document.getElementById('app');

render(<Home />, app);