import { createInterface } from "readline";
import {commandExit} from "./command_exit.js";
import {commandHelp} from "./command_help.js";
import type { CLICommand} from "./command.ts";

export function cleanInput(input: string): string[] {
	return input.trim().toLowerCase().split(/\s+/);
};


export function startREPL() {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: `PokeDex > `
	});

	rl.prompt();
	
	rl.on("line", (line) => {
		let words = cleanInput(line)
		if (words.length === 0) {
			rl.prompt();
			return;
		}
		const command = words[0];
		//console.log(`Your command was: ${command}`);

		const commands = getCommands();
		const comObj = commands[command];
		if (!comObj) {
			console.log("Unknown command");
			rl.prompt();
			return;
		}
		try {
			comObj.callback(commands);
		} catch (err) {
			console.log(err);
		}
		rl.prompt();
	})
};



export function getCommands(): Record<string, CLICommand> {
	return {
		help: {
			name: "help",
			description: "Displays a help message",
			callback: commandHelp
		},
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit
		},
		
	}
};

