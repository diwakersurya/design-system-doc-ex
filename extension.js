// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "genesis-doc" is now active!',context);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('Genesis.open', function () {

		// The code you place here will be executed every time your command is executed
		const editor = vscode.window.activeTextEditor;
		const selection = editor.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
			const selectedText = editor.document.getText(selectionRange);
			const panel = vscode.window.createWebviewPanel(
				'genesisPanel', // Identifies the type of the webview. Used internally
				'Genesis document', // Title of the panel displayed to the user
				vscode.ViewColumn.One, // Editor column to show the new webview panel in.
				{  enableScripts: true} // Webview options. More on these later.
			  );
			   // And set its HTML content
			   panel.webview.html = getWebviewContent(selectedText);
			  // panel.webview.postMessage({ command: 'move',component:'avatar' });
		}

	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(component) {
	const url=`https://spaced-out.github.io/ui-design-system/?path=/docs/components-${component}--docs`
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>

	  <script>
	  function loadWebviewContent(component) {
		return "https://spaced-out.github.io/ui-design-system/?path=/docs/components-"+component+"--docs";
	  }

	  // Handle the message inside the webview
	  window.addEventListener('message', event => {

		  const message = event.data; // The JSON data our extension sent

		  switch (message.command) {
			  case 'move':
				  document.querySelector('#genesis-doc-frame').src = loadWebviewContent(message.component);
				  break;
		  }
	  });
  </script>
  </head>
  <body>
  <iframe
  id="genesis-doc-frame"
  title="Inline Frame Example"
  width="100%"
  height='900px'
  src="${url}"
>
</iframe>
  </body>
  </html>`;
  }

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
