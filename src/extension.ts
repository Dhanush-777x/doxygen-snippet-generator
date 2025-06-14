import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('doxygen-snippet-generator.addSnippets', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const selection = editor.document.getText(editor.selection);
    if (!selection.trim()) return;

    const snippetName = await vscode.window.showInputBox({
      prompt: 'Enter snippet name',
      placeHolder: 'e.g., SNIPPET_NAME',
    });
    if (!snippetName) return;

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage('Please open a workspace first.');
      return;
    }

    const workspaceRoot = workspaceFolders[0].uri.fsPath;
    const snippetDir = path.join(workspaceRoot, 'snippets');
    const snippetFile = path.join(snippetDir, 'snippets.c');
    const copyFile = path.join(snippetDir, 'copy_from_here.c');

    // Ensure snippet folder exists
    if (!fs.existsSync(snippetDir)) fs.mkdirSync(snippetDir);

    // Read existing snippet file content
    let snippetFileContent = '';
    if (fs.existsSync(snippetFile)) {
      snippetFileContent = fs.readFileSync(snippetFile, 'utf8');
    }

    // Check if snippet with same name exists
    const snippetMarker = `//![${snippetName}]`;
    if (snippetFileContent.includes(snippetMarker)) {
      vscode.window.showWarningMessage(`Snippet "${snippetName}" already exists in snippets/snippet.c`);
      return;
    }

    // Add snippet to snippet.c
    const snippetStart = `//![${snippetName}]\n`;
    const snippetEnd = `//![${snippetName}]\n`;
    const fullSnippet = `\n${snippetStart}${selection}\n${snippetEnd}\n`;
    fs.appendFileSync(snippetFile, fullSnippet);

    // Add usage line to copy_from_here.c
    const usageLine = `/**\n * \\snippet snippets/snippets.c ${snippetName}\n */\n\n`;
    fs.appendFileSync(copyFile, usageLine);

    vscode.window.showInformationMessage(`Snippet "${snippetName}" added and usage added to copy_from_here.c`);
  });

  context.subscriptions.push(disposable);
}
