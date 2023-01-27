const express = require("express");
const HttpError = require("../models/http-error");
const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Alliaz Arena Stadium",
    description: "Alliaz Arena is stadium of Bayern Munchen",
    location: {
      lat: 48.218764,
      lng: 11.6225668,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "All. Arena",
    description: "The Allianz Arena is a place where play Bayern Munchen",
    imageUrl:
      "https://img.fcbayern.com/image/upload/t_cms-16x9/f_auto/w_1366,h_768,c_fill/cms/public/images/allianz-arena/spieltagsbilder/bundesliag/innenraum_spieltag-4.jpg",
    address: "Werner-Heisenberg-Allee 25, 80939 München, Alemania",
    location: {
      lat: 48.218764,
      lng: 11.6225668,
    },
    creator: "u2",
  },
];

router.get("/:placeid", (req, res, next) => {
  const placeId = req.params.placeid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    return next(new HttpError("Could not find place for the provided id", 404));
    // error.code = 404;
    // throw error;
    // return res
    //   .status(404)
    //   .json({ message: "Couldn't find place with id " + placeId });
  }
  res.json({ place });
});

router.get("/users/:uid", (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  if (!place) {
    return next(new HttpError("Could not find user for the provided id", 404));
    // error.code = 404;
    // return next(error);
    // return res.status(404).json({ message: "Couldn't find user with id " });
  }
  res.json({ place });
});
module.exports = router;
