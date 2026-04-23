// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { type State, initState } from "./state.js";

function main() {
  const state = initState();
  startREPL(state);
}

main();
