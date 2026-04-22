import { createInterface } from "readline";
import {commandExit} from "./command_exit.js";

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
		console.log(`Your command was: ${command}`);
		/*const commands = getCommands();
		try {
			commands[command].callback(commands);
		} catch (err) {
			console.log("Unknown command");
		}
		*/
		rl.prompt();
	})
};



export type CLICommand = {
	name: string,
	description: string;
	callback: (commands: Record<string, CLICommand>) => void;
};

export function getCommands(): Record<string, CLICommand> {
	return {
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit
		}
	}
};

