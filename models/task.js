const { DataTypes } = require('sequelize')
const sequelize = require('../util/sequelize')

const TodoItem = sequelize.define('TodoItem', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
    }
});

TodoItem.sync()
.then(() => {
    console.log('TodoItem model synced with the database.')
})
.catch((error) => {
    console.error('Error syncing TodoItem model:', error)
});


module.exports = TodoItem