"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var ts = require("typescript");
var schematics_1 = require("@angular-devkit/schematics");
var schematics_core_1 = require("../../schematics-core");
var tasks_1 = require("@angular-devkit/schematics/tasks");
function addImportToNgModule(options) {
    return function (host) {
        var e_1, _a;
        var modulePath = options.module;
        if (!modulePath) {
            return host;
        }
        if (!host.exists(modulePath)) {
            throw new Error("Specified module path ".concat(modulePath, " does not exist"));
        }
        var text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException("File ".concat(modulePath, " does not exist."));
        }
        var sourceText = text.toString('utf-8');
        var source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        var effectsName = "".concat(schematics_core_1.stringUtils.classify("".concat(options.name, "Effects")));
        var effectsModuleImport = (0, schematics_core_1.insertImport)(source, modulePath, 'EffectsModule', '@ngrx/effects');
        var effectsPath = "/".concat(options.path, "/") +
            (options.flat ? '' : schematics_core_1.stringUtils.dasherize(options.name) + '/') +
            (options.group ? 'effects/' : '') +
            schematics_core_1.stringUtils.dasherize(options.name) +
            '.effects';
        var relativePath = (0, schematics_core_1.buildRelativePath)(modulePath, effectsPath);
        var effectsImport = (0, schematics_core_1.insertImport)(source, modulePath, effectsName, relativePath);
        var effectsSetup = options.minimal ? "[]" : "[".concat(effectsName, "]");
        var _b = __read((0, schematics_core_1.addImportToModule)(source, modulePath, "EffectsModule.forRoot(".concat(effectsSetup, ")"), relativePath), 1), effectsNgModuleImport = _b[0];
        var changes = [effectsModuleImport, effectsNgModuleImport];
        if (!options.minimal) {
            changes = changes.concat([effectsImport]);
        }
        var recorder = host.beginUpdate(modulePath);
        try {
            for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                var change = changes_1_1.value;
                if (change instanceof schematics_core_1.InsertChange) {
                    recorder.insertLeft(change.pos, change.toAdd);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (changes_1_1 && !changes_1_1.done && (_a = changes_1["return"])) _a.call(changes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
function addNgRxEffectsToPackageJson() {
    return function (host, context) {
        (0, schematics_core_1.addPackageToPackageJson)(host, 'dependencies', '@ngrx/effects', schematics_core_1.platformVersion);
        context.addTask(new tasks_1.NodePackageInstallTask());
        return host;
    };
}
function default_1(options) {
    return function (host, context) {
        options.path = (0, schematics_core_1.getProjectPath)(host, options);
        if (options.module) {
            options.module = (0, schematics_core_1.findModuleFromOptions)(host, options);
        }
        var parsedPath = (0, schematics_core_1.parseName)(options.path, options.name || '');
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        var templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            options.skipTests
                ? (0, schematics_1.filter)(function (path) { return !path.endsWith('.spec.ts.template'); })
                : (0, schematics_1.noop)(),
            options.minimal ? (0, schematics_1.filter)(function (_) { return false; }) : (0, schematics_1.noop)(),
            (0, schematics_1.applyTemplates)(__assign(__assign(__assign({}, schematics_core_1.stringUtils), { 'if-flat': function (s) {
                    return schematics_core_1.stringUtils.group(options.flat ? '' : s, options.group ? 'effects' : '');
                } }), options)),
            (0, schematics_1.move)(parsedPath.path),
        ]);
        return (0, schematics_1.chain)([
            (0, schematics_1.branchAndMerge)((0, schematics_1.chain)([addImportToNgModule(options), (0, schematics_1.mergeWith)(templateSource)])),
            options && options.skipPackageJson
                ? (0, schematics_1.noop)()
                : addNgRxEffectsToPackageJson(),
        ])(host, context);
    };
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map