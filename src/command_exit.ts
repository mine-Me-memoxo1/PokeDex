import type { State } from "./state.ts";

export async function commandExit(state: State) {
	console.log("Closing the Pokedex... Goodbye!");
	state.rl.close();
	process.exit(0);
	return;
}
