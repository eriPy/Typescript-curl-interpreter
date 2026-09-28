import { createInterface } from "node:readline";

export enum RequestBody {
    E = "E",
    M = "M",
    H = "H",
    B = "B"
}

enum Md {
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}

export const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

export const getString = (msg: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(msg, (res) => {
            resolve(res);
        });
    });
}

export const getNumber = async(msg: string): Promise<number> => {
    while (true) {
        const n = Number(await getString(msg));
        if (!Number.isNaN(n)) return n;
        console.warn("Incorrect format");
    }
}

export const getUrl = async(): Promise<string> => {
    let url: string;
    while (true) {
        console.info("It must not end with a slash");
        url = await getString("Enter a URL: ");
        if (url.startsWith("https://") && !url.endsWith("/")) {
            return url;
        }
        console.warn("URL need starts with https:// and end without slash");
    }
}

export const getEndpoint = async(msg: string = ""): Promise<string> => {
    while (true) {
        const v: string = await getString(
            msg.length === 0 ? "Enter a endpoint: " : msg
        );
        if (v.length !== 0) {
            return v
        }
        console.warn("Endpoint is required");
    } 
}

export const getHeaders = async(headers: string[]) => {
    while (true) {
        console.info("Write 'stop' to end the selection");
        const h: string = await getString("Enter a header: ");
        if (h.length === 0 || h === "stop") {
            if (h === "stop") break;
            console.warn("Header is required");
            continue;
        }
        headers.push(h);
    }
}

export const getMethod = async(method: string[]) => {
    while (true) {
        const m: string = await getString("Enter a method: ");
        if (m.length === 0 || !Object.values(Md).includes(m.toUpperCase() as unknown as Md)) {
            console.warn("Invalid method");
            continue;
        } 
        console.info(`Method selected: ${m.toUpperCase()}`)
        method.push(m.toUpperCase());
        break;
    }
}

export const getData = async(body: string[]) => {
    while (true) {
        console.info("Write 'stop' to end the selection");
        const row: string = await getString("Enter a key-value pair (separated by |): ");
        if (row === "stop") break;
        const bParts = row.split("|");
        if (bParts.length !== 2) {
            console.warn("Invalid format")
            continue;
        }
        body.push(row);
        console.log("Information selected")
        for (const datum of body) console.info(`${datum}`);
    }
}