const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// hardcoded a merkle root here representing the whole nice list in hex format
const MERKLE_ROOT = 'fe261daa7ac899bc46da32d8a82b53de94ac8217a215c3263f378e233f357b03';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  console.log("body: ", body);
  const isInTheList = verifyProof(body.proof, body.name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
