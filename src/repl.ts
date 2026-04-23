
import {commandExit} from "./command_exit.js";
import {commandHelp} from "./command_help.js";
import type { CLICommand} from "./command.ts";
import type { State } from "./state.ts"

export function cleanInput(input: string): string[] {
	return input.trim().toLowerCase().split(/\s+/);
};


export function startREPL(state: State) {
	const rl = state.rl;

	rl.prompt();
	
	rl.on("line", (line) => {
		let words = cleanInput(line)
		if (words.length === 0) {
			rl.prompt();
			return;
		}
		const command = words[0];
		//console.log(`Your command was: ${command}`);

		const commands = state.commands;
		const comObj = commands[command];
		if (!comObj) {
			console.log("Unknown command");
			rl.prompt();
			return;
		}
		try {
			comObj.callback(state);
		} catch (err) {
			console.log(err);
		}
		rl.prompt();
	})
};





