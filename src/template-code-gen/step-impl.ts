import * as vscode from 'vscode';
import { toUri } from '../helper/path';
import { TextEncoder, TextDecoder } from 'util';
import { createFile } from '../helper/file-manager';


export async function genStepImplFile(filepath: string | vscode.Uri) {
    const ret = await createFile(filepath);

    if (!ret.status) {
        vscode.window.showErrorMessage(`Fail to create new step_impl file, please use another name.`);
        throw vscode.FileSystemError.FileExists(ret.uri)
    }
}