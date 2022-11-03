import * as vscode from 'vscode';
import { IndentWorker } from '../helper/format';
import { toUri, getWorkSpace } from '../helper/path';
import { TextEncoder, TextDecoder } from 'util';
import { createFile, writeFile } from '../helper/file-manager';


export type FeatureTemplateContext = {
    readonly name: string;
    readonly db: string;
}

export type ScenarioTemplateContext = {
    readonly name: string;
}


export function genFeatureTemplate(context: FeatureTemplateContext, indent = 4): string {
    const indentWorker = new IndentWorker(indent);

    return `
Feature: ${context.name}

${indentWorker.get(1) + "Background: Use DB"}
${indentWorker.get(2) + "Given use " + context.db + " DB"}
	
`
}


export async function genFeatureFile(filepath: string | vscode.Uri) {
    const ret = await createFile(filepath);

    if (!ret.status) {
        vscode.window.showErrorMessage(`Fail to create new feature file, please use another name.`);
        throw vscode.FileSystemError.FileExists(ret.uri)
    }
}


export async function writeFeatureTemplateToFile(filepath: string | vscode.Uri, context: FeatureTemplateContext, indent: number) {
    const fileUri = toUri(filepath);
    const content = new TextEncoder().encode(genFeatureTemplate(context, indent))
    const ret = await writeFile(filepath, content);

    if (ret.status) {
        vscode.window.showTextDocument(ret.uri, { preview: false });
    }
    else {
        vscode.window.showErrorMessage(`Fail to create new feature file, please use another name.`);
    }
}