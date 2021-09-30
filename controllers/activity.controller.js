var { Activity, Asset, User, Rating } = require("../models/models");

async function getSingleActivity(req, res, next) {
	try {
		let activityData = await Activity.findByPk(parseInt(req.params.id), { include: [ Asset, User ] });
		res.json(activityData);
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}

async function getAllActivities(req, res, next) {
	try {
		let activityData = await Activity.findAll({ include: [ Asset, User ] });
		res.json(activityData);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function createSingleActivity(req, res, next) {
	try {
		let activityData = await Activity.create({
			name: req.fields.name,
			description: req.fields.description,
			weekday: req.fields.weekday,
			time: req.fields.time,
			maxParticipants: req.fields.maxParticipants,
			minAge: req.fields.minAge,
			maxAge: req.fields.maxAge,
			instructorId: req.fields.instructorId,
			assetId: req.fields.assetId
		});
		res.json(activityData);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function getRatings(req, res, next) {
	try {
		let rating = await Rating.findAll({ where: { activityId: req.params.id } });
		res.json(rating);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function saveRating(req, res, next) {
	try {
		let rating = await Rating.findAll({ where: { userId: req.fields.userId, activityId: req.params.id } });
		if (rating.length) return res.status(405).end();

		let newRating = await Rating.create({
			userId: req.fields.userId,
			activityId: req.params.id,
			rating: req.fields.rating
		});
		res.json(newRating);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createSingleActivity,
	getSingleActivity,
	getAllActivities,
	getRatings,
	saveRating
};
