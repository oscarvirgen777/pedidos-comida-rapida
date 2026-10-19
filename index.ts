import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
// 🚫 No eliminar las líneas de arriba ⬆️

// ✍️ Escribe tu código aquí 👇

// 3. Variables del sistema
let systemName: string = "OscarVirgen's System";
let version: number = 77.7;
let userName: string = "OscarPC";

// 4. Banner de bienvenida (concatenación + operación aritmética)
let proximaVersion: number = version + 0.1;

console.log("==================================");
console.log("  " + systemName + "  v" + version);
console.log("  ¡Bienvenido, " + userName + "!");
console.log("  Próxima versión: v" + proximaVersion);
console.log("==================================");

// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();