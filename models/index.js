import express from 'express';
import { sequelize } from '../config/db_bootcamp.js';
import User from './user.model.js';
import Bootcamp from './bootcamp.model.js';


const app = express();
app.use(express.json());

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Tablas sincronizadas correctamente.');
    } catch (error) {
        console.error('Error al sincronizar las tablas:', error);
    }
})();

export default app;
