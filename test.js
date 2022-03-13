const log = require("../P004 - Log Master/log-assist.js");

// log.config.allow = false;
// log.config.changeColors([
//     ["ok","blue"],
//     ["warn","green"],
// ]);

log.server("1004");
log.ok("Okay log");
log.warn("WARNING");
log.error("ERROR");
