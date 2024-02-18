/* eslint-disable array-callback-return */
import { intro, outro, select, text, confirm } from '@clack/prompts';
import pc from 'picocolors';

/* import { readFile } from 'fs/promises';
const facturas = JSON.parse(
  await readFile(new URL('./facturas.json', import.meta.url))
); */
const year2023 = [
  { mes: 'enero', potencia: 5.75, consumo: 100 },
  { mes: 'febrero', potencia: 5.75, consumo: 50 }
];

intro(pc.green('Bienvenido!!!'));
const opciones = await select({
  message: pc.blue('Selecciona una opción:'),
  options: [
    { value: 'consumo', label: 'Introduce el consumo del mes en Kw' },
    { value: 'potencia', label: 'Modifica la potencia' },
    {
      value: 'datos',
      label: 'Consulta facturas anteriores',
      hint: 'oh no'
    }
  ]
});
if (opciones === 'consumo') {
  let confirmacion = false;
  let addconsumo;
  while (confirmacion === false) {
    addconsumo = await text({
      message: 'Añade el consumo del mes en Kw:',
      initialValue: '',
      validate(value) {
        if (value.length === 0) return 'Value is required!';
      }
    });
    confirmacion = await confirm({
      message: 'Estas seguro?'
    });
  }
  console.log(`-> Tu consumo ha sido de ${addconsumo} Kw`);
}

if (opciones === 'potencia') {
  console.log('Introduce la potencia');
}

if (opciones === 'datos') {
  const selectMes = await select({
    message: pc.blue('Selecciona un mes:'),
    options: Object.entries(year2023).map(([key, value]) => ({
      value: value.mes,
      label: ` ${value.mes.padEnd(6, ' ')} · ${value.consumo} Kw`
    }))
  });

  const [mesFiltrado] = year2023.filter((item) => {
    if (item.mes === selectMes) {
      return item;
    }
  });
  const impuestos = 5 % mesFiltrado.consumo;
  const precioPotencia = 0.09 * 30;
  const potencia = 5.75;

  const totalAPagar =
    mesFiltrado.potencia * precioPotencia + mesFiltrado.consumo + impuestos;

  outro(
    pc.yellow(
      `-> La factura del mes de ${selectMes} asciende a:` +
        pc.red(` ${totalAPagar.toFixed(2)} €`)
    )
  );
}
outro(pc.green('Gracias por usarme!!'));
