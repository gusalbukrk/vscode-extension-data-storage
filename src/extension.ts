import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "extension" is now active!');

	let disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
		vscode.window.showInformationMessage('Hello World from extension!');

		// the methods for data storage are available inside `ExtensionContext` object
		// https://code.visualstudio.com/api/references/vscode-api#ExtensionContext

		// a memento object is a simple key-value storage which represents a storage utility
		// with the following methods: get, update, keys (update is the only method which returns a promise)
		// https://code.visualstudio.com/api/references/vscode-api#Memento

		// `workspaceState` is a memento object scoped to the current workspace
		// VS Code manages the storage and will restore it when the same workspace is opened again
		// on Ubuntu, its data is stored at `/home/gusalbukrk/.config/Code/User/workspaceStorage`
		// in a `state.vscdb` file (which is a SQLite database)
		// you'll need to run `ls -la` in this directory and pay attention to date to locate exactly in which file the data is stored
		// await context.workspaceState.update( // add item
		// 	context.workspaceState.keys().length.toString(),
		// 	Math.random().toString()
		// );
		// console.log( // print as an object
		// 	Object.fromEntries(
		// 		context.workspaceState.keys().map(k => [k, context.workspaceState.get(k)])
		// 	)
		// );
		//
		// to remove a key, use `update` with a value of `undefined`
		// console.log(context.workspaceState.keys());
		// for (const key of context.workspaceState.keys()) {
		// 	await context.workspaceState.update(key, undefined);
		// }
		// console.log(context.workspaceState.keys());

		// `globalState` works similarly to `workspaceState`, but it is scoped globally
		// VS Code manages the storage and will restore it for each extension activation
		// it's type is `Memento & {setKeysForSync}`
		// setKeysForSync = set the keys whose values should be synchronized across devices
		// on Ubuntu, its data is stored at `/home/gusalbukrk/.config/Code/User/globalStorage/state.vscdb`
		// await context.globalState.update( // add item
		// 	context.globalState.keys().length.toString(),
		// 	Math.random().toString()
		// );
		// console.log( // print as an object
		// 	Object.fromEntries(
		// 		context.globalState.keys().map(k => [k, context.globalState.get(k)])
		// 	)
		// );

		// secrets are persisted across reloads and are independent of the current opened workspace
		// storage location varies by OS
		// https://github.com/microsoft/vscode-discussions/discussions/748#discussioncomment-7741629
		// available methods are: get, store and delete (all of them have a thenable return type)
		// await context.secrets.store('my_secret', 'foobar');
		// console.log(await context.secrets.get('my_secret'));
		// await context.secrets.delete('my_secret');
		// console.log(await context.secrets.get('my_secret'));

		// gets uri of a workspace specific directory in which the extension can store private state
		// the directory might not exist and creation is up to the extension (the parent directory is guaranteed to be existent)
		// e.g. `/home/username/.config/Code/User/workspaceStorage/131b9543b3558969270727be3be682e5/publisher.extension`
		// console.log(context.storageUri);

		// if (!context.storageUri) {
		// 	// storageUri is undefined when there is no workspace (no folder opened)
		// 	return;
		// }

		// // create the extension's workspace storage folder if it doesn't already exist
		// try {
		// 		// when folder doesn't exist, and error gets thrown
		// 		await vscode.workspace.fs.stat(context.storageUri);
		// } catch {
		// 		// create the extension's workspace storage folder
		// 		console.log('creating directory...');
		// 		await vscode.workspace.fs.createDirectory(context.storageUri)
		// }

		// const workspaceData = vscode.Uri.joinPath(context.storageUri, 'my-storage-file.json');
		// const writeData = new TextEncoder().encode(JSON.stringify({ now: Date.now() }));
		// vscode.workspace.fs.writeFile(workspaceData, writeData);

		// gets uri of a workspace specific directory in which the extension can store private state
		// the directory might not exist and creation is up to the extension (the parent directory is guaranteed to be existent)
		// e.g. `/home/username/.config/Code/User/globalStorage/publisher.extension/`
		console.log(context.globalStorageUri);

		if (!context.globalStorageUri) {
			console.log('!!!');
			return;
		}

		// create the extension's workspace storage folder if it doesn't already exist
		try {
				// when folder doesn't exist, and error gets thrown
				await vscode.workspace.fs.stat(context.globalStorageUri);
		} catch {
				// create the extension's workspace storage folder
				console.log('creating directory...');
				await vscode.workspace.fs.createDirectory(context.globalStorageUri)
		}

		const workspaceData = vscode.Uri.joinPath(context.globalStorageUri, 'my-storage-file.json');
		const writeData = new TextEncoder().encode(JSON.stringify({ now: Date.now() }));
		vscode.workspace.fs.writeFile(workspaceData, writeData);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
