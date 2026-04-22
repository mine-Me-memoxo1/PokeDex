import { createInterface } from "readline";

export function cleanInput(input: string): string[] {
	return input.trim().toLowerCase().split(/\s+/);
}


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
		console.log(`Your command was: ${words[0]}`);
		rl.prompt();
	})
}
