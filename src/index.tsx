import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

const rootElement: HTMLElement = document.getElementById(
  'app-root',
) as HTMLElement;

ReactDOM.render(<App />, rootElement);
