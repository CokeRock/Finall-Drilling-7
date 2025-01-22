import Sequelize from "sequelize"

export const sequelize = new Sequelize('MODULO7', 'postgres', '5150', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
})
