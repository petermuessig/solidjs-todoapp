import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { attachThemeLoaded } from "@ui5/webcomponents-base/dist/theming/ThemeLoaded.js";

// include all theme related resources from UI5 Web Components
import "@ui5/webcomponents-theming/dist/Assets.js";
import "@ui5/webcomponents/dist/generated/json-imports/Themes.js";
import "@ui5/webcomponents-fiori/dist/generated/json-imports/Themes.js";

// listen to theme changes and load the delta theming properties of 
// Fundamental Library Styles to ensure proper theming!
attachThemeLoaded(async (themeName) => {
  // create the style tag for fundamentals if missing
  let style = document.getElementById("fd-params");
  if (!style) {
      style = document.createElement("style");
      style.id = "fd-params";
      document.head.appendChild(style);
  }
  // dynamic scripts need to be included from "node_modules" directly
  let css = undefined;
	switch (themeName) {
		case "sap_fiori_3": css = (await import("fundamental-styles/dist/theming/sap_fiori_3.css")).default; break;
		case "sap_fiori_3_dark": css = (await import("fundamental-styles/dist/theming/sap_fiori_3_dark.css")).default; break;
		case "sap_fiori_3_hcb": css = (await import("fundamental-styles/dist/theming/sap_fiori_3_hcb.css")).default; break;
		case "sap_fiori_3_hcw": css = (await import("fundamental-styles/dist/theming/sap_fiori_3_hcw.css")).default; break;
		case "sap_horizon": css = (await import("fundamental-styles/dist/theming/sap_horizon.css")).default; break;
		case "sap_horizon_dark": css = (await import("fundamental-styles/dist/theming/sap_horizon_dark.css")).default; break;
		case "sap_horizon_hcb": css =  (await import("fundamental-styles/dist/theming/sap_horizon_hcb.css")).default; break;
		case "sap_horizon_hcw": css =  (await import("fundamental-styles/dist/theming/sap_horizon_hcw.css")).default; break;
	}
  style.innerHTML = css;
});

export {
    setTheme
};
