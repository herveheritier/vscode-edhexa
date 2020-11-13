"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
/* eslint-disable semi */
const vscode = require("vscode");
const fs = require("fs"); // pour que cet import fonctionne, il a fallut d'abord passer la commande > npm install --save-dev @types/node
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('edhexa.openAscii', (uri) => {
        EdHexaPanel.createOrShow(context.extensionUri, uri, 'ASCII');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('edhexa.openEbcdic', (uri) => {
        EdHexaPanel.createOrShow(context.extensionUri, uri, 'EBCDIC');
    }));
}
exports.activate = activate;
/**
 * Manages ed hexa webview panels
 */
class EdHexaPanel {
    /*
    public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        EdHexaPanel.currentPanel = new EdHexaPanel(panel, extensionUri);
    }
    */
    constructor(panel, extensionUri, fileUri, mode) {
        this._statusBarItemCharMode = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
        this._statusBarItemInsertMode = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
        this._disposables = [];
        this._bufferSize = vscode.workspace.getConfiguration().edhexa.bufferSize;
        this._buffer = new Uint8Array(this._bufferSize + 1);
        this._panel = panel;
        this._extensionUri = extensionUri;
        this._fileUri = fileUri;
        this._mode = mode || '';
        const webview = this._panel.webview;
        this._fd = fs.openSync(this._fileUri.fsPath, 'r');
        // Set the webview's initial html content
        this._panel.webview.html = this._getHtmlForWebview(webview);
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => {
            this.dispose(), null, this._disposables;
            this._statusBarItemCharMode.hide();
            this._statusBarItemInsertMode.hide();
        });
        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'alert':
                    vscode.window.showErrorMessage(message.text);
                    break;
                case 'info':
                    vscode.window.showInformationMessage(message.text);
                    break;
                case 'save':
                    // eslint-disable-next-line no-case-declarations
                    const res = Array.from(message.content).map((e) => { return e.charCodeAt(0); });
                    vscode.workspace.fs.writeFile(this._fileUri, Uint8Array.from(res)).then(() => {
                        vscode.window.showInformationMessage('le fichier a été enregistré');
                    }, (error) => {
                        vscode.window.showErrorMessage('enregistrement en échec');
                    });
                    break;
                case 'readBuffer':
                    this.readBuffer(message.content.position, message.content.mode);
                    break;
                case 'refreshCharModeStatus':
                    this._statusBarItemCharMode.text = message.value;
                    break;
                case 'refreshInsertModeStatus':
                    this._statusBarItemInsertMode.text = message.value;
                    break;
                case 'getDefault':
                    // eslint-disable-next-line no-case-declarations
                    const config = { ...vscode.workspace.getConfiguration().edhexa, ...({ charsetMode: mode }) };
                    this._panel.webview.postMessage({
                        command: 'default',
                        content: config
                    });
                    break;
                case 'getReady':
                    fs.readFile(this._fileUri.fsPath, (err, data) => {
                        if (err)
                            vscode.window.showErrorMessage('erreur de lecture');
                        else {
                            this._fileContent = data;
                            this._panel.webview.postMessage({ command: 'ready' });
                        }
                    });
                    break;
                case 'getStats':
                    fs.stat(this._fileUri.fsPath, (err, stats) => {
                        this._panel.webview.postMessage({
                            command: 'stats',
                            content: stats
                        });
                    });
                    break;
                case 'updateBuffer':
                    // eslint-disable-next-line no-case-declarations
                    let data = Array.from(this._fileContent);
                    data = data.slice(0, message.pageOffset).concat(message.content).concat(data.slice(message.pageOffset + message.pageSize));
                    this._fileContent = data;
                    console.log(this._fileContent);
                    break;
            }
        }, null, this._disposables);
    }
    static createOrShow(extensionUri, fileUri, mode) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        // If we already have a panel, show it.
        if (EdHexaPanel.currentPanel) {
            EdHexaPanel.currentPanel._panel.reveal(column);
            EdHexaPanel.currentPanel._statusBarItemCharMode.show();
            EdHexaPanel.currentPanel._statusBarItemInsertMode.show();
            return;
        }
        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(EdHexaPanel.viewType, 'Ed-Hexa', column || vscode.ViewColumn.One, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
            retainContextWhenHidden: true
        });
        EdHexaPanel.currentPanel = new EdHexaPanel(panel, extensionUri, fileUri, mode);
        // create status bar
        EdHexaPanel.currentPanel._statusBarItemCharMode.text = 'Ed-Hexa';
        EdHexaPanel.currentPanel._statusBarItemCharMode.show();
        EdHexaPanel.currentPanel._statusBarItemInsertMode.text = vscode.workspace.getConfiguration().edhexa.insertMode;
        EdHexaPanel.currentPanel._statusBarItemInsertMode.show();
    }
    readBuffer(offset, mode = this._mode) {
        var _a;
        const data = Array.from(((_a = this._fileContent) === null || _a === void 0 ? void 0 : _a.slice(offset, offset + this._bufferSize + 1)));
        if (data == undefined)
            vscode.window.showErrorMessage('erreur de lecture');
        else
            this._panel.webview.postMessage({
                command: 'load',
                content: {
                    data: data,
                    offset: offset,
                    size: data.length,
                    eof: data.length < this._bufferSize
                },
                mode: mode,
                pageSize: this._bufferSize
            });
    }
    dispose() {
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
    _getHtmlForWebview(webview) {
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
					<input id="length" type="number" min="1" max="32760" value="${vscode.workspace.getConfiguration().edhexa.recordSize}" /><br/>
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
			</html>`;
    }
}
EdHexaPanel.viewType = 'edhexa';
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
//# sourceMappingURL=extension.js.map