// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { resolveCliArgsFromVSCodeExecutablePath } from '@vscode/test-electron';
import * as vscode from 'vscode';

function getNonce() {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
	return text;
}  

class SidebarProvider implements vscode.WebviewViewProvider {
	_view?: vscode.WebviewView;
	_doc?: vscode.TextDocument;
	constructor(private readonly _extensionUri: vscode.Uri) { }
	public resolveWebviewView(webviewView: vscode.WebviewView) {
		this._view = webviewView;
  		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this._extensionUri],
	  	};
		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
		const myjson = require(vscode.Uri.joinPath(this._extensionUri, "media", "data.json").fsPath);
		const makeText = (key:string, sname1:string, dt1:string, dt2:string) : string => {
			let s = myjson[key];
			const sname = sname1 === "default" || sname1 === "" ? key : sname1;
			s = s.replace(/STRUCTNAME/g,sname);
			s = s.replace(/DATATYPE1/g,dt1);
			s = s.replace(/DATATYPE2/g,dt2);
			//console.log(s);
			return s;
		};
		webviewView.webview.onDidReceiveMessage(async (data) => {
			switch (data.type) {
				case "onInfo":  { if (data.value) { vscode.window.showInformationMessage(data.value); }; break; }
		  		case "onError": { if (data.value) { vscode.window.showErrorMessage(data.value); } break; }
				case "addText": { 
					const t = makeText(data.value.key,data.value.structname,data.value.datatype1,data.value.datatype2);
					vscode.commands.executeCommand("cphelpergolang.addText",t);
					break;
				}
			}
		});
	}
  	public revive(panel: vscode.WebviewView) { this._view = panel; }
  	private _getHtmlForWebview(webview: vscode.Webview) {
		const styleResetUri = webview.asWebviewUri( vscode.Uri.joinPath(this._extensionUri, "media", "reset.css") );
		const styleVSCodeUri = webview.asWebviewUri( vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css") );
		const styleMainUri = webview.asWebviewUri( vscode.Uri.joinPath(this._extensionUri, "out", "main.css") );
		const scriptUri = webview.asWebviewUri( vscode.Uri.joinPath(this._extensionUri, "out", "main.js") );
		const nonce = getNonce();
		return `<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
		  			<meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
				  	<meta name="viewport" content="width=device-width, initial-scale=1.0">
				  	<link href="${styleResetUri}" rel="stylesheet">
				  	<link href="${styleVSCodeUri}" rel="stylesheet">
				  	<link href="${styleMainUri}" rel="stylesheet">
					<script nonce="${nonce}" defer="defer" src="${scriptUri}"></script>
					<script nonce="${nonce}">
						const tsvscode = acquireVsCodeApi();
		  			</script>
				</head>
				<body>
					<h1>CP Helper Golang</h1>
					<div id="root"></div>
				</body>
			</html>`;
	}
}
export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	const disp1 = vscode.commands.registerTextEditorCommand('cphelpergolang.addText', (editor,edit,mytext:string) => { edit.insert(editor.selection.active,mytext); });
	const disp2 = vscode.window.registerWebviewViewProvider("cphelpergolang-sidebar", sidebarProvider);
	context.subscriptions.push( disp1, disp2 );
}

// this method is called when your extension is deactivated
export function deactivate() {}
