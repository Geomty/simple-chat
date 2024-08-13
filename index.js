const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });
let array = [];

wss.on("listening", () => {
    console.log("Websocket server is online");
});

wss.on("connection", ws => {
    array.push(ws);
    ws.on("message", data => {
        for (const i of array) {
            i.send(data.toString());
        }
    });
});