/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';

import TodoApp from './TodoApp';
render(() => <TodoApp />, document.getElementById('root'));
