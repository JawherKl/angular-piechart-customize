"use strict";
exports.__esModule = true;
var schematics_1 = require("@angular-devkit/schematics");
var tasks_1 = require("@angular-devkit/schematics/tasks");
var schematics_core_1 = require("../../schematics-core");
function addModuleToPackageJson() {
    return function (host, context) {
        (0, schematics_core_1.addPackageToPackageJson)(host, 'dependencies', '@ngrx/component-store', schematics_core_1.platformVersion);
        context.addTask(new tasks_1.NodePackageInstallTask());
        return host;
    };
}
function default_1(options) {
    return function (host, context) {
        return (0, schematics_1.chain)([
            options && options.skipPackageJson ? (0, schematics_1.noop)() : addModuleToPackageJson(),
        ])(host, context);
    };
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map