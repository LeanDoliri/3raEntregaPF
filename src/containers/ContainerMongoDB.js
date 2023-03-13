import mongoose from "mongoose";
import config from "../config.js";
import { logError } from "../logs/winston.js";

mongoose.set("strictQuery", false);

await mongoose.connect(config.mongoRemote.cnxStr, config.mongoRemote.options);

class ContainerMongoDB {
  constructor(model) {
    this.coleccion = model;
  }

  async getById(id) {
    try {
      const elem = await this.coleccion.find({ _id: id });
      return elem;
    } catch (error) {
      logError(error);
    }
  }

  async getAll() {
    try {
      const elementos = await this.coleccion.find({});
      return elementos;
    } catch (error) {
      logError(error);
    }
  }

  async save(elem) {
    try {
      const elemSave = new this.coleccion(elem);
      const savedElem = await elemSave.save();
      return savedElem;
    } catch (error) {
      logError(error);
    }
  }

  async update(newElem) {
    try {
      await this.coleccion.deleteOne(newElem._id);
      const newElemSave = new this.coleccion(newElem);
      const savedNewElem = await newElemSave.save();
      return savedNewElem;
    } catch (error) {
      logError(error);
    }
  }

  async delete(id) {
    try {
      await this.coleccion.deleteOne({ _id: id });
      const elementos = await this.coleccion.find({});
      return elementos;
    } catch (error) {
      logError(error);
    }
  }

  async delete() {
    try {
      await this.coleccion.deleteMany({});
      const elementos = await this.coleccion.find({});
      return elementos;
    } catch (error) {
      logError(error);
    }
  }
}

export default ContainerMongoDB;
