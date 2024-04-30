const Advertiser = require('../models/Advertiser');
const Publisher = require('../models/Publisher');
const CampaignAssignment = require('../models/CampaignAssignment');
const Placement = require('../models/Placement');
const Campaign = require('../models/Campaign');
const Website = require('../models/Website');
const Bid = require('../models/Bid');

// The publisher is bidding for the highest total budget and higest clicks and impression cost, while the advertiser wants the highest views per Website.
// so the logic should be, the publisher will be this.bidding with the views by providing the website and its Placement, to the bid the the logic take the best of 4 bids.
// note that the bid algorim, should wait at least for bids for it to Selection, the publisher can bid up to 4 times but not with the same websites which they bid already.

// the algorithm should pupolate the CampaignAssignment, with the details from the assigment after the bid is set.


exports.bidding = async (req, res) => {




}