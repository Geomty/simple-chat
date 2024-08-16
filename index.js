const ws = new WebSocket("ws://localhost:8080");
ws.addEventListener("message", event => {
    $("#messages").prepend(`<p>${event.data}</p>`);
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
        ws.send(value);
        $("#input").val("");
        setTimeout(() => $("#messages").scrollTop($("#messages").height()), 1);
    }
}