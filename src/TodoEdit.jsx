import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/TextArea";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/Button";

import './TodoEdit.scss';

const TodoEdit = (props) => {
    let title, due;

    return (
        <ui5-dialog ref={props.ref} data-key={props.id} header-text="Edit Todo" >
            <div class="dialog-content">
                <div>
                    <ui5-label>Task:</ui5-label>
                    <ui5-textarea ref={title} class="title-textarea" show-exceeded-text maxlength="24" value={props.title} />
                </div>

                <div>
                    <ui5-label>Due:</ui5-label><br/>
                    <ui5-date-picker ref={due} style="width: 100%;" format-pattern="yyyy-MM-dd" value={props.due}/>
                </div>
            </div>

            <div slot="footer" class="todo-edit__footer">
                <ui5-button class="todo-edit__footer-btn" design="Emphasized" on:click={() => { props.onSave({id: props.id, title: title.value, due: due.value }) }}>Save</ui5-button>
                <ui5-button class="todo-edit__footer-btn" design="Transparent" on:click={props.onCancel}>Cancel</ui5-button>
            </div>
        </ui5-dialog>
    );
};

export default TodoEdit;