import { DataTypes } from "sequelize";
import { sequelize } from "../config/db_bootcamp.js";
import Bootcamp from "./bootcamp.model.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true,
    tableName: 'users'
});

Bootcamp.belongsToMany(User, {
    through: 'user_bootcamp',
    foreignKey: 'bootcamp_id'
});
User.belongsToMany(Bootcamp, {
    through: 'user_bootcamp',
    foreignKey: 'user_id'
});
export default User;
