const log = {
    styles: undefined,
    config: undefined,
    stamp: undefined,
    loggers: undefined,
}

log.styles = {
    text: {
        "black": "30",
        "red": "31",
        "green": "32",
        "yellow": "33",
        "blue": "34",
        "magenta": "35",
        "cyan": "36",
        "white": "37",
        "gray": "90",
    },
    background: {
        "black": "40",
        "red": "41",
        "green": "42",
        "yellow": "43",
        "blue": "44",
        "magenta": "45",
        "cyan": "46",
        "white": "47",
        "gray": "\00",
    },
    macro: {
        "reset": "0",
        "bold": "1",
        "dim": "2",
        "italics": "3",
        "underscore": "4",
        "reverse": "7",
        "hidden": "8",
    }
}

log.config = {
    allowed: true,
    styles: {
        ok: [log.styles.text["green"], log.styles.background["black"]],
        warn: [log.styles.text["yellow"], log.styles.background["black"]],
        error: [log.styles.text["red"], log.styles.background["black"]],
    },
}

log.config.changeStyles = (array) => {
    array.forEach(element => {
        let bg = (element[2] != undefined) ? element[2] : "black";
        log.config.styles[`${element[0]}`] = [log.styles.text[`${element[1]}`], log.styles.background[`${bg}`]];
        if (element[3] != undefined) {
            log.config.styles[`${element[0]}`].push(log.styles.macro[`${element[3]}`]);
        }
    });
}

log.config.addFunc = (array) => {
    array.forEach(element => {
        let bg = (element[2] != undefined) ? element[2] : "black";
        log.config.styles[`${element[0]}`] = [log.styles.text[`${element[1]}`], log.styles.background[`${bg}`]];
        log.loggers[`${element[0]}`] = (msg) => {
            if (log.config.allowed) {
                console.log(`${log.stamp(`${element[0]}`)} ${msg}`);
            }
        }
        log[`${element[0]}`] = log.loggers[`${element[0]}`];
    });
}

log.config.reset = () => {
    log.config.allowed = true;
    log.config.styles.ok = [log.styles.text["green"], log.styles.background["black"]];
    log.config.styles.warn = [log.styles.text["yellow"], log.styles.background["black"]];
    log.config.styles.error = [log.styles.text["red"], log.styles.background["black"]];
}


log.stamp = (code) => {
    let chosenStyle = log.config.styles[`${code}`];
    let styles = `\x1b[${chosenStyle[0]}m`;
    styles += (chosenStyle[1] != undefined) ? `\x1b[${chosenStyle[1]}m` : ``;
    styles += (chosenStyle[2] != undefined) ? `\x1b[${chosenStyle[2]}m` : ``;
    return `${styles}${new Date().toISOString()}:\x1b[0m`;
}

log.loggers = {
    server: (msg) => {
        if (log.config.allowed) {
            console.clear();
            console.log(`${log.stamp("ok")} \x1b[3m\x1b[1mSERVER STARTED ON PORT ${msg}\x1b[0m`);
            console.log(`\n`);
        }
    },
    route: (msg) => {
        if (log.config.allowed) {
            console.log(`${log.stamp("ok")} \x1b[3m\x1b[1m${msg.split(" ")[0]}\x1b[0m ${msg.split(" ")[1]}`);
        }
    },
    endRoute: (msg) => {
        if (log.config.allowed) {
            console.log(`${log.stamp("ok")} \x1b[3m\x1b[1mDONE ${msg.split(" ")[0]}\x1b[0m ${msg.split(" ")[1]}`);
            console.log(`\n`);
        }
    },
}

log.server = log.loggers.server;
log.route = log.loggers.route;
log.endRoute = log.loggers.endRoute;

log.config.addFunc([
    ["ok", "green"],
    ["warn", "yellow"],
    ["error", "red"],
]);