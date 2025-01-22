import { DataTypes } from "sequelize";
import { sequelize } from "../config/db_bootcamp.js";

const Bootcamp = sequelize.define('Bootcamp', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'bootcamps'
});

export default Bootcamp;
