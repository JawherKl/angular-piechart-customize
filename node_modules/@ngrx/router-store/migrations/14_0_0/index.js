"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var ts = require("typescript");
var schematics_1 = require("@angular-devkit/schematics");
var schematics_core_1 = require("../../schematics-core");
var renames = {
    DefaultRouterStateSerializer: 'FullRouterStateSerializer'
};
function renameSerializers() {
    return function (tree) {
        (0, schematics_core_1.visitTSSourceFiles)(tree, function (sourceFile) {
            var routerStoreImports = sourceFile.statements
                .filter(ts.isImportDeclaration)
                .filter(function (_a) {
                var moduleSpecifier = _a.moduleSpecifier;
                return moduleSpecifier.getText(sourceFile).includes('@ngrx/router-store');
            });
            if (routerStoreImports.length === 0) {
                return;
            }
            var changes = __spreadArray(__spreadArray([], __read(findSerializerImportDeclarations(sourceFile, routerStoreImports)), false), __read(findSerializerReplacements(sourceFile)), false);
            (0, schematics_core_1.commitChanges)(tree, sourceFile.fileName, changes);
        });
    };
}
function findSerializerImportDeclarations(sourceFile, imports) {
    var changes = imports
        .map(function (p) { var _a, _b; return (_b = (_a = p === null || p === void 0 ? void 0 : p.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings) === null || _b === void 0 ? void 0 : _b.elements; })
        .reduce(function (imports, curr) { return imports.concat(curr !== null && curr !== void 0 ? curr : []); }, [])
        .map(function (specifier) {
        if (!ts.isImportSpecifier(specifier)) {
            return { hit: false };
        }
        var serializerImports = Object.keys(renames);
        if (serializerImports.includes(specifier.name.text)) {
            return { hit: true, specifier: specifier, text: specifier.name.text };
        }
        // if import is renamed
        if (specifier.propertyName &&
            serializerImports.includes(specifier.propertyName.text)) {
            return { hit: true, specifier: specifier, text: specifier.propertyName.text };
        }
        return { hit: false };
    })
        .filter(function (_a) {
        var hit = _a.hit;
        return hit;
    })
        .map(function (_a) {
        var specifier = _a.specifier, text = _a.text;
        return !!specifier && !!text
            ? (0, schematics_core_1.createReplaceChange)(sourceFile, specifier, text, renames[text])
            : undefined;
    })
        .filter(function (change) { return !!change; });
    return changes;
}
function findSerializerReplacements(sourceFile) {
    var renameKeys = Object.keys(renames);
    var changes = [];
    ts.forEachChild(sourceFile, function (node) { return find(node, changes); });
    return changes;
    function find(node, changes) {
        var change = undefined;
        if (ts.isPropertyAssignment(node) &&
            renameKeys.includes(node.initializer.getText(sourceFile))) {
            change = {
                node: node.initializer,
                text: node.initializer.getText(sourceFile)
            };
        }
        if (ts.isPropertyAccessExpression(node) &&
            renameKeys.includes(node.expression.getText(sourceFile))) {
            change = {
                node: node.expression,
                text: node.expression.getText(sourceFile)
            };
        }
        if (ts.isVariableDeclaration(node) &&
            node.type &&
            renameKeys.includes(node.type.getText(sourceFile))) {
            change = {
                node: node.type,
                text: node.type.getText(sourceFile)
            };
        }
        if (change) {
            changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, change.node, change.text, renames[change.text]));
        }
        ts.forEachChild(node, function (childNode) { return find(childNode, changes); });
    }
}
function default_1() {
    return (0, schematics_1.chain)([renameSerializers()]);
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map