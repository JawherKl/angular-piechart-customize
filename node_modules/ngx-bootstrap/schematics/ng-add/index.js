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
exports.checkComponentName = void 0;
const tasks_1 = require("@angular-devkit/schematics/tasks");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const utils_1 = require("../utils");
const ng_module_imports_1 = require("../utils/ng-module-imports");
const project_main_file_1 = require("../utils/project-main-file");
const addStyles_1 = require("../utils/addStyles");
const getVersions_1 = require("../utils/getVersions");
const workspace_1 = require("@schematics/angular/utility/workspace");
const datepickerComponentName = 'datepicker';
const bsName = 'ngx-bootstrap';
const BOOTSTRAP_AVAILABLE_STYLES = {
    'css': [`./node_modules/bootstrap/dist/css/bootstrap.min.css`],
    'scss': [`
/* Importing Bootstrap SCSS file. */
@import "./node_modules/bootstrap/scss/bootstrap";
`]
};
const DATEPICKER_AVAILABLESTYLES = {
    'css': [`./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css`],
    'scss': [`
/* Importing Datepicker SCSS file. */
@import "node_modules/ngx-bootstrap/datepicker/bs-datepicker";
`]
};
const components = {
    accordion: { moduleName: 'AccordionModule', link: `${bsName}/accordion`, animated: true },
    alerts: { moduleName: 'AlertModule', link: `${bsName}/alert` },
    buttons: { moduleName: 'ButtonsModule', link: `${bsName}/buttons` },
    carousel: { moduleName: 'CarouselModule', link: `${bsName}/carousel` },
    collapse: { moduleName: 'CollapseModule', link: `${bsName}/collapse`, animated: true },
    datepicker: { moduleName: 'BsDatepickerModule', link: `${bsName}/datepicker`, animated: true },
    dropdowns: { moduleName: 'BsDropdownModule', link: `${bsName}/dropdown`, animated: true },
    modals: { moduleName: 'ModalModule', link: `${bsName}/modal` },
    pagination: { moduleName: 'PaginationModule', link: `${bsName}/pagination` },
    popover: { moduleName: 'PopoverModule', link: `${bsName}/popover` },
    progressbar: { moduleName: 'ProgressbarModule', link: `${bsName}/progressbar` },
    rating: { moduleName: 'RatingModule', link: `${bsName}/rating` },
    sortable: { moduleName: 'SortableModule', link: `${bsName}/sortable` },
    tabs: { moduleName: 'TabsModule', link: `${bsName}/tabs` },
    timepicker: { moduleName: 'TimepickerModule', link: `${bsName}/timepicker` },
    tooltip: { moduleName: 'TooltipModule', link: `${bsName}/tooltip` },
    typeahead: { moduleName: 'TypeaheadModule', link: `${bsName}/typeahead`, animated: true }
};
function addBsToPackage(options) {
    const componentName = options.component
        ? options.component
        : options['--'] && options['--'][1];
    return (tree, context) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield (0, workspace_1.getWorkspace)(tree);
        const projectName = options.project || workspace.extensions.defaultProject.toString();
        const project = workspace.projects.get(projectName);
        addPackageJsonDependencies(tree, context);
        if (!componentName || componentName === datepickerComponentName || !components[componentName]) {
            insertCommonStyles(project, tree, projectName, options.stylesExtension);
        }
        else {
            insertBootstrapStyles(project, tree, projectName, options.stylesExtension);
        }
        context.addTask(new tasks_1.NodePackageInstallTask());
        if (componentName) {
            addModuleOfComponent(project, tree, context, componentName);
        }
        addAnimationModule(project, tree, context, componentName);
    });
}
exports.default = addBsToPackage;
function addModuleOfComponent(project, host, context, componentName) {
    if (!project) {
        return;
    }
    const appModulePath = (0, ng_ast_utils_1.getAppModulePath)(host, (0, project_main_file_1.getProjectMainFile)(project));
    if (componentName && components[componentName]) {
        if ((0, ng_module_imports_1.hasNgModuleImport)(host, appModulePath, components[componentName].moduleName)) {
            context.logger.warn(`Could not set up ${components[componentName].moduleName} because it already imported.`);
            return;
        }
        (0, utils_1.addModuleImportToRootModule)(host, `${components[componentName].moduleName}.forRoot()`, components[componentName].link, project);
    }
}
function addPackageJsonDependencies(host, context) {
    const dependencies = (0, getVersions_1.getDependencies)(host);
    dependencies.forEach(dependency => {
        (0, utils_1.addPackageToPackageJson)(host, dependency.name, `${dependency.version}`);
        context.logger.log('info', `✅️ Added "${dependency.name}`);
    });
    return host;
}
function insertBootstrapStyles(project, host, projectName, extension) {
    if (!project) {
        return;
    }
    return (0, addStyles_1.addStyles)(project, 'build', host, BOOTSTRAP_AVAILABLE_STYLES, projectName, extension);
}
function insertCommonStyles(project, host, projectName, extension) {
    if (!project) {
        return;
    }
    insertBootstrapStyles(project, host, projectName, extension);
    return (0, addStyles_1.addStyles)(project, 'build', host, DATEPICKER_AVAILABLESTYLES, projectName, extension);
}
function addAnimationModule(project, host, context, componentName) {
    var _a;
    if (!project || !(!componentName || ((_a = components[componentName]) === null || _a === void 0 ? void 0 : _a.animated))) {
        return;
    }
    (0, utils_1.addModuleImportToRootModule)(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);
}
function checkComponentName(componentName) {
    return !!components[componentName];
}
exports.checkComponentName = checkComponentName;
//# sourceMappingURL=index.js.map