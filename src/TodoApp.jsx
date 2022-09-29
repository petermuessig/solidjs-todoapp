import { createMemo, createEffect, onCleanup, lazy } from "solid-js";
import { createStore } from "solid-js/store";

import { getAppI18nBundle } from "./assets/I18NSupport";
import { setTheme } from "./assets/ThemeSupport";

import './TodoApp.scss';

import "@fundamental-styles/common-css/dist/common-css.css";

import "fundamental-styles/dist/button.css";
import "fundamental-styles/dist/bar.css";
import "fundamental-styles/dist/layout-panel.css";
import "fundamental-styles/dist/shellbar.css";
import "fundamental-styles/dist/avatar.css";

import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/Panel";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents-fiori/dist/ShellBar";
import "@ui5/webcomponents-fiori/dist/ShellBarItem";

import "@ui5/webcomponents-icons/dist/palette";
import "@ui5/webcomponents-icons/dist/world";

import TodoList from "./TodoList";
import TodoListItem from "./TodoListItem";

import logo from "./TodoApp.svg";

// use sap_horizon by default
setTheme("sap_horizon");

const i18nBundle = await getAppI18nBundle();

const LOCAL_STORAGE_KEY = "todos-solid";
function createLocalStore(value) {
  // load stored todos on init
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY),
    [state, setState] = createStore(stored ? JSON.parse(stored) : value);

  // JSON.stringify creates deps on every iterable field
  createEffect(() => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state)));
  return [state, setState];
}

const TodoApp = () => {
  let newEditTitle, newEditDue, themeSwitch, languageSwitch, editDialog;

  // *************
  // STATE & LOGIC 
  // *************

  const [state, setState] = createLocalStore({
      counter: 1,
      todos: [],
      editTodo: {
        id: "",
        title: "",
        due: ""
      }
    }),
    filterTodos = (completed = false) => {
      return state.todos.filter((todo) => todo.completed === completed);
    },
    addTodo = () => {
      if (newEditTitle.value) {
        setState({
          todos: [{ title: newEditTitle.value, due: newEditDue.value, id: state.counter, completed: false }, ...state.todos],
          counter: state.counter + 1
        });
        newEditTitle.value = newEditDue.value = "";
      }
    },
    toggleTodo = (id) => {
      const currentTodo = state.todos.find((todo) => { return todo.id === id; });
      setState("todos", (todo) => todo.id === id, {...currentTodo, completed: !currentTodo.completed});
    },
    editTodo = (id) => {
      const currentTodo = state.todos.find((todo) => { return todo.id === id; });
      setState("editTodo", currentTodo);
      editDialog.show();
      //setState("todos", (t) => t.filter((todo) => todo.id !== id));
    },
    saveTodo = ({id, title, due}) => {
      editDialog.close();
      const currentTodo = state.todos.find((todo) => { return todo.id === id; });
      setState("todos", (todo) => todo.id === id, {...currentTodo, title, due});
    },
    deleteTodo = (id) => {
      setState("todos", (t) => t.filter((todo) => todo.id !== id));
    },
    completeAll = () => {
      const todos = JSON.parse(JSON.stringify(state.todos)); // better way?
      todos.forEach((todo) => { todo.completed = true });
      setState({
        todos
      });
    },
    deleteAll = () => {
      setState({
        todos: [],
        counter: 0
      });
    },
    selectTheme = (event) => {
      themeSwitch.showAt(event.detail.targetRef);
    },
    themeSelected = (event) => {
      themeSwitch.close();
      setTheme(event.detail.targetItem.dataset.theme || "sap_horizon");
    },
    selectLanguage = (event) => {
      languageSwitch.showAt(event.detail.targetRef);
    },
    languageSelected = (event) => {
      languageSwitch.close();
      document.location.href = `${new URL(document.location.href).origin}?sap-ui-language=${event.detail.targetItem.dataset.theme || "en"}`;
    };

  // ************
  // UI DEFINTION
  // ************

  const TodoEdit = lazy(() => import("./TodoEdit"));
  const ThemeSwitch = lazy(() => import("./ThemeSwitch"));
  const LanguageSwitch = lazy(() => import("./LanguageSwitch"));

  return (
    <section class="todo-wrapper">
      <header>
          <ui5-shellbar primary-title={i18nBundle.getText("TITLE")}>
              <img slot="logo" src={logo} alt="Logo" class="todo-wrapper__logo"/>
              <ui5-shellbar-item icon="world" text={i18nBundle.getText("LANGUAGE")} on:click={selectLanguage} />
              <ui5-shellbar-item icon="palette" text={i18nBundle.getText("THEME")} on:click={selectTheme} />
              <ui5-avatar slot="profile" size="XS" initials="FC" />
          </ui5-shellbar>
          <LanguageSwitch ref={languageSwitch} headerText={i18nBundle.getText("LANGUAGE")} onLanguageSelected={languageSelected}/>
          <ThemeSwitch ref={themeSwitch} headerText={i18nBundle.getText("THEME")} onThemeSelected={themeSelected}/>
      </header>

      <section class="todo">
        <div class="todo__create fd-layout-panel">
          <div class="todo__create-wrapper fd-layout-panel__body">
            <ui5-input class="todo__task-name" ref={newEditTitle} placeholder={i18nBundle.getText("TODO_ENTER")} />
            <ui5-date-picker  class="todo__task-date" ref={newEditDue} format-pattern="dd/MM/yyyy" />
            <ui5-button class="todo__task-btn" on:click={addTodo} design="Emphasized">{i18nBundle.getText("TODO_ADD")}</ui5-button>
          </div>
        </div>

        <ui5-panel header-text={i18nBundle.getText("TODO_INCOMPLETE")} collapsed class="todo__list">
          <TodoList>
            <For each={filterTodos()}>
              {(todo) => (
                <TodoListItem {...todo} onToggle={toggleTodo} 
                    editText={i18nBundle.getText("TODO_EDIT")} onEdit={editTodo} 
                    deleteText={i18nBundle.getText("TODO_DELETE")} onDelete={deleteTodo}>
                </TodoListItem>
              )}
            </For>
          </TodoList>
        </ui5-panel>

        <ui5-panel header-text={i18nBundle.getText("TODO_COMPLETED")} collapsed class="todo__list">
          <TodoList>
            <For each={filterTodos(true)}>
              {(todo) => (
                <TodoListItem {...todo} onToggle={toggleTodo} 
                    editText={i18nBundle.getText("TODO_EDIT")} onEdit={editTodo} 
                    deleteText={i18nBundle.getText("TODO_DELETE")} onDelete={deleteTodo}>
                </TodoListItem>
              )}
            </For>
          </TodoList>
        </ui5-panel>
      </section>

      <div class="fd-bar fd-bar--footer fd-bar--cozy">
          <div class="fd-bar__right">
              <div class="fd-bar__element">
                  <button on:click={completeAll} aria-label="button" class="fd-button fd-button--emphasized">
                    {i18nBundle.getText("TODO_COMPLETE_ALL")}
                  </button>
              </div>
              <div class="fd-bar__element">
                  <button  on:click={deleteAll} aria-label="button" class="fd-button fd-button--transparent">
                    {i18nBundle.getText("TODO_DELETE_ALL")}
                  </button>
              </div>
          </div>
      </div>

      <TodoEdit ref={editDialog} {...state.editTodo} onSave={saveTodo} onCancel={(e) => { editDialog.close(); }} />
    </section>

  );
};

export default TodoApp;
