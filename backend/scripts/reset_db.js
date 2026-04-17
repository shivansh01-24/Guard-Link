const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function resetDB() {
    try {
        console.log('Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log('Dropping database...');
        await mongoose.connection.db.dropDatabase();
        
        console.log('Database cleared successfully! You can now start with fresh data.');
        process.exit(0);
    } catch (error) {
        console.error('Error clearing database:', error);
        process.exit(1);
    }
}

resetDB();
