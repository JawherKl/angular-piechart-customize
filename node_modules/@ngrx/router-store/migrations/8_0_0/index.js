"use strict";
exports.__esModule = true;
var ts = require("typescript");
var schematics_1 = require("@angular-devkit/schematics");
var schematics_core_1 = require("../../schematics-core");
function updateRouterStoreImport() {
    return function (tree) {
        (0, schematics_core_1.visitTSSourceFiles)(tree, function (sourceFile) {
            var changes = [];
            ts.forEachChild(sourceFile, function findDecorator(node) {
                if (!ts.isDecorator(node)) {
                    ts.forEachChild(node, findDecorator);
                    return;
                }
                ts.forEachChild(node, function findImports(node) {
                    if (ts.isPropertyAssignment(node) &&
                        ts.isArrayLiteralExpression(node.initializer) &&
                        ts.isIdentifier(node.name) &&
                        node.name.text === 'imports') {
                        node.initializer.elements
                            .filter(ts.isIdentifier)
                            .filter(function (element) { return element.text === 'StoreRouterConnectingModule'; })
                            .forEach(function (element) {
                            changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, element, 'StoreRouterConnectingModule', 'StoreRouterConnectingModule.forRoot()'));
                        });
                    }
                    ts.forEachChild(node, findImports);
                });
            });
            (0, schematics_core_1.commitChanges)(tree, sourceFile.fileName, changes);
        });
    };
}
function default_1() {
    return (0, schematics_1.chain)([updateRouterStoreImport()]);
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map