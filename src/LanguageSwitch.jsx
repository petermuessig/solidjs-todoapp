import "@ui5/webcomponents/dist/Popover";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";

import { supportedLanguages } from "./assets/I18NSupport";

const LanguageSwitch = (props) => {
    return (
        <ui5-popover ref={props.ref} placement-type="Bottom" horizontal-align="Right" header-text={props.headerText}>
            <ui5-list mode="SingleSelect" on:selection-change={props.onLanguageSelected}>
                <ui5-li icon="palette" data-theme="en">{supportedLanguages["en"].name}</ui5-li>
                <ui5-li icon="palette" data-theme="de">{supportedLanguages["de"].name}</ui5-li>
                <ui5-li icon="palette" data-theme="fr">{supportedLanguages["fr"].name}</ui5-li>
                <ui5-li icon="palette" data-theme="bg">{supportedLanguages["bg"].name}</ui5-li>
            </ui5-list>
        </ui5-popover>
    );
};

export default LanguageSwitch;
