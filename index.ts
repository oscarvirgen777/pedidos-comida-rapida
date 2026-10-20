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


let tareas: string[] = [];

// 4 y 5. Menú interactivo con ciclo
let salir: boolean = false;

while (!salir) {
  console.log("\n========== MENÚ DE TAREAS ==========");
  console.log("1. Agregar tarea");
  console.log("2. Eliminar última tarea");
  console.log("3. Listar tareas");
  console.log("4. Salir");
  console.log("====================================");

  const opcion: string = await rl.question("Elige una opción (1-4): ");

  if (opcion === "1") {
    const titulo: string = await rl.question("Título de la tarea: ");
    tareas.push(titulo);
    console.log(`✅ Tarea "${titulo}" agregada.`);
  } else if (opcion === "2") {
    if (tareas.length === 0) {
      console.log("⚠️ No hay tareas para eliminar.");
    } else {
      const eliminada: string = tareas.pop() as string;
      console.log(`🗑️ Tarea eliminada: "${eliminada}"`);
    }
  } else if (opcion === "3") {
    if (tareas.length === 0) {
      console.log("📭 No hay tareas registradas.");
    } else {
      console.log("\n📋 Tareas:");
      for (let i = 0; i < tareas.length; i++) {
        console.log(`  ${i + 1}. ${tareas[i]}`);
      }
    }
  } else if (opcion === "4") {
    salir = true;
    console.log("Hasta luego");
  } else {
    console.log("❌ Opción inválida. Intenta de nuevo.");
  }
}
// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();