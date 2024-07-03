import { Tree } from '@angular-devkit/schematics';
export declare function getDependencies(host: Tree): {
    name: string;
    version: string;
}[];
export declare function getProjectStyleFile(existingStyles: string[], extension?: string): string | null;
