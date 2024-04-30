const Advertiser = require('../models/Advertiser');
const Publisher = require('../models/Publisher');
const CampaignAssignment = require('../models/CampaignAssignment');
const Placement = require('../models/Placement');
const Campaign = require('../models/Campaign');
const Website = require('../models/Website');
const Bid = require('../models/Bid');

// Objective Clarity: The publisher aims for the highest total budget, clicks, and impression cost in the campaign, whereas the advertiser seeks the highest views per website.

//     Publisher's Bid Process:
// The publisher bids based on the views of the website, providing the website and its placement.
// Each bid consists of the campaign being bid for, the websites and their placements, and the publisher's information.

// Bid temporary collection:
// Each bid contains data on the campaign, the website, and the placement and the publisher.

// Bid Selection:
// The bid logic selects the best of four bids for the campaign.
// These bids are stored temporarily in a collection named "bid".
// the algorithm chooses the winning bid from the temporary bid collection.
// The website with the highest views wins the campaign.
// The data from the winning bid is used to create a new "CampaignAssignment" collection.

// Bid Waiting Period:
// The bid algorithm waits for at least four bids before making a selection.
// The publisher can bid up to four times but cannot bid with the same websites they've already bid on.
// Four bids are placed per campaign before the algorithm chooses the winning bid from the temporary bid collection.



// Bid Requirements:
// When placing a bid, the campaign ID, website ID, and placement ID are required.

// every time a request i sent for the same campaign it one bid for that campaign and each campaign need 4 bids, before choosing the wing bid.



exports.bidding = async (req, res) => {

}