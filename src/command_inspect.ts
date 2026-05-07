import {State} from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
	const name: string = args[0];
	if (!state.PokeDex.has(name)) {
		console.log(`you have not caught that pokemon`);
		return;
	}
	
	const pokeData = state.PokeDex.get(name) as any;
	if (!pokeData) {console.log(`No Data for pokemon`); return;}
	const weight = pokeData.weight;
	const height = pokeData.height;
	const Stats = pokeData.stats; // returns array of objects. Access stats of object via object.stat.name and base_stat via object.base_stat
	const types = pokeData.types //returns array of objects. Acces type name via object.type.name

	console.log(`Name: ${args[0]}`);
	console.log(`Height: ${height}`);
	console.log(`Weight: ${weight}`);

	for (let stat of Stats) {
		console.log(` -${stat.stat.name}: ${stat.base_stat}`);
	}
	
	console.log("Types:")
	for (let type of types) {
		console.log(`- ${type.type.name}`)
	}
	return;
}
 
