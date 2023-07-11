import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js";
import defaultTheme from "./sap_fiori_3/parameters-bundle.css.js";

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5con/components", "sap_fiori_3", async () => defaultTheme);

const styleData = {
    packageName: "@ui5con/components",
    fileName: "themes/dummy.css",
    content: ":host {}"
};
export default styleData;