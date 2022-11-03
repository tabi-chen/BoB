import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as extension from '../../extension';
import * as helper from '../../helper';
import * as templateCodeGen from '../../template-code-gen';


suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('class IndentWorker', () => {
		const indentWorker = new helper.IndentWorker(2);
		assert.strictEqual("", indentWorker.get(0));
		assert.strictEqual("  ", indentWorker.get(1));
		assert.strictEqual("    ", indentWorker.get(2));
	});

	test('function isPositiveInteger', () => {
		assert.equal(false, helper.isPositiveInteger(0));
		assert.equal(false, helper.isPositiveInteger(-100));
		assert.equal(true, helper.isPositiveInteger(10));
	});

	test('type FeatureTemplateContext', () => {
		let featTemp: templateCodeGen.FeatureTemplateContext = { name: "feature 1", db: "test db" };
		assert.equal("feature 1", featTemp.name)
		assert.equal("test db", featTemp.db)
	});

});
