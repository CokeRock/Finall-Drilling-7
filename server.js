import app from "./models/index.js";
import { sequelize } from "./config/db_bootcamp.js";
import { updateUserById, deleteUserById, getUserWithBootcampsById, POSTUser, getUser, deleteUser, updateUser, addUsersToBootcamps, getUsersForBootcamp, listBootcampsWithUsers, listUsersWithBootcamps } from "./controllers/user.controller.js";
import { POSTbootcamp, GETbootcamp, DELETEbootcamp, PUTbootcamp } from "./controllers/bootcamp.controller.js";
import { users, bootcamps, usersWithBootcamps } from "./config/datosBD.js";
import Bootcamp from "./models/bootcamp.model.js";
import User from "./models/user.model.js";

const insertUsers = async () => {
    try {
        const promises = users.map(user =>
            POSTUser(
                { body: user },
                {
                    json: (message) => console.log(message),
                    send: (message) => console.log(message)
                }
            )
        );
        await Promise.all(promises);
        console.log('Usuarios insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar los usuarios:', error);
    }
};

const POSTCamp = async () => {
    try {
        const promises = bootcamps.map(bootcamp =>
            POSTbootcamp(
                { body: bootcamp },
                {
                    json: (message) => console.log(message),
                    send: (message) => console.log(message),
                    status: (statusCode) => ({ json: (data) => console.log(`Status: ${statusCode}`, data) })
                }
            )
        );
        await Promise.all(promises);
        console.log('BOOTCAMPs insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar los bootcamps:', error);
    }
};

async function main() {
    try {
        await sequelize.sync({ force: true });
        console.log('Conexión establecida correctamente.');

        app.listen(5150, () => console.log('Servidor corriendo en el puerto 5150'));

        await insertUsers();
        await POSTCamp();
        await addUsersToBootcamps(usersWithBootcamps);

        getUsersForBootcamp(2);
        listBootcampsWithUsers();
        getUserWithBootcampsById(1);
        listUsersWithBootcamps(1);
        updateUserById(1, "x", "y");
        deleteUser(2);

    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
}

main();
