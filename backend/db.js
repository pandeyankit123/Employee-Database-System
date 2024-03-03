const mongoose = require('mongoose');
const uri='mongodb://127.0.0.1:27017/employee';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
