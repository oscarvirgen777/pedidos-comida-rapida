import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
// 🚫 No eliminar las líneas de arriba ⬆️

// ✍️ Escribe tu código aquí 👇

// 3. Variables del sistema
let systemName: string = "OscarVirgen's System";
let version: number = 77.7;
let userName: string = "OscarPC";

// 4. Banner de bienvenida
let proximaVersion: number = version + 0.1;

console.log("==================================");
console.log("  " + systemName + "  v" + version);
console.log("  ¡Bienvenido, " + userName + "!");
console.log("  Próxima versión: v" + proximaVersion);
console.log("==================================");

// ==========================================
// TIPO DE DATO
// ==========================================
interface Tarea {
  id: number;
  title: string;
  completed: boolean;
}

let tareas: Tarea[] = [
  { id: 1, title: "Estudiar TypeScript", completed: true },
  { id: 2, title: "Hacer ejercicio", completed: false },
  { id: 3, title: "Leer un libro", completed: false },
];

let nextId: number = 4;

// ==========================================
// NUEVAS FUNCIONES (métodos funcionales)
// ==========================================


const markCompleted = (id: number): void => {
  const tarea = tareas.find((t) => t.id === id);
  if (tarea) {
    tarea.completed = true;
    console.log(`✅ Tarea "${tarea.title}" marcada como completada.`);
  } else {
    console.log(`❌ No se encontró ninguna tarea con id ${id}.`);
  }
};

const filterPending = (): Tarea[] => {
  return tareas.filter((t) => t.completed === false);
};

const filterCompleted = (): Tarea[] => {
  return tareas.filter((t) => t.completed === true);
};

// ==========================================
// listTasks (desestructuración + map + forEach)
// ==========================================
const addTask = (title: string): void => {
  tareas.push({ id: nextId, title: title, completed: false });
  nextId++;
  console.log(`✅ Tarea "${title}" agregada.`);
};

const removeTask = (): void => {
  if (tareas.length === 0) {
    console.log("⚠️ No hay tareas para eliminar.");
    return;
  }
  const eliminada: Tarea = tareas.pop() as Tarea;
  console.log(`🗑️ Tarea eliminada: "${eliminada.title}"`);
};


// ==========================================
// MENÚ
// ==========================================
let salir: boolean = false;

while (!salir) {
  console.log("\n========== MENÚ DE TAREAS ==========");
  console.log("1. Agregar tarea");
  console.log("2. Eliminar última tarea");
  console.log("3. Listar tareas");
  console.log("4. Marcar como completada");
  console.log("5. Ver solo pendientes");
  console.log("6. Ver solo completadas");
  console.log("7. Salir");
  console.log("====================================");


  const listTasks = (): void => {
  if (tareas.length === 0) {
    console.log("📭 No hay tareas registradas.");
    return;
  }

  const tareasFormateadas: string[] = tareas.map((task) => {
    const { id, title, completed } = task;
    const estado = completed ? "completed" : "pending";
    return `[${id}] ${title} - ${estado}`;
  });

  tareasFormateadas.forEach((linea) => {
    console.log(linea);
  });
};   

  const opcion: string = await rl.question("Elige una opción (1-7): ");

  if (opcion === "1") {
    const titulo: string = await rl.question("Título de la tarea: ");
    tareas.push({ id: nextId, title: titulo, completed: false });
    nextId++;
    console.log(`✅ Tarea "${titulo}" agregada.`);
  } else if (opcion === "2") {
    if (tareas.length === 0) {
      console.log("⚠️ No hay tareas para eliminar.");
    } else {
      const eliminada: Tarea = tareas.pop() as Tarea;
      console.log(`🗑️ Tarea eliminada: "${eliminada.title}"`);
    }
// ✅ Debería ser:
} else if (opcion === "3") {
  listTasks();   
/* agregue esto al codigo para que al momento de querer marcar como completada una tarea nos muestre las tareas pendientes que hay y asi ver que tarea estaremos marcando como completadas */

} else if (opcion === "4") {
  const pendientes = filterPending();
  if (pendientes.length === 0) {
    console.log("🎉 No hay tareas pendientes para marcar.");
  } else {
    console.log("\n📋 Tareas pendientes:");
    pendientes.forEach((t) => {
      const { id, title } = t;
      console.log(`  [${id}] ${title}`);
    });
    const idStr: string = await rl.question("Ingresá el id de la tarea a completar: ");
    markCompleted(parseInt(idStr));
  }
  } else if (opcion === "5") {
    const pendientes = filterPending();
    if (pendientes.length === 0) {
      console.log("🎉 No hay tareas pendientes.");
    } else {
      console.log("\n📋 Pendientes:");
      pendientes.forEach((t) => {
        const { id, title } = t;
        console.log(`  [${id}] ❌ ${title}`);
      });
    }
  } else if (opcion === "6") {
    const completadas = filterCompleted();
    if (completadas.length === 0) {
      console.log("No hay tareas completadas.");
    } else {
      console.log("\n📋 Completadas:");
      completadas.forEach((t) => {
        const { id, title } = t;
        console.log(`  [${id}] ✅ ${title}`);
      });
    }
  } else if (opcion === "7") {
    salir = true;
    console.log("Hasta luego");
  } else {
    console.log("❌ Opción inválida. Intenta de nuevo.");
  }
}   
// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();