const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

require("./routes/user.routes.js")(app);
require("./routes/patient.routes.js")(app);
require("./routes/admin.routes.js")(app);
require("./routes/attention.routes.js")(app);
require("./routes/training.routes.js")(app);
require("./routes/reward.routes.js")(app);
require("./routes/rewardPurchase.routes.js")(app);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

const db = require("./models");
db.sequelize.sync();