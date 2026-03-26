// const express = require("express");

// const {
//     lock,
//     unlock,
//     showLocks
// } = require("./lockManager");

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// // test
// app.get("/", (req, res) => {
//     res.send("Server running");
// });


// // LOCK
// app.get("/lock", (req, res) => {

//     const resource = req.query.resource;

//     if (!resource) {
//         return res.send("No resource");
//     }

//     if (lock(resource)) {
//         res.send("LOCKED");
//     } else {
//         res.send("BUSY");
//     }

// });


// // UNLOCK
// app.get("/unlock", (req, res) => {

//     const resource = req.query.resource;

//     if (!resource) {
//         return res.send("No resource");
//     }

//     unlock(resource);

//     res.send("UNLOCKED");

// });


// // SHOW LOCKS
// app.get("/locks", (req, res) => {

//     res.send(showLocks());

// });


// app.listen(3000, () => {
//     console.log("Server started on port 3000");
// });

const express = require("express");

const {
    lock,
    unlock,
    showLocks,
    showQueue
} = require("./lockManager");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Distributed Lock Manager Running");
});


// LOCK
app.get("/lock", (req, res) => {

    const resource = req.query.resource;
    const user = req.query.user;

    if (!resource || !user) {
        return res.send("Need resource & user");
    }

    const result = lock(resource, user);

    res.send(result);

});


// UNLOCK
app.get("/unlock", (req, res) => {

    const resource = req.query.resource;

    if (!resource) {
        return res.send("Need resource");
    }

    const result = unlock(resource);

    res.send(result);

});


// SHOW LOCKS
app.get("/locks", (req, res) => {
    res.send(showLocks());
});


// SHOW QUEUE
app.get("/queue", (req, res) => {
    res.send(showQueue());
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});