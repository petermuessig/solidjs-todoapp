/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import "fundamental-styles/dist/button.css";
import "fundamental-styles/dist/bar.css";
import "fundamental-styles/dist/layout-panel.css";
import "fundamental-styles/dist/shellbar.css";
import "fundamental-styles/dist/avatar.css";
import App from './App';

render(() => <App />, document.getElementById('root'));
