"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceFile = exports.addModuleImportToRootModule = exports.removePackageJsonDependency = exports.createTestApp = exports.addPackageToPackageJson = exports.getProjectTargetOptions = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const ts = require("typescript");
const project_main_file_1 = require("./project-main-file");
function getProjectTargetOptions(project, buildTarget) {
    var _a, _b;
    if ((_b = (_a = project === null || project === void 0 ? void 0 : project.targets) === null || _a === void 0 ? void 0 : _a.get(buildTarget)) === null || _b === void 0 ? void 0 : _b.options) {
        return project.targets.get(buildTarget).options;
    }
    throw new Error(`Cannot determine project target configuration for: ${buildTarget}.`);
}
exports.getProjectTargetOptions = getProjectTargetOptions;
function sortObjectByKeys(obj) {
    return Object
        .keys(obj)
        .sort()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((result, key) => (result[key] = obj[key]) && result, {});
}
function addPackageToPackageJson(host, pkg, version) {
    var _a;
    if (host.exists('package.json')) {
        const sourceText = (_a = host.read('package.json')) === null || _a === void 0 ? void 0 : _a.toString('utf-8');
        const json = JSON.parse(sourceText);
        if (!json.dependencies) {
            json.dependencies = {};
        }
        if (!json.dependencies[pkg]) {
            json.dependencies[pkg] = version;
            json.dependencies = sortObjectByKeys(json.dependencies);
        }
        host.overwrite('package.json', JSON.stringify(json, null, 2));
    }
    return host;
}
exports.addPackageToPackageJson = addPackageToPackageJson;
function createTestApp(runner, appOptions = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const workspaceTree = yield runner
            .runExternalSchematicAsync('@schematics/angular', 'workspace', {
            name: 'workspace',
            version: '8.2.0',
            newProjectRoot: 'projects',
        }).toPromise();
        return runner
            .runExternalSchematicAsync('@schematics/angular', 'application', Object.assign(Object.assign({}, appOptions), { name: 'ngx-bootstrap' }), workspaceTree).toPromise();
    });
}
exports.createTestApp = createTestApp;
function removePackageJsonDependency(tree, dependencyName) {
    if (tree.exists('package.json')) {
        const packageContent = tree.read('/package.json').toString('utf-8');
        const json = JSON.parse(packageContent);
        delete json.dependencies[dependencyName];
        tree.overwrite('/package.json', JSON.stringify(packageContent, null, 2));
    }
    if (!tree.exists('package.json')) {
        throw new schematics_1.SchematicsException(`there is no package json`);
    }
}
exports.removePackageJsonDependency = removePackageJsonDependency;
function addModuleImportToRootModule(host, moduleName, src, project) {
    const modulePath = (0, ng_ast_utils_1.getAppModulePath)(host, (0, project_main_file_1.getProjectMainFile)(project));
    const moduleSource = getSourceFile(host, modulePath);
    if (!moduleSource) {
        throw new schematics_1.SchematicsException(`Module not found: ${modulePath}`);
    }
    const changes = (0, ast_utils_1.addImportToModule)(moduleSource, modulePath, moduleName, src);
    const recorder = host.beginUpdate(modulePath);
    changes.forEach((change) => {
        if (change instanceof change_1.InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
        }
    });
    host.commitUpdate(recorder);
}
exports.addModuleImportToRootModule = addModuleImportToRootModule;
function getSourceFile(host, path) {
    const buffer = host.read(path);
    if (!buffer) {
        throw new schematics_1.SchematicsException(`Could not find file for path: ${path}`);
    }
    const content = buffer.toString();
    return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
}
exports.getSourceFile = getSourceFile;
//# sourceMappingURL=index.js.map