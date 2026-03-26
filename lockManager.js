// const locks = {};

// function lock(resource) {

//     if (!locks[resource]) {
//         locks[resource] = true;
//         return true;
//     }

//     return false;
// }

// function unlock(resource) {

//     locks[resource] = false;
// }

// function showLocks() {
//     return locks;
// }

// module.exports = { lock, unlock, showLocks };
const locks = {};
const queue = {};

function lock(resource, user) {

    if (!locks[resource]) {

        locks[resource] = user;
        return "LOCKED";

    } else {

        if (!queue[resource]) {
            queue[resource] = [];
        }

        queue[resource].push(user);

        return "WAIT";
    }

}


function unlock(resource) {

    if (queue[resource] && queue[resource].length > 0) {

        const nextUser = queue[resource].shift();

        locks[resource] = nextUser;

        return "LOCKED BY " + nextUser;

    } else {

        locks[resource] = null;

        return "UNLOCKED";
    }

}


function showLocks() {
    return locks;
}


function showQueue() {
    return queue;
}


module.exports = {
    lock,
    unlock,
    showLocks,
    showQueue
};