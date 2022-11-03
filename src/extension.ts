import * as vscode from 'vscode';
import { getWorkSpace } from './helper/path';
import { genFeatureFile, writeFeatureTemplateToFile, FeatureTemplateContext, ScenarioTemplateContext } from './template-code-gen/feature'
import { genStepImplFile } from './template-code-gen/step-impl'
import { checkFileExist } from './helper';


export function activate(context: vscode.ExtensionContext) {
	// Test data
	const ftc: FeatureTemplateContext = {
		"name": "GoFreight Pay Onboarding",
		"db": "SFI latest"
	}
	const indent = 4
	const stc: ScenarioTemplateContext = {
		"name": "Onboarding"
	};
	//

	const config = vscode.workspace.getConfiguration('bob');
	const wsPath = getWorkSpace();

	let cmdGenFeature = vscode.commands.registerCommand('bob.featureCodeGen.genFeature', async () => {
		console.log("[DEBUG] gen a feature by cmd");

		if (wsPath) {
			const newFeaturePath = config.get("newFeaturePath");
			const newStepImplPath = config.get("newStepImplPath");
			const featureFilepath = vscode.Uri.file(`${wsPath}/${newFeaturePath}/${ftc.name}/${ftc.name}.feature`);
			const stepImplFilepath = vscode.Uri.file(`${wsPath}/${newStepImplPath}/${ftc.name}/${ftc.name}.py`);
			const isFeatureExist = await checkFileExist(featureFilepath);
			const isStepImplExist = await checkFileExist(stepImplFilepath);

			if (isFeatureExist && isStepImplExist) {
				vscode.window.showErrorMessage(`Feature and Step Impl are already exist, please use another name.`);
			}
			else {
				if (!isFeatureExist) {
					genFeatureFile(featureFilepath).then(() => {
						writeFeatureTemplateToFile(featureFilepath, ftc, indent);
					})
				}
				if (!isStepImplExist) {
					genStepImplFile(stepImplFilepath);
				}
			}
		}
	});


	// TODO: haven't done it
	let cmdAddScenario = vscode.commands.registerTextEditorCommand('bob.featureCodeGen.addScenario', (editor, edit) => {
		if (editor.document.fileName.endsWith(".feature")) {
			const newScenario = `    Scenario: ${stc.name}`;
			const text = editor.document.getText();
			const contentList = text.split("\n");

			let revInsertLine = 0
			for (const [i, line] of contentList.slice().reverse().entries()) {
				revInsertLine = i;
				if (line) { break; }
			}
			const insertLine = contentList.length - revInsertLine
			const insertText = revInsertLine == 0 ? "\n\n\n" + newScenario + insertLine : "\n\n" + newScenario + insertLine
			edit.insert(new vscode.Position(insertLine, 0), insertText)
		}
	});

	context.subscriptions.push(cmdGenFeature, cmdAddScenario);
}


export function deactivate() { }
