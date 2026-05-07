import type {State} from "./state.js";

export async function commandPokeDex(state: State, ...args: string[]) {
	if (state.PokeDex.size === 0) {
		console.log("You have not caught any pokemon. Catch pokemon to see what pokemon you have in your PokeDex");
		return;
	}
	console.log("Your Pokedex:");
	for (let key of state.PokeDex.keys()) {
		console.log(` -${key}`);
	}
	return;
}
