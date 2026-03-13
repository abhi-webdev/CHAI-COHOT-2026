import app from "./app.js";
import connectDb from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
const port = process.env.PORT || 8000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listining on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
