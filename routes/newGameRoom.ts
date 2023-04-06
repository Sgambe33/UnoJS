import {GameRoom} from "../classes";

const express = require(`express`);
import { gameRooms } from "../index";
import { v4 as uuidv4 } from "uuid";

module.exports = {
    base_route: `/newgameroom`,
    handler: () => {
        const route = express.Router({ caseSensitive: false });

        route.post(``, (req, res) => {

            let newUuid = uuidv4();
            console.log("Creating new gameroom requested by client with ID: "+newUuid);
            gameRooms.push(new GameRoom(newUuid, [], "waiting"));
            res.status(200).json({roomId: newUuid});
        });
        return route;
    }
}