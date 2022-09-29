import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/CustomListItem";

import './TodoListItem.scss';

const TodoListItem = (props) => {
  return (
    <ui5-li-custom data-key={props.id} selected={props.completed} on:toggle={() => { props.onToggle(props.id) }}>
      <div class="todo-list__wrapper">
        <p class="todo-list__title">{props.title} - finish before: {props.due}</p>
        <ui5-button on:click={() => { props.onEdit(props.id) }}>{props.editText}</ui5-button>
        <ui5-button design="Negative" on:click={() => { props.onDelete(props.id) }}>{props.deleteText}</ui5-button>
      </div>
    </ui5-li-custom>
  );
};

export default TodoListItem;