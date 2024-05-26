// server.js

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const db = require('./config/db');
const AdItemRoutes = require("./routes/AdItemRoute");
const AdvertiserRoutes = require("./routes/AdvertiserRoute");
const PublisherRoutes = require("./routes/PublisherRoute");
const AdSenseRoutes = require("./routes/AdServeRoute");
const CampaignRoutes = require("./routes/CampaignRoute");
const CampaignAssignmentRoutes = require("./routes/CampaignAssignment");
const PlacementRoutes = require("./routes/PlacementRoute");
const WebsiteRoutes = require("./routes/WebsiteRoute");
const ReportRoutes = require("./routes/ReportRoute");
const AuthRoutes = require("./routes/AuthRoute");
const BidRoutes = require("./routes/BiddingRoute");
const notificationRoutes = require('./routes/NotificationRoute');
// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all requests
app.use(cors());

// Mount the routes
app.use("/api/aditem", AdItemRoutes);
app.use("/api/adserve", AdSenseRoutes);
app.use("/api/advertiser", AdvertiserRoutes);
app.use("/api/campaign", CampaignRoutes);
app.use("/api/campaignassignment", CampaignAssignmentRoutes);
app.use("/api/placement", PlacementRoutes);
app.use("/api/publisher", PublisherRoutes);
app.use("/api/websites", WebsiteRoutes);
app.use("/api/report", ReportRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/bid", BidRoutes);
app.use('/api/notification', notificationRoutes);

// Middleware to enable CORS
// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', function (req, res) {
  res.send('Hello this is Ads X Server');
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})