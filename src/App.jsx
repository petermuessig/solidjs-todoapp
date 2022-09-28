import logo from './logo.svg';
import styles from './App.module.css';

import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/Button";

function App() {
  let newEditTitle, newEditDue;

  function addTodo() {
    alert(`Title: ${newEditTitle.value}; Due: ${newEditDue.value}`);
  }

  return (
    <section>
      <ui5-input ref={newEditTitle} placeholder="Type a task..." />
      <ui5-date-picker ref={newEditDue} format-pattern="dd/MM/yyyy" />
      <ui5-button on:click={addTodo} design="Emphasized">Add Todo</ui5-button>
    </section>
  );
}

export default App;
