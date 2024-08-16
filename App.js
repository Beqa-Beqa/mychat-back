// Requirements with immediate invocation
require("dotenv").config();
require("./Db/connect")();

// Express main handlers
const express = require("express");
const app = express();

// Helmet security and cors import
const helmet = require("helmet");
const cors = require("cors");

// Routes
const routes = require("./Routes");

app.use(helmet());
app.use(cors());
app.use(express.json());

// Using routes
app.use(routes.registerRoute);

// Port definition and listening to aplication requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});