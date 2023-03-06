const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.placeid;

  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw next(new HttpError("Could not find place for the provided id", 404));
  }
  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  if (!place) {
    return next(new HttpError("Could not find user for the provided id", 404));
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createPlace);
  res.status(201).json({ place: createPlace });
};

const updatePlaceById = (req, res, next) => {
    const { title, description} = req.body
    const placeId = req.params.pid

    const updatedPlace = { ...DUMMY_PLACES.find(place => place.id === placeId)}
    const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId)
    updatedPlace.title = title
    updatedPlace.description = description
    DUMMY_PLACES[placeIndex] = updatedPlace
    res.status(200).json({place: updatedPlace})
};

const deletePlaceById = (req, res, next) => {};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
