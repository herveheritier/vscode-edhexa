/* eslint-disable semi */
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('edhexa.openAscii', (uri:vscode.Uri) => {
			EdHexaPanel.createOrShow(context.extensionUri,uri,'ASCII');
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('edhexa.openEbcdic', (uri:vscode.Uri) => {
			EdHexaPanel.createOrShow(context.extensionUri,uri,'EBCDIC');
		})
	);

}

/**
 * Manages ed hexa webview panels
 */
class EdHexaPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: EdHexaPanel | undefined;

	public static readonly viewType = 'edhexa';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private readonly _fileUri: vscode.Uri;
	private readonly _mode: string;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionUri: vscode.Uri,fileUri:vscode.Uri,mode?:string) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		if (EdHexaPanel.currentPanel) {
			EdHexaPanel.currentPanel._panel.reveal(column);
			return;
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			EdHexaPanel.viewType,
			'Ed-Hexa',
			column || vscode.ViewColumn.One,
			{
				// Enable javascript in the webview
				enableScripts: true,

				// And restrict the webview to only loading content from our extension's `media` directory.
				localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],

				retainContextWhenHidden: true
			}
		);

		EdHexaPanel.currentPanel = new EdHexaPanel(panel, extensionUri, fileUri, mode);
	}

	/*
	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		EdHexaPanel.currentPanel = new EdHexaPanel(panel, extensionUri);
	}
	*/

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, fileUri: vscode.Uri, mode?: string) {
		this._panel = panel;
		this._extensionUri = extensionUri;
		this._fileUri = fileUri
		this._mode = mode || ''
		const webview = this._panel.webview;

		// Set the webview's initial html content
		this._panel.webview.html = this._getHtmlForWebview(webview)

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.text);
						return;
					case 'info':
						vscode.window.showInformationMessage(message.text)
						return
					case 'save':
						// eslint-disable-next-line no-case-declarations
						const res = Array.from(message.content).map((e:any)=>{ return e.charCodeAt(0) })
						vscode.workspace.fs.writeFile(this._fileUri,Uint8Array.from(res)).then(()=>{
							vscode.window.showInformationMessage('le fichier a été enregistré')
						},(error:any)=>{
							vscode.window.showErrorMessage('enregistrement en échec')
							// eslint-disable-next-line no-debugger
							debugger
						})
				}
			},
			null,
			this._disposables
		);

		//

		//this._panel.webview.postMessage({ command: 'refactor', content: 'ready?' });
		vscode.workspace.fs.readFile(this._fileUri).then((thenable:Uint8Array)=>{
			this._panel.webview.postMessage({ command:'load',content:thenable, mode:this._mode})
		},(error:any)=>{
			// eslint-disable-next-line no-debugger
			debugger
		})

		//

	}

	public dispose() {
		EdHexaPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		// Local path to main script run in the webview
		const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js');
		const scriptEatPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'eat.js');
		const scriptBasePathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'base.js');
		const scriptUtilsPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'utils.js');

		// And the uri we use to load this script in the webview
		const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
		const scriptEatUri = webview.asWebviewUri(scriptEatPathOnDisk);
		const scriptBaseUri = webview.asWebviewUri(scriptBasePathOnDisk);
		const scriptUtilsUri = webview.asWebviewUri(scriptUtilsPathOnDisk);

		// Local path to css styles
		const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css');
		const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css');
		const stylesPathBasePath = vscode.Uri.joinPath(this._extensionUri, 'media', 'base.css');

		// Uri to load styles into webview
		const stylesResetUri = webview.asWebviewUri(styleResetPath);
		const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);
		const stylesBaseUri = webview.asWebviewUri(stylesPathBasePath);

		/*const htmlPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'index.html');
		const html = vscode.workspace.fs.readFile(htmlPath).then((e)=>vscode.window.showErrorMessage(`${e.length}`))*/

		// Use a nonce to only allow specific scripts to be run
		const nonce = getNonce();

		return `<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${stylesResetUri}" rel="stylesheet">
				<link href="${stylesMainUri}" rel="stylesheet">
				<link href="${stylesBaseUri}" rel="stylesheet">

				<link href="./style/base.css" rel="stylesheet">
				<script nonce="${nonce}" src="${scriptEatUri}"></script>
				<script nonce="${nonce}" src="${scriptBaseUri}"></script>
				<script nonce="${nonce}" src="${scriptUtilsUri}"></script>
		

				<title>Ed Hexa</title>
			</head>
			<body>
				<div id="mainMenu">
					<button id="split">toggle hex mode</button>
					<button id="charset">ASCII</button>
					<button id="saveFile">Sauver</button>
					<button id="newLine">Nouvelle ligne</button>
					<input id="openFile" type="file" style="display:block"/>
				</div>
				<div id="mainContent">
				</div>
				<template id="line">
					<div class="aline" style="display:flex;">
						<div class="lineNumber">00000</div>
						<div>
							<div class="ed" contenteditable="true"></div>
							<div class="high" contenteditable="true"></div>
							<div class="low" contenteditable="true"></div>
							<div class="status"></div>
						</div>
					</div>
				</template>

				<script nonce="${nonce}" src="${scriptUri}"></script>

			</body>
			</html>`;
	}
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
