'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Name is required!'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.DOUBLE,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Price is required!'
        },
        min: {
          args: [0],
          msg: 'Price must equal or greater than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Stock is required!'
        },
        min: {
          args: [0],
          msg: 'Stock must equal or greater than 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    hooks: {
      beforeCreate(value, option) {
        if (!value.image_url) {
          value.image_url = 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg'
        }
      }
    }
  });
  return Product;
};