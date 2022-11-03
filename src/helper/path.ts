import * as vscode from 'vscode';


export function toUri(filepath: string | vscode.Uri): vscode.Uri {
    if (typeof filepath === "string") {
        filepath = vscode.Uri.file(filepath as string);
    }
    return filepath
}


export function getWorkSpace(): string {
    // If has opened the file, will return the workspace of the file.
    // Else will return the first folder in the workspace.
    let editor = vscode.window.activeTextEditor;
    let workspace = vscode.workspace?.workspaceFolders?.[0];
    let wsPath = "";
    if (editor) {
        const currentFile = editor.document.uri;
        wsPath = vscode.workspace.getWorkspaceFolder(currentFile)?.uri.fsPath as string;
    }
    else if (workspace) {
        wsPath = vscode.workspace?.workspaceFolders?.[0].uri.fsPath as string;
    }

    return wsPath;
}