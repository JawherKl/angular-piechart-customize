"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectStyleFile = exports.getDependencies = void 0;
const core_1 = require("@angular-devkit/core");
const currentVersions = require("./current_dependency_versions.json");
const NGX_BOOTSTRAP_VERSION = currentVersions.NGX_BOOTSTRAP_VERSION;
const BOOTSTRAP_VERSION = currentVersions.BOOTSTRAP_VERSION;
// Regular expression that matches all possible Angular CLI default style files
const defaultStyleFileRegex = /styles\.(c|le|sc|sa)ss/;
// Regular expression that matches all files that have a proper stylesheet extension
const validStyleFileRegex = /\.(c|le|sc|sa)ss/;
function getDependencies(host) {
    return [
        { name: 'bootstrap', version: BOOTSTRAP_VERSION },
        { name: 'ngx-bootstrap', version: NGX_BOOTSTRAP_VERSION }
    ];
}
exports.getDependencies = getDependencies;
function getProjectStyleFile(existingStyles, extension) {
    const defaultExtension = existingStyles.find((file) => extension ? file === `styles.${extension}` : defaultStyleFileRegex.test(file));
    if (defaultExtension) {
        return defaultExtension;
    }
    ;
    const fallbackStylePath = existingStyles.find((file) => extension ? file === null || file === void 0 ? void 0 : file.endsWith(`.${extension}`) : validStyleFileRegex.test(file));
    if (fallbackStylePath) {
        return (0, core_1.normalize)(fallbackStylePath);
    }
    ;
}
exports.getProjectStyleFile = getProjectStyleFile;
//# sourceMappingURL=getVersions.js.map