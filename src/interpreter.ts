import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsyc = promisify(exec);

export const getCommandCurl = async(
    url: string,
    endpoint: string[],
    method: string[],
    header: string[],
    body: string[]
): Promise<string> => {
    let curl: string = "curl";
    const data: Record<string, string> = {};
    if (method.length !== 0) curl = ` -X ${method[0]}`;
    curl = `${curl} ${url}/${endpoint}`;
    if (header.length !== 0) for (const h of header) curl = `${curl} -H "${h}"`;
    if (body.length !== 0) {
        for (const b of body) {
            const [key, value] = b.split("|") as [string, string];
            data[key] = value;
        }
        curl = `${curl} -d '${JSON.stringify(data)}'`;
    }
    return curl;
}

export const interpreter = async(command: string) => {
    console.info(`Command used : ${command}`);
    const { stdout } = await execAsyc(command);
    console.log("Data responses:")
    for (const [key, value] of Object.entries(stdout)) console.info(`| ${key} | ${value} |`);
}