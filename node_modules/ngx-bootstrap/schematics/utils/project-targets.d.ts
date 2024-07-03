/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { workspaces } from '@angular-devkit/core';
/** Resolves the architect options for the build target of the given project. */
export declare function getProjectTargetOptions(project: workspaces.ProjectDefinition, buildTarget: string): Record<string, import("@angular-devkit/core").JsonValue>;
