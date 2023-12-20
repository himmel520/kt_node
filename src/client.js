var zmq = require("zeromq"),
  requester = zmq.socket("req");

const min = parseInt(process.argv[2]);
const max = parseInt(process.argv[3]);

const random_num = Math.floor(Math.random() * (max - min + 1) + min);
console.log("[CLIENT]: number = ", random_num);

requester.connect("tcp://127.0.0.1:3000");
console.log("[CLIENT]: requester bound to port 3000");

requester.send(JSON.stringify({ range: `${min}-${max}` }));

requester.on("message", (data) => {
  let msg = JSON.parse(data);
  console.log("[SERVER]: send ", msg);

  if (msg.answer === random_num) {
    console.log("The answer is correct. Game Over.");
  } else if (msg.answer) {
    requester.send(
      JSON.stringify({ hint: msg.answer < random_num ? "more" : "less" })
    );
  }
});
