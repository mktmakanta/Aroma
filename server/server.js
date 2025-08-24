const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.MONGODB_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

async function connectDB() {
  try {
    await mongoose.connect(DB);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ Connection or Save error:', err.message);
    process.exit(1);
  }
}
connectDB();

// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AROMA Server running on port 🏪 ${PORT}`));
