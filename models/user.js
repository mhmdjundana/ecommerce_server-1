'use strict';

const { hashPassword } = require('../helpers/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Email is required!'
        },
        isEmail: {
          msg: 'Input must valid email format!'
        }
      },
      unique: {
        args: true,
        msg: 'Email already used'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Password is required!'
        },
        len: {
          args: [[6, 40]],
          msg: 'Password length between 6 to 40'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(val) {
        val.password = hashPassword(val.password)
        val.role = val.role === 'admin' ? 'admin' : 'customer'
      }
    }
  });
  return User;
};