const mongoose = require('mongoose');
require('dotenv').config();

// You don't have write this function at all.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    //   Exit process with failure
    process.exit(1);
  }
};

connectDB();

// You don't really need to export this function.