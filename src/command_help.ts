import type {State} from "./state.ts";

export function commandHelp(state: State) {
	console.log(`Welcome to the Pokedex!\nUsage:\n\n`);
	const commands = state.commands;
	for (let command in commands) {
		console.log(`${commands[command].name}: ${commands[command].description}`)
	}
}
