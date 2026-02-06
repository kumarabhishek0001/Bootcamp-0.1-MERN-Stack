// if js is supposed to read some file on the system.
// IO heavy operations -> it refers to tasks in a computer program that involves a lot of data 
// transfer between the program and externa system or devices. These require waiting for data
// to be read from or writtedn to source like disks, network, databases or other external devices which 
// which can be time consuming to in memory 


// unless node has access to machine any program written can not access the files on your system
// IO heavy operations include 1. reading a file, 2. Starting a clock, 3. HTTP Requests

// say my code looks like this

// read(path to file) -> this reads a file
// for() -> loop for something

// now the sycnhronus code read function is triggered, now my program is waiting for os to send me the file to read. Here my JS thread is idle.
// wouldn't it be good if I could just use the thread to do other work until my file is read. This is called asunchronus work.

const fs = require('fs');

const contents = fs.readFileSync("a.txt", "utf-8");
console.log(contents);

// CPU bound task
//  task limitied by the speed and power of CPU. Require significant computation and precessiing power, meaning that the performance bottleneck is the CPU.

// example

let ans = 0;
for(let i=0; i<1000000; i++){
    ans = ans + 1;
    ans = ans * 10;
}

console.log(ans);



// IO Bound task
// tasks limited by system's input output capabilites, such as disk i/0, network i/o or an othre fomr of data transfer. These task usually depends on wating for i/o operations to complete.

