import mongoose from 'mongoose';
let MONGO_URI = process.env.MONGO_URI;
let MONGO_DB = process.env.MONGO_DB;

const connection = {};

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("failed to disconnect");
      return;
    }
  }
};

const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if (connection.isConnected === 1) return;
      await mongoose.disconnect();
      // (property) Connection.readyState: number Connection ready state | 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    };
    const db = await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndMinify: false,
      // useUnifiedTopology: true
    });
    console.log("MongoDB Connected....")
    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
const db = { connectToDB, disconnect };
export default db;
/*
'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
module.exports = (config) => {
  if (process.env.NODE_ENV === 'development')
  mongoose.set('debug', true);
  
  let options = { keepAlive: 300000 };
  if (process.env.NODE_ENV === 'production') {
    options = {
      server: { poolSize: 100, socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
      replset: { poolSize: 100, socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
    };
    console.log('Connecting to mongo with options', options);
  }
  
  options['useMongoClient'] = true;
  mongoose.connect(config.db, options, (err) => {
    if (err) console.log('[1]MongoDB connect Error:', err);
  });
  // first conn
  mongoose.connection.on('connected', function () {
    console.log('[1]Mongoose connection open to ' + config.db.split('/').pop());
  });
  
  mongoose.connection.once('open', () => {
    console.log('[1]Connected to mongodb!');
  });
  
  mongoose.connection.on('error', function (err) {
    console.error('[1]Mongoose default error: ' + err);
  });
  
  mongoose.connection.on('disconnected', function () {
    console.log('[1]Mongoose default connection disconnected');
  });
  
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('[1]Mongoose default connection disconnected through app termination');
    });
  });
};
*/