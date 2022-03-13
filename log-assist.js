const styles = {
    macro: {
        "reset": "0",
        "bold": "1",
        "dim": "2",
        "italics": "3",
        "underscore": "4",
        "reverse": "7",
        "hidden": "8",
    },
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
    }
}

let config = {
    allow: true,
    colors: {
        ok: styles.text["green"],
        warn: styles.text["yellow"],
        error: styles.text["red"],
    },
}

config.changeColors = (array)=>{
    array.forEach(element => {
        config.colors[`${element[0]}`] = styles.text[`${element[1]}`];
    });
}


const stamp = (code) => {
    return `\x1b[${config.colors[`${code}`]}m${new Date().toISOString()}:\x1b[0m`;
}

const loggers = {
    ok: (log) => {
        if (config.allow) {
            console.log(`${stamp("ok")} ${log}`);
        }
    },
    warn: (log) => {
        if (config.allow) {
            console.log(`${stamp("warn")} ${log}`);
        }
    },
    error: (log) => {
        if (config.allow) {
            console.log(`${stamp("error")} ${log}`);
        }
    },
    server: (log) => {
        if (config.allow) {
            console.clear();
            console.log(`${stamp("ok")} \x1b[3m\x1b[1mSERVER STARTED ON PORT ${log}\x1b[0m`);
            console.log(`\n`);
        }
    },
    route: (log) => {
        if (config.allow) {
            console.log(`${stamp("ok")} \x1b[3m\x1b[1m${log.split(" ")[0]}\x1b[0m ${log.split(" ")[1]}`);
        }
    },
    endRoute: (log) => {
        if (config.allow) {
            console.log(`${stamp("ok")} \x1b[3m\x1b[1mDONE ${log.split(" ")[0]}\x1b[0m ${log.split(" ")[1]}`);
            console.log(`\n`);
        }
    },
}

module.exports = {
    config: config,
    ok: loggers.ok,
    warn: loggers.warn,
    error: loggers.error,
    server: loggers.server,
    route: loggers.route,
    endRoute: loggers.endRoute,
}