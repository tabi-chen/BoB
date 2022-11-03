import * as vscode from 'vscode';
import { toUri } from './path';


export async function createFile(filepath: string | vscode.Uri): Promise<{ status: boolean, uri: vscode.Uri, reason?: string }> {
    const fileUri = toUri(filepath);
    const wsEdit = new vscode.WorkspaceEdit();
    const isFileExist = await checkFileExist(fileUri);

    if (isFileExist) {
        return { status: false, uri: fileUri, reason: "file exist" };
    }

    wsEdit.createFile(fileUri);
    await vscode.workspace.applyEdit(wsEdit);
    vscode.window.showInformationMessage(`Create a new file to: ${fileUri.fsPath} `);
    return { status: true, uri: fileUri };
}


export async function writeFile(filepath: string | vscode.Uri, content: Uint8Array): Promise<{ status: boolean, uri: vscode.Uri, reason?: string }> {
    const fileUri = toUri(filepath);
    const isFileExist = await checkFileExist(fileUri);

    if (!isFileExist) {
        return { status: false, uri: fileUri, reason: "file does not exist" };
    }

    await vscode.workspace.fs.writeFile(fileUri, content);
    return { status: true, uri: fileUri };
}


export async function checkFileExist(filepath: string | vscode.Uri): Promise<boolean> {
    filepath = toUri(filepath);
    try {
        await vscode.workspace.fs.stat(filepath);
    } catch {
        return false
    }
    return true
}