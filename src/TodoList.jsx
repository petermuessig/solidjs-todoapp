import "@ui5/webcomponents/dist/List";

const TodoList = (props) => {
  return (
    <ui5-list mode="MultiSelect" on:selection-change={(e) => e.detail?.targetItem?.dispatchEvent(new Event("toggle"))}>
      {props.children}
    </ui5-list>                  
  );
};

export default TodoList;