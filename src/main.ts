// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { type State, initState } from "./state.js";

async function main() {
  const state = await initState();
  startREPL(state);
}

main();
