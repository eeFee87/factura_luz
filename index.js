import { intro, outro, select, text, confirm } from '@clack/prompts';
import pc from 'picocolors';
//import data from './facturas.json' assert { type: 'json', integrity: 'sha384-ABC123' };
import { readFile } from 'fs/promises';
const facturas = JSON.parse(
  await readFile(new URL('./facturas.json', import.meta.url))
);
console.log(facturas.abril);
intro(pc.green(`Bienvenido!!!`));
const opciones = await select({
  message: pc.blue('Selecciona una opción:'),
  options: [
    { value: 'consumo', label: 'Introduce el consumo del mes en Kw' },
    { value: 'potencia', label: 'Modifica la potencia' },
    {
      value: 'datos',
      label: 'Consulta facturas anteriores',
      hint: 'oh no',
    },
  ],
});
if (opciones === 'consumo') {
  const addconsumo = await text({
    message: 'Añade el consumo del mes en Kw:',
    initialValue: '',
    validate(value) {
      if (value.length === 0) return `Value is required!`;
    },
  });
  const confirmacion = await confirm({
    message: 'Estas seguro?',
  });
  if (confirmacion === true) {
    console.log(`Tu consumo ha sido de ${addconsumo} Kw`);
  }
}

if (opciones === 'potencia') {
  console.log('Introduce la potencia');
}

if (opciones === 'datos') {
  console.log('Aqui te muestro las facturas anteriores');
}

outro(`Gracias por utilizarme`);

/*options: Object.entries(facturas).map(([key, value]) => ({
    value: key,
    label: ` ${key.padEnd(8, ' ')} · ${value.consumo} Kw`,
  })),*/
