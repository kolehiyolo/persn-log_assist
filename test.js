const log = require("../P004 - Log Assist/log-assist.js");

// log.config.allow = false;
// log.config.changeColors([
//     ["ok","blue"],
//     ["warn","green"],
// ]);
 
log.config.addFunc("test","blue");

// log.server("1004");
// log.ok("Okay log");
// log.warn("WARNING");
// log.error("ERROR");

log.test("TESTING");