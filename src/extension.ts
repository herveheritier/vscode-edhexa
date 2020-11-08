/* eslint-disable semi */
import * as vscode from 'vscode';

import * as fs from 'fs'; // pour que cet import fonctionne, il a fallut d'abord passer la commande > npm install --save-dev @types/node

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

	private readonly _fd: number;

	private readonly _bufferSize = 1024 //32760
	private _buffer:NodeJS.ArrayBufferView = new Uint8Array(this._bufferSize)

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

		this._fd = fs.openSync(this._fileUri.fsPath,'r')

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
						return
					case 'readBuffer':
						this.read(message.content.position)
						/*fs.readSync(fd,buf,0,bufferSize,message.content.position)
						this._panel.webview.postMessage({ command:'load',content:{ data:Array.from(buf) }, mode:this._mode})*/
				}
			},
			null,
			this._disposables
		);

		// first reading

		this.read(0)

	}

	private read(offset:number) {
		fs.read(this._fd,this._buffer,0,this._bufferSize,offset,(err,bytesRead,buffer) => {
			if(err) vscode.window.showErrorMessage('erreur de lecture')
			else this._panel.webview.postMessage({ command:'load',content:{ data:Array.from(<ArrayLike<unknown>>buffer), offset:offset, size:bytesRead }, mode:this._mode})	
		})
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

		//const htmlPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'index.html');

		// Use a nonce to only allow specific scripts to be run
		const nonce = getNonce();

		/*const html = fs.readFileSync(htmlPath.fsPath,'utf8')
			.replace('${stylesResetUri}',stylesResetUri.toString())
			.replace('${stylesMainUri}',stylesMainUri.toString())
			.replace('${stylesBaseUri}',stylesBaseUri.toString())
			.replace('${scriptUri}',scriptUri.toString())
			.replace('${scriptEatUri}',scriptEatUri.toString())
			.replace('${scriptBaseUri}',scriptBaseUri.toString())
			.replace('${scriptUtilsUri}',scriptUtilsUri.toString())
			.replace(/\$\{nonce\}/g,nonce)

		return html */
		
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
					<button id="charmode" class="basicButton">Binary Mode</button>
					<button id="split" class="basicButton">Toggle Hex Mode</button>
					<button id="charset" class="basicButton">ASCII</button>
					<button id="saveFile" class="basicButton">Save</button>
					<button id="newLine" class="basicButton">New line</button>
					<select id="format" name="format">
						<option value="F">F</option>
						<option value="FB" selected>FB</option>
						<option value="V">V</option>
						<option value="VB">VB</option>
						<option value="CR">CR</option>
						<option value="LF">LF</option>
						<option value="CL">CR/LF</option>
					</select>
					<input id="length" type="number" min="1" max="32760" value="80" /><br/>
					<button id="prev" class="miniButton">prev</button>
					<button id="next" class="miniButton">next</button>
				</div>
				<div id="mainContent">
				</div>
				<div id="logme"></div>
				<template id="line">
					<div class="aline" style="display:flex;">
						<div class="lineNumber">00000</div>
						<div class="lineBody">
							<input class="ed"></input>
							<input class="high"></input>
							<input class="low"></input>
							<input class="status"></input>
						</div>
					</div>
				</template>

				<script nonce="${nonce}" src="${scriptUri}"></script>

			</body>
			</html>`
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
