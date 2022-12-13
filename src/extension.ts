// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { WorkspaceFolder } from 'vscode';


async function getPythonExtension(): Promise<any> {
	const pyExtensionId = 'ms-python.python';
	const pyExt = vscode.extensions.getExtension(pyExtensionId);

	if (!pyExt) {
		return undefined;
	}
	if (!pyExt.isActive) {
		await pyExt.activate();
	}

	return pyExt;
}

class XmakeConfigurationProvider implements vscode.DebugConfigurationProvider {

	// public provideDebugConfigurations(folder: WorkspaceFolder | undefined, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.DebugConfiguration[]> {
	// 	return [{
	// 		name: `XMake`,
	// 		type: 'xmake',
	// 		request: 'launch',
	// 	}]
	// }

	public resolveDebugConfiguration(folder: WorkspaceFolder | undefined, debugConfig: vscode.DebugConfiguration, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.DebugConfiguration> {
		// const pyExt = getPythonExtension();

		debugConfig.type = 'python';
		debugConfig.name = 'Launch';
		debugConfig.request = 'launch';
		debugConfig.stopOnEntry = true;

		const config = {name: "Test Node", request:"launch", type: "python", program:debugConfig.program}

		return config;
	}
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const provider = new XmakeConfigurationProvider();
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('xmake', provider));


	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "xmake-test" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('xmake-test.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from xmake-test!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
