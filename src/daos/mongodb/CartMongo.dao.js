import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import {ticketModel} from "./models/ticket.model.js";
import config from "../../config.js";

export default class CartsDAO {

  // MONGOOSE
  connection = mongoose.connect( config.MONGO_URL );

  async createCart() {
    let response = {};
    try {
      const result = await cartModel.create({
        products: [],
        tickets: []
      });
      response.status = "success";
      response.result = result;
    } catch (error) {
      response.status = "error";
      response.message = "Error al crear el carrito - DAO: " + error.message;
    }
    return response;
  };

  async getCartById(cid) {
    let response = {};
    try {
      const result = await cartModel.findOne({
        _id: cid
      }).populate(['products.product', 'tickets.ticketsRef']);
      response.status = "success";
      response.result = result;
    } catch (error) {
      response.status = "error";
      response.message = "Error al obtener el carrito por ID - DAO: " + error.message;
    }
    return response;
  };

  async getAllCarts() {
    let response = {};
    try {
      const result = await cartModel.find();
      response.status = "success";
      response.result = result;
    } catch (error) {
      response.status = "error";
      response.message = "Error al obtener todos los carritos - DAO: " + error.message;
    }
    return response;
  };

  async addProductToCart(cart, product, quantity) {
    let response = {};
    try {
      const productID = product._id.toString();
      const existingProductIndex = cart.products.findIndex(p => p.product._id.toString() === productID);
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += parseInt(quantity, 10);
      } else {
        cart.products.push({
          product: product,
          quantity: quantity
        });
      }
      await cart.save();
      response.status = "success";
      response.result = cart;
    } catch (error) {
      response.status = "error";
      response.message = "Error al agregar el producto al carrito - DAO: " + error.message;
    }
    return response;
  };


  async addTicketToCart(cid, ticketID) {
    try {
      const cart = await this.getCartById(cid);
      const existingTicketIndex = cart.tickets.findIndex(t => t.ticketsRef.toString() === ticketID);
      if (existingTicketIndex === -1) {
        cart.tickets.push({
          ticketsRef: ticketID
        });
        await cart.save();
      }
      return cart;
    } catch (error) {
      throw new Error("Error al agregar el ticket al carrito - DAO. Original error: " + error.message);
    }
  };

  async deleteProductFromCart(cid, pid) {
    try {
      const cart = await this.getCartById(cid);
      const product = cart.products.find((p) => p._id.toString() === pid);
      if (!product) {
        return {
          status: 'error',
        };
      } else {
        cart.products.pull(pid);
        await cart.save();
        return {
          status: 'success',
        };
      }
    } catch (error) {
      throw new Error("Error al borrar el producto en carrito - DAO. Original error: " + error.message);
    }
  };

  async updateProductInCart(cid, pid, updatedProdInCart) {
    try {
      const cart = await this.getCartById(cid);
      const product = cart.products.find((p) => p._id.toString() === pid);
      if (!product) {
        throw new Error(`No se encontró ningún producto con el ID ${pid} en el carrito.`);
      }
      product.quantity = updatedProdInCart.quantity;
      await cart.save();
      return {
        cart
      };
    } catch (error) {
      throw new Error("Error al actualizar producto en carrito - DAO. Original error: " + error.message);
    }
  };

  async deleteAllProductsFromCart(cid) {
    try {
      const cart = await this.getCartById(cid);
      if (cart) {
        cart.products = [];
        await cart.save();
        return {
          status: 'success'
        };
      } else {
        return {
          status: 'error',
        };
      }
    } catch (error) {
      throw new Error("Error al borrar todos los productos en carrito - DAO. Original error: " + error.message);
    }
  };

  async updateCart(cid, updatedCartFields) {
    try {
      let result = await cartModel.updateOne({
        _id: cid
      }, {
        $set: updatedCartFields
      });
      return result;
    } catch (error) {
      throw new Error("Error al actualizar el carrito - DAO. Original error: " + error.message);
    }
  };
}