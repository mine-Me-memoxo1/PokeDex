import {State} from "./state.js";
import type {Pokemon} from "./pokeapi.ts";

export async function commandCatch(state: State, ...args: string[]) {
	if (state.PokeDex.has(args[0])) {
		console.log(`${args[0]} has already been caught!`)
		return;
	}
	console.log(`Throwing a Pokeball at ${args[0]}...`);
	try {
		const url = `https://pokeapi.co/api/v2/pokemon/${args[0]}`; 
		const resp = await fetch(url,{
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json"
			},
		});
		if (!resp.ok) {
			throw new Error(`${resp.status} ${resp.statusText}`);
		}
		const data = await resp.json();
		const max_experience = 608;
		const threshold = data.base_experience/max_experience;
		const prob = Math.random();
		if (prob > threshold) {
			console.log(`${args[0]} was caught!`);
		}
		else {
			console.log(`${args[0]} escaped!`);
		}
		const name: string = `${args[0]}`
		state.PokeDex.set(name, data);
		return;
	} catch (err) {
		throw new Error(`Error catching pokemon: ${(err as Error).message}`);
	}
}




