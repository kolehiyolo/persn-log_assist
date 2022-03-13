// const ok = (log) => {
//     console.log(`${stamp(32)} ${log}`);
// }

// const warn = (log) => {
//     console.log(`${stamp(33)} ${log}`);
// }

// const error = (log) => {
//     console.log(`${stamp(91)} ${log}`);
// }

// const server = (log) => {
//     console.clear();
//     console.log(`${stamp(32)} \x1b[3m\x1b[1mSERVER STARTED ON PORT ${log}\x1b[0m`);
//     console.log(`\n`);
// }

// const route = (log) => {
//     console.log(`${stamp(32)} \x1b[3m\x1b[1m${log.split(" ")[0]}\x1b[0m ${log.split(" ")[1]}`);
// }

// const endRoute = (log) => {
//     console.log(`${stamp(32)} \x1b[3m\x1b[1mDONE ${log.split(" ")[0]}\x1b[0m ${log.split(" ")[1]}`);
//     console.log(`\n`);
// }


// const test = () => {
//     console.log(`This is a test function`);
// }

module.exports = {
    ok: ok,
    warn: warn,
    error: error,
    server: server,
    route: route,
    endRoute: endRoute,
    test: test,
}