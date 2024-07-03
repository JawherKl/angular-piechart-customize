import { Tree } from '@angular-devkit/schematics';
import { workspaces } from '@angular-devkit/core';
interface availablePaths {
    'css': string[];
    'scss': string[];
}
export declare function addStyles(project: workspaces.ProjectDefinition, targetName: string, host: Tree, availableAssetPaths: availablePaths, projectName: string, extension?: string): Tree;
export {};
