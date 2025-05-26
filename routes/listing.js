const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {isLoggedIn} = require("../middleware.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

const validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Authorization middleware for listing owner
const isOwner = wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing doesn't exist");
        return res.redirect("/listings");
    }
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
});

//Index Route
router.get("/", wrapAsync(async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));

//New Route
router.get("/new", isLoggedIn,(req,res) => {
    res.render("listings/new.ejs");
});

//Show Route
router.get("/:id", wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner");
    if(!listing) {
        req.flash("error", "Listing doesn't exist")
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs", {listing});
}));

//Create Route
router.post("/", isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(async (req,res,next) => {
    const newListing = new Listing(req.body.listing);
    
    if(req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = {url, filename};
    }
    
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created")
    res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing doesn't exist")
        return res.redirect("/listings")
    }
    res.render("listings/edit.ejs", {listing});
}));

//Update Route
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    
    if(req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    
    req.flash("success", "Listing Updated")
    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted")
    res.redirect("/listings");
}));

// REVIEW ROUTES
//Reviews - Post Route
router.post("/:id/reviews", isLoggedIn, validateReview, wrapAsync(async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    
    // Add the author to the review
    newReview.author = req.user._id;

    if (!listing.reviews) {
        listing.reviews = [];
    }

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created")
    res.redirect(`/listings/${listing._id}`);
}));

//Delete Review Route
router.delete("/:id/reviews/:reviewId", isLoggedIn, wrapAsync(async(req,res) => {
    let {id, reviewId} = req.params;
    
    // Find the review to check ownership
    let review = await Review.findById(reviewId);
    let listing = await Listing.findById(id);
    
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }
    
    // Check if current user is the review author OR the listing owner
    if (!review.author.equals(req.user._id) && !listing.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to delete this review!");
        return res.redirect(`/listings/${id}`);
    }

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted")
    res.redirect(`/listings/${id}`);
}));

module.exports = router;