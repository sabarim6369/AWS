const mongoose = require('mongoose');
const telecallerSchema = require('../schema/telecallerschema'); 
const adminSchema = require('../schema/Adminschema'); 
const superadminSchema = require('../schema/superadmin'); 
const leadSchema = require('../schema/leadschema');

const connectionCache = {};
exports.getDatabaseConnection = (databaseName) => {
    if (connectionCache[databaseName]) {
        if (connectionCache[databaseName].readyState === 1) {
            console.log('Reusing the existing connection');
            return connectionCache[databaseName];
        } else {
            console.log('Recreating the connection');
            delete connectionCache[databaseName];
        }
    }
console.log(databaseName)
    const dbLink = process.env.MONGODB_URI.replace('<Database>', databaseName);
    console.log(dbLink)
    const connection = mongoose.createConnection(dbLink);

    connection.on('connected', () => {
        console.log(`Successfully connected to ${databaseName}`);
    });

    connection.on('disconnected', () => {
        console.log(`Connection to ${databaseName} lost. Reconnecting...`);
        connectionCache[databaseName] = mongoose.createConnection(dbLink);
    });

    connection.on('error', (err) => {
        console.error(`Error connecting to ${databaseName}:`, err);
        connectionCache[databaseName] = null;
    });

    if (databaseName.startsWith('admin_')) {
        const Telecaller = connection.model('Telecaller', telecallerSchema);
        const Lead = connection.model('Lead', leadSchema);
    } else {
        const Admin = connection.model('Admin', adminSchema);
        const Lead = connection.model('Lead', leadSchema);

        const superadmin=connection.model("Superadmin",superadminSchema)
    }

    connectionCache[databaseName] = connection;

    return connection;
};


exports.getTelecallerModel = (db) => db.model('Telecaller', telecallerSchema);

exports.getAdminModel = (db) => db.model('Admin', adminSchema);

exports.getSuperadminModel = (db) => db.model('Superadmin', superadminSchema);
exports.getleadModel=(db)=>db.model("Lead",leadSchema)