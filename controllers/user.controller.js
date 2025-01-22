import User from "../models/user.model.js"
import Bootcamp from "../models/bootcamp.model.js";


export const getUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);

    }
};

export const POSTUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const nuevoUser = await User.create({
            firstName,
            lastName,
            email
        });
        console.log("Se ha creado usuario");
        console.log(nuevoUser);

    } catch (error) {
        console.error("Error al crear usuario:", error);

    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        const user = await User.findByPk(id);
        if (!user) {

        }

        await user.update({ firstName, lastName, email });
        console.log("Usuario actualizado");
        res.send("Usuario actualizado exitosamente");
    } catch (error) {
        console.error("Error al actualizar usuario:", error);

    }
};


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        await user.destroy();
        console.log("Usuario eliminado");
        res.send("Usuario eliminado exitosamente");
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        ;
    }
};

///////////////////////

export async function addUsersToBootcamps(usersWithBootcamps) {
    try {
        for (const userBootcamp of usersWithBootcamps) {
            const { firstName, lastName, title } = userBootcamp;


            const foundUser = await User.findOne({ where: { firstName, lastName } });
            if (!foundUser) {
                console.log(`Usuario con nombre ${firstName} ${lastName} no encontrado.`);
                continue;
            }


            const foundBootcamp = await Bootcamp.findOne({ where: { title } });
            if (!foundBootcamp) {
                console.log(`Bootcamp con título ${title} no encontrado.`);
                continue;
            }


            await foundUser.addBootcamp(foundBootcamp);
            console.log(`***************************
Agregado el usuario id=${foundUser.id} al bootcamp con id=${foundBootcamp.id}
***************************`);
        }
    } catch (error) {
        console.error('Error al agregar usuarios a los bootcamps:', error);
    }
}

export async function getUsersForBootcamp(bootcampId) {
    try {
        const bootcampWithUsers = await Bootcamp.findByPk(bootcampId, {
            include: {
                model: User,
                through: { attributes: [] },
            },
        });

        if (bootcampWithUsers) {
            console.log(`Usuarios para el Bootcamp ${bootcampWithUsers.title}:`);
            console.log(JSON.stringify(bootcampWithUsers.Users, null, 2));
        } else {
            console.log(`Bootcamp con ID ${bootcampId} no encontrado.`);
        }
    } catch (error) {
        console.error('Error al obtener usuarios para el Bootcamp:', error);
    }
}

export async function listBootcampsWithUsers() {
    try {
        const bootcamps = await Bootcamp.findAll({
            include: {
                model: User,
                through: { attributes: [] }
            }
        });
        console.log(JSON.stringify(bootcamps, null, 2));
    } catch (error) {
        console.error('Error al listar los bootcamps con usuarios:', error);
    }
}

export async function getUserWithBootcampsById(userId) {
    try {
        const user = await User.findByPk(userId, {
            include: {
                model: Bootcamp,
                through: { attributes: [] }
            }
        });
        if (user) {
            console.log(JSON.stringify(user, null, 2));
        } else {
            console.log(`Usuario con ID ${userId} no encontrado.`);
        }
    } catch (error) {
        console.error('Error al consultar el usuario por ID:', error);
    }
}

export async function listUsersWithBootcamps() {
    try {
        const users = await User.findAll({
            include: {
                model: Bootcamp,
                through: { attributes: [] }
            }
        });
        console.log(JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error al listar los usuarios con bootcamps:', error);
    }
}

export async function updateUserById(userId, newFirstName, newLastName) {
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.update({ firstName: newFirstName, lastName: newLastName });
            console.log(`Usuario actualizado: ${JSON.stringify(user, null, 2)}`);
        } else {
            console.log(`Usuario con ID ${userId} no encontrado.`);
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    }
}

export async function deleteUserById(userId) {
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.destroy();
            console.log(`Usuario con ID ${userId} eliminado.`);
        } else {
            console.log(`Usuario con ID ${userId} no encontrado.`);
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }
}