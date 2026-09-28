import { getEndpoint, getNumber, getString, getUrl, RequestBody, rl } from "./utils";
import { getBody, getRequestBody, programInstructions } from "./intructions";
import { getCommandCurl, interpreter } from "./interpreter";

const main = async() => {
    let url = await getUrl();
    let program: boolean = true;
    const ep: string[] = [await getEndpoint()];
    while (program) {
        console.info(`\nURL: ${url}`);
        console.info("Default header: Content-Type: application/json");
        console.log("Type 'yes' if you want to use the default header");
        const dh = await getString("To use default header?: ");
        const headers: string[] = dh === "yes" ? ["Content-Type: application/json"] : [];
        if (dh === "yes") console.info(`Using: ${headers[0]}`)
        const method: string[] = [];
        const body: string[] = [];
        try {
            console.log(programInstructions);
            const option: number = await getNumber("Enter a option: ");
            switch (option) {
                case 1:
                    url = await getUrl();
                    break;
                case 2:
                    const requestBody: RequestBody[] = await getRequestBody();
                    console.info(`Options selected: ${requestBody}`);
                    await getBody(requestBody, ep, method, headers, body);
                    const command: string = await getCommandCurl(
                        url, ep, method, headers, body
                    );
                    await interpreter(command);
                    break;
                case 3:
                    program = false;
            }
        } catch (error) {
            console.warn(`Incorrect format: ${error}`);
        }
        headers.length = 0;
        method.length = 0;
        body.length = 0;
    }
   rl.close();
}

main();