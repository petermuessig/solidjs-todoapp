import "@ui5/webcomponents/dist/Popover";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";

const ThemeSwitch = (props) => {
    return (
        <ui5-popover ref={props.ref} placement-type="Bottom" horizontal-align="Right" header-text={props.headerText}>
            <ui5-list mode="SingleSelect" on:selection-change={props.onThemeSelected}>
                <ui5-li icon="palette" data-theme="sap_horizon" selected>SAP Horizon Morning</ui5-li>
                <ui5-li icon="palette" data-theme="sap_horizon_dark">SAP Horizon Evening</ui5-li>
                <ui5-li icon="palette" data-theme="sap_horizon_hcb">SAP Horizon HCB</ui5-li>
                <ui5-li icon="palette" data-theme="sap_horizon_hcw">SAP Horizon HCW</ui5-li>
                <ui5-li icon="palette" data-theme="sap_fiori_3">SAP Quartz Light</ui5-li>
                <ui5-li icon="palette" data-theme="sap_fiori_3_dark">SAP Quartz Dark</ui5-li>
                <ui5-li icon="palette" data-theme="sap_fiori_3_hcb">SAP Quartz HCB</ui5-li>
                <ui5-li icon="palette" data-theme="sap_fiori_3_hcw">SAP Quartz HCW</ui5-li>
            </ui5-list>
        </ui5-popover>
    );
};

export default ThemeSwitch;
