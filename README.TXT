1.Para iniciar el Programa hay que crear la base de datos con el nombre "MODULO7".
2.Ir a la carpeta config, abrir el archivo bootcamp.js y reemplazar 'tu clave postgres' por clave personal.

import Sequelize from "sequelize"

export const sequelize = new Sequelize('MODULO7', 'postgres', 'tu clave postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
})

3. Abrir terminal en MODULO7 y ejecutar "npm run dev".
