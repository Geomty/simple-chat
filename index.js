// Set user color

const color = generateColor();

function generateColor() {
    let arr = [];
    for (i=0;i<3;i++) arr.push(Math.floor(Math.random()*256));
    arr = arr.map(color => {
        let hex = color.toString(16);
        if (hex.length == 1)  hex = `0${hex}`;
        return hex;
    });
    return `#${arr.join("")}`;
}

// Set username

let username = "Anonymous";
$("#username").on("change", () => {
    username = $("#username").val();
});

// Listen for messages

const ws = new WebSocket("ws://localhost:8080");
ws.addEventListener("message", event => {
    const data = JSON.parse(event.data);
    $("#messages").prepend(`<p style="color:${data.color}" class="whitespace-nowrap">${data.username}: ${data.message}</p>`);
});

// Detect mouse and keyboard

let focused = false;
$("#input").on("focus", () => focused = true);
$("#input").on("focusout", () => focused = false);

$(document).on("keypress", event => {
    if (event.key == "Enter" && focused) handleClick();
});

// Send messages

function handleClick() {
    const value = $("#input").val();
    if (value.length) {
        ws.send(JSON.stringify({ username, color, message: value }));
        $("#input").val("");
        setTimeout(() => $("#messages").scrollTop($("#messages").height()), 1);
    }
}
