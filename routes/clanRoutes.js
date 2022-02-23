require("dotenv").config();
const router = require("express").Router();
const Clan = require("../models/clanModel");
const Player = require("../models/PlayerModel");
const geolib = require('geolib');



router.post("/createClan", async (req, res) => {
    const { latitude, longitude, id, name, } = req.body;

    const clan = new Clan({
        name: name,
        game: "League of Legends",
        latitude: latitude,
        longitude: longitude,
        captain: id,
        members: [],
    });

    const created_clan = await clan.save()

    if (created_clan) {
        Player.findOne({ _id: id }).then((player) => {
            player.clan = clan._id
            player.save().then((player) => {
                res.status(201).json(player);
            })
        })

    } else {
        console.log("couldnt create clan")
    }
})



router.post("/createClanFake", async (req, res) => {
    const { latitude, longitude, name, } = req.body;

    const clan = new Clan({
        name: name,
        game: "League of Legends",
        latitude: latitude,
        longitude: longitude,
        members: [],
    });

    clan.save()
})


router.post("/getclans", (req, res) => {
    const { myLatitude, myLongitude, miles } = req.body
    const km = miles * 1609.344
    Clan.find().then((marker, index) => {
        let markersInRange = marker.filter(x => geolib.isPointWithinRadius({ latitude: x.latitude, longitude: x.longitude },
            { latitude: myLatitude, longitude: myLongitude },
            km) == true);
        res.status(201).json(markersInRange)
    });
});




module.exports = router;
