import Bootcamp from "../models/bootcamp.model.js";

// Crear un nuevo Bootcamp
export const POSTbootcamp = async (req, res) => {
    try {
        const { title, cue, description } = req.body;
        const nuevoBootcamp = await Bootcamp.create({ title, cue, description });
        console.log("Se ha creado el Bootcamp");
        console.log(nuevoBootcamp);
        res.status(201).json(nuevoBootcamp);
    } catch (error) {
        console.error('Error al crear el Bootcamp:', error);
        res.status(500).send('Error al crear el Bootcamp');
    }
};

// Obtener todos los Bootcamps
export const GETbootcamps = async (req, res) => {
    try {
        const bootcamps = await Bootcamp.findAll();
        res.json(bootcamps);
    } catch (error) {
        console.error('Error al obtener los Bootcamps:', error);
        res.status(500).send('Error al obtener los Bootcamps');
    }
};

// Obtener un Bootcamp por ID
export const GETbootcamp = async (req, res) => {
    try {
        const { id } = req.params;
        const bootcamp = await Bootcamp.findByPk(id);
        if (bootcamp) {
            res.json(bootcamp);
        } else {
            res.status(404).send('Bootcamp no encontrado');
        }
    } catch (error) {
        console.error('Error al obtener el Bootcamp:', error);
        res.status(500).send('Error al obtener el Bootcamp');
    }
};

// Actualizar un Bootcamp por ID
export const PUTbootcamp = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, cue, description } = req.body;
        const bootcamp = await Bootcamp.findByPk(id);
        if (bootcamp) {
            bootcamp.title = title;
            bootcamp.cue = cue;
            bootcamp.description = description;
            await bootcamp.save();
            res.json(bootcamp);
        } else {
            res.status(404).send('Bootcamp no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar el Bootcamp:', error);
        res.status(500).send('Error al actualizar el Bootcamp');
    }
};

// Eliminar un Bootcamp por ID
export const DELETEbootcamp = async (req, res) => {
    try {
        const { id } = req.params;
        const bootcamp = await Bootcamp.findByPk(id);
        if (bootcamp) {
            await bootcamp.destroy();
            res.send('Bootcamp eliminado correctamente');
        } else {
            res.status(404).send('Bootcamp no encontrado');
        }
    } catch (error) {
        console.error('Error al eliminar el Bootcamp:', error);
        res.status(500).send('Error al eliminar el Bootcamp');
    }
};
