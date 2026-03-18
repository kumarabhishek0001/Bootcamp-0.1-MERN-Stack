const path = require("path");
const fs = require("fs");

// say I have to do something with with week-6 index.js

// difficult option error prone -> write full path and join them as a string

// easy option use path.join
// it resolves the path same as terminal does

const workingDir = path.join(__dirname, "../Week-6/lecture-1");
console.log(workingDir);

