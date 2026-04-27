import {PokeAPI} from "./pokeapi.js";
import type {ShallowLocations} from "./pokeapi.js";
import type {State} from "./state.js";

export async function commandMap(state: State): Promise<void> {
	const nextLocations = await state.pokeAPI.fetchLocations(state.nextLocationsURL) as ShallowLocations;
	state.nextLocationsURL = nextLocations.next;
	state.prevLocationsURL = nextLocations.prev;
	for (let loc of nextLocations.results) {
		console.log(loc.name);
	}
	return;
}
