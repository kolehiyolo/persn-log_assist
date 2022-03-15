const styles = {
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

let config = {
    allowed: true,
    styles: {
        ok: [styles.text["green"], styles.background["black"]],
        warn: [styles.text["yellow"], styles.background["black"]],
        error: [styles.text["red"], styles.background["black"]],
    },
}

config.changeStyles = (array) => {
    array.forEach(element => {
        let bg = (element[2] != undefined) ? element[2] : "black";
        config.styles[`${element[0]}`] = [styles.text[`${element[1]}`], styles.background[`${bg}`]];
        if (element[3] != undefined) {
            config.styles[`${element[0]}`].push(styles.macro[`${element[3]}`]);
        }
    });
}

config.addFunc = (array) => {
    array.forEach(element => {
        let bg = (element[2] != undefined) ? element[2] : "black";
        config.styles[`${element[0]}`] = [styles.text[`${element[1]}`], styles.background[`${bg}`]];
        loggers[`${element[0]}`] = (log) => {
            if (config.allowed) {
                console.log(`${stamp(`${element[0]}`)} ${log}`);
            }
        }
        module.exports[`${element[0]}`] = loggers[`${element[0]}`];
        console.log(element);
    });
}

config.reset = () => {
    config.allowed = true;
    config.styles.ok = [styles.text["green"], styles.background["black"]];
    config.styles.warn = [styles.text["yellow"], styles.background["black"]];
    config.styles.error = [styles.text["red"], styles.background["black"]];
}


const stamp = (code) => {
    let chosenStyle = config.styles[`${code}`];
    let styles = `\x1b[${chosenStyle[0]}m`;
    styles += (chosenStyle[1] != undefined) ? `\x1b[${chosenStyle[1]}m` : ``;
    styles += (chosenStyle[2] != undefined) ? `\x1b[${chosenStyle[2]}m` : ``;
    return `${styles}${new Date().toISOString()}:\x1b[0m`;
}

let loggers = {
    server: (log) => {
        if (config.allowed) {
            console.clear();
            console.log(`${stamp("ok")} \x1b[3m\x1b[1mSERVER STARTED ON PORT ${log}\x1b[0m`);
            console.log(`\n`);
        }
    },
    route: (log) => {
        if (config.allowed) {
            console.log(`${stamp("ok")} \x1b[3m\x1b[1m${log.split(" ")[0]}\x1b[0m ${log.split(" ")[1]}`);
        }
    },
    endRoute: (log) => {
        if (config.allowed) {
            console.log(`${stamp("ok")} \x1b[3m\x1b[1mDONE ${log.split(" ")[0]}\x1b[0m ${log.split(" ")[1]}`);
            console.log(`\n`);
        }
    },
}

module.exports = {
    config: config,
    server: loggers.server,
    route: loggers.route,
    endRoute: loggers.endRoute,
}

config.addFunc([
    ["ok","green"],
    ["warn","yellow"],
    ["error","red"],
]);