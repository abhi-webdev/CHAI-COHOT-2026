import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/common/config/db.js';

const PORT = process.env.PORT;

const start = async () => {
  // connect to Database
  await connectDB();
  app.listen(PORT, () => {
    console.log(
      `Server is listining on port ${PORT} in ${process.env.NODE_ENV} mode`,
    );
  });
};

start().catch((err) => {
  console.log('Failed to start Server', err);
  process.exit(1);
  
});
