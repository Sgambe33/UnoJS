const express = require(`express`);
import { gameRooms } from "../index";

module.exports = {
    base_route: `/getgamerooms`,
    handler: () => {
        const route = express.Router({ caseSensitive: false });

        route.get(``, (req, res) => {
            res.status(200).json(gameRooms);
        })
        return route;
    }
}