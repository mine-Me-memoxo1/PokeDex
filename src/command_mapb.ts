import {PokeAPI} from "./pokeapi.js";
import type {ShallowLocations, Location} from "./pokeapi.js";
import type {State} from "./state.js";

export async function commandMapb(state: State): Promise<void> {
	if (!state.prevLocationsURL) {
		throw new Error("We're on the first page!");
	}
	const nextLocations = await state.pokeAPI.fetchLocations(state.prevLocationsURL) as ShallowLocations;
	state.nextLocationsURL = nextLocations.next;
	state.prevLocationsURL = nextLocations.previous;
	for (let loc of nextLocations.results) {
		console.log(loc.name);
	}
	return;
}
