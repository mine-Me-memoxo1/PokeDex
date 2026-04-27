
import {commandExit} from "./command_exit.js";
import {commandHelp} from "./command_help.js";
import type { CLICommand} from "./command.js";
import type { State } from "./state.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";


export function cleanInput(input: string): string[] {
	return input.trim().toLowerCase().split(/\s+/);
};


export async function startREPL(state: State) {
	const rl = state.rl;

	rl.prompt();
	
	rl.on("line", async (line) => {
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
			const resp = await comObj.callback(state);
		} catch (err) {
			console.log(err);
		}
		console.log(state.nextLocationsURL);
		console.log(state.prevLocationsURL);
		rl.prompt();
	})
};





