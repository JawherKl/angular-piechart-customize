"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStyles = void 0;
const getVersions_1 = require("./getVersions");
const index_1 = require("./index");
const path = require("path");
const DEFAULT_STYLE_EXTENSION = 'css';
function addStyles(project, targetName, host, availableAssetPaths, projectName, extension) {
    var _a;
    let targetOptions = (0, index_1.getProjectTargetOptions)(project, targetName);
    const styles = targetOptions.styles;
    if (!styles || (styles instanceof Array && !styles.length)) {
        targetOptions = addEmptyStyles(targetOptions, extension, availableAssetPaths);
        return setUpdatedTargetOptions(host, project, targetOptions, targetName, projectName);
    }
    const existingStyles = styles.map((s) => typeof s === 'string' ? s : s['input']);
    const styleFilePath = (0, getVersions_1.getProjectStyleFile)(existingStyles, extension) || '';
    const styleFileExtension = normalizeExtension(path.extname(styleFilePath), extension, DEFAULT_STYLE_EXTENSION);
    const styleFilePatch = (_a = availableAssetPaths[styleFileExtension]) === null || _a === void 0 ? void 0 : _a[0];
    if (!styleFilePath && styleFileExtension !== 'css' && styleFileExtension !== 'scss') {
        return host;
    }
    if (styleFileExtension === 'scss') {
        return addImportToStylesFile(host, styleFilePath, styleFilePatch);
    }
    if (styleFileExtension === 'css') {
        targetOptions = addStylesPathsToTargetOptions(targetOptions, existingStyles, styleFilePatch);
        return setUpdatedTargetOptions(host, project, targetOptions, targetName, projectName);
    }
    return host;
}
exports.addStyles = addStyles;
function addStylesPathsToTargetOptions(targetOptions, existingStyles, stylePatch) {
    var _a, _b;
    if (!existingStyles.some(path => path === stylePatch)) {
        (_b = (_a = targetOptions.styles) === null || _a === void 0 ? void 0 : _a.unshift) === null || _b === void 0 ? void 0 : _b.call(_a, stylePatch);
    }
    return targetOptions;
}
function addEmptyStyles(targetOptions, extension, availableAssetPaths) {
    targetOptions.styles = availableAssetPaths[DEFAULT_STYLE_EXTENSION];
    return targetOptions;
}
function addImportToStylesFile(host, styleFilePath, styleFilePatch) {
    const styleContent = host.read(styleFilePath).toString('utf-8');
    if (!styleContent.includes(styleFilePatch)) {
        const recorder = host.beginUpdate(styleFilePath);
        recorder.insertRight(styleContent.length, styleFilePatch);
        host.commitUpdate(recorder);
    }
    return host;
}
function setUpdatedTargetOptions(host, project, targetOptions, targetName, projectName) {
    if (host.exists('angular.json')) {
        const currentAngular = JSON.parse(host.read('angular.json').toString('utf-8'));
        if (currentAngular['projects'][projectName].targets) {
            currentAngular['projects'][projectName].targets[targetName]['options'] = targetOptions;
        }
        if (currentAngular['projects'][projectName].architect) {
            currentAngular['projects'][projectName].architect[targetName]['options'] = targetOptions;
        }
        host.overwrite('angular.json', JSON.stringify(currentAngular, null, 2));
    }
    return host;
}
// extension in path could be with .
function normalizeExtension(pathExtension, extension, defaultValue) {
    if (!pathExtension) {
        return defaultValue;
    }
    if (extension) {
        return extension;
    }
    const res = pathExtension.split('.');
    if ((res === null || res === void 0 ? void 0 : res.length) > 1) {
        pathExtension = pathExtension.replace('.', '');
    }
    return pathExtension;
}
//# sourceMappingURL=addStyles.js.map