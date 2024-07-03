/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as ts from 'typescript';
import { JsonArray, JsonObject, workspaces } from '@angular-devkit/core';
export declare function getProjectTargetOptions(project: workspaces.ProjectDefinition, buildTarget: string): Record<string, string | number | boolean | JsonArray | JsonObject>;
export declare function addPackageToPackageJson(host: Tree, pkg: string, version: string): Tree;
export declare function createTestApp(runner: SchematicTestRunner, appOptions?: {}): Promise<UnitTestTree>;
export declare function removePackageJsonDependency(tree: Tree, dependencyName: string): void;
export declare function addModuleImportToRootModule(host: Tree, moduleName: string, src: string, project: workspaces.ProjectDefinition): void;
export declare function getSourceFile(host: Tree, path: string): ts.SourceFile;
