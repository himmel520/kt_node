var zmq = require("zeromq"),
  responder = zmq.socket("rep");

let minRange, maxRange, mid;

responder.on("message", (data) => {
  let msg = JSON.parse(data);
  console.log("[CLIENT]: send ", msg);

  if (msg.range) {
    const [min, max] = msg.range.split('-');
    minRange = parseInt(min);
    maxRange = parseInt(max);
  } else if (msg.hint) {
    msg.hint === "less" ? maxRange = mid - 1 : minRange = mid + 1
  }

  mid = Math.floor((minRange + maxRange) / 2);
  responder.send(JSON.stringify({ answer: mid }));
});

responder.bind("tcp://127.0.0.1:3000", (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("[SERVER]: responder bound to port 3000");
    console.log("[SERVER]: ready to play..");
  }
});
