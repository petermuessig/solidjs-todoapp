import logo from './assets/sap-logo.png';
import { splitProps } from 'solid-js'


function ShellBar(props) {
    const [local, others] = splitProps(props, ['title']);
    return (
        <div class="fd-shellbar">
            <div class="fd-shellbar__group fd-shellbar__group--product">
                <span class="fd-shellbar__logo">
                    <img src={logo} width="48" height="24" alt="SAP"/></span>
                <span class="fd-shellbar__title">{local.title}</span>
            </div>
            <div class="fd-shellbar__group fd-shellbar__group--actions">
                <div class="fd-shellbar__action">
                    <div class="fd-button fd-button--transparent fd-shellbar__button fd-user-menu__control" aria-controls="DD35GBK6" aria-expanded="false" aria-haspopup="true" role="button">
                        <span class="fd-avatar fd-avatar--xs fd-avatar--circle fd-shellbar__avatar--circle">WW</span>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default ShellBar;
  