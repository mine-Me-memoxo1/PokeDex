import {createInterface, type Interface} from "readline";
import {commandHelp} from "./command_help.js";
import {commandExit} from "./command_exit.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import {PokeAPI} from "./pokeapi.js"

export type State = {
	rl: Interface,
	commands: Record<string, CLICommand>,
	pokeAPI: PokeAPI,
	nextLocationsURL: string|null,
	prevLocationsURL: string|null,
}


export type CLICommand = {
	name: string,
	description: string,
	callback: (state: State) => Promise<void>
}


export async function initState(): Promise<State> {
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
		map: {
			name: "map",
			description: "Displays the next 20 locations",
			callback: commandMap
		},
		mapb: {
			name: "mapb",
			description: "Displays the previous 20 locations",
			callback: commandMapb,
		}
	}

	const pokeapi = new PokeAPI();
	const shallowLocations = await pokeapi.fetchLocations();

	return {
		rl,
		commands,
		pokeAPI: pokeapi,
		nextLocationsURL: null,
		prevLocationsURL: null,
	}
}
