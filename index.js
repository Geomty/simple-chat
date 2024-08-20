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

const ws = new WebSocket("ws://localhost:8080");
ws.addEventListener("message", event => {
    const data = JSON.parse(event.data);
    $("#messages").prepend(`<p style="color:${data.color}">${data.message}</p>`);
});

let focused = false;
$("#input").on("focus", () => focused = true);
$("#input").on("focusout", () => focused = false);

$(document).on("keypress", event => {
    if (event.key == "Enter" && focused) handleClick();
});

function handleClick() {
    const value = $("#input").val();
    if (value.length) {
        ws.send(JSON.stringify({ color, message: value }));
        $("#input").val("");
        setTimeout(() => $("#messages").scrollTop($("#messages").height()), 1);
    }
}
