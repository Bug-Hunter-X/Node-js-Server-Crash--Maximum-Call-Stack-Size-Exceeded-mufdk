# Node.js Server Crash: Maximum Call Stack Size Exceeded

This repository demonstrates a common error in Node.js servers where the server crashes with a `RangeError: Maximum call stack size exceeded` error when handling large request bodies.  The problem arises from the lack of checks to limit the size of the incoming data.

## Bug Description

The provided `bug.js` file contains a vulnerable Node.js HTTP server that doesn't handle large request bodies gracefully.  Without a mechanism to limit the size of the incoming data, the `data` event emits multiple times causing the request body to grow unboundedly and eventually exceeding the call stack limit.

## Solution

The `bugSolution.js` file provides a corrected version of the server. It introduces a mechanism to limit the size of the request body, preventing the server from crashing.