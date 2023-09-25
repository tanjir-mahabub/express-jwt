const mongoose = require('mongoose');

const db = async (dbURI) => {
    try {
        const con = await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log(`mongodb connected: ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = db;