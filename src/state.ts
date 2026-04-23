import {createInterface, type Interface} from "readline";
import {commandHelp} from "./command_help.js";
import {commandExit} from "./command_exit.js";

export type State = {
	rl: Interface,
	commands: Record<string, CLICommand>
}


export type CLICommand = {
	name: string,
	description: string,
	callback: (state: State) => void
}


export function initState() {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "PokeDex > ",
	});

	const commands = {
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

	return {
		rl,
		commands
	}
}
