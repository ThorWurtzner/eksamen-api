var { createSingleActivity, getSingleActivity, getAllActivities, getRatings, saveRating } = require("../controllers/activity.controller");
var { isAuthorized } = require("../middleware/auth");

module.exports = function(router) {
	router.post("/api/v1/activities", createSingleActivity);
	router.get("/api/v1/activities/:id", getSingleActivity);
	router.get("/api/v1/activities", getAllActivities);
	router.get("/api/v1/activities/:id/ratings", getRatings);
	router.post("/api/v1/activities/:id/ratings", isAuthorized, saveRating);
};
