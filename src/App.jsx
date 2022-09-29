import logo from './logo.svg';
import styles from './App.scss';
import Shellbar from './Shellbar';

import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/Button";

import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { attachThemeLoaded } from "@ui5/webcomponents-base/dist/theming/ThemeLoaded.js";


attachThemeLoaded(async (themeName) => {
  // create the style tag for fundamentals if missing
  let style = document.getElementById("fd-params");
  if (!style) {
      style = document.createElement("style");
      style.id = "fd-params";
      document.head.appendChild(style);
  }

  let css = undefined;
	switch (themeName) {
		case "sap_horizon": css = (await import("fundamental-styles/dist/theming/sap_horizon.css")).default;
	}
  style.innerHTML = css;
});
setTheme("sap_horizon");

function App() {
  let newEditTitle, newEditDue;

  const shellBarTitle = "SolidJS ToDo Application";


  function addTodo() {
    alert(`Title: ${newEditTitle.value}; Due: ${newEditDue.value}`);
  }

  return (

    <section class="todo-wrapper">
      <Shellbar title={shellBarTitle} />
      <section class="todo">
          <div class="todo__create fd-layout-panel">
            <div class="todo__create-wrapper fd-layout-panel__body">
              <ui5-input id="add-input" placeholder="Type a task..." class="todo__task-name" />
              <ui5-date-picker id="date-picker" format-pattern="dd/MM/yyyy" />
              <ui5-button id="add-btn" on:click={addTodo} design="Emphasized">Add Todo</ui5-button>
            </div>
          </div>
      </section>
      <div class="fd-bar fd-bar--footer fd-bar--cozy">
            <div class="fd-bar__right">
                <div class="fd-bar__element">
                    <button aria-label="button" class="fd-button fd-button--emphasized">Complete All</button>
                </div>
                <div class="fd-bar__element">
                    <button aria-label="button" class="fd-button fd-button--transparent">Delete All</button>
                </div>
            </div>
      </div>
    </section>
  );
}

export default App;
