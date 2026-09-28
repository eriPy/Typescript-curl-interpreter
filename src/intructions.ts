import { getData, getEndpoint, getHeaders, getMethod, getString, RequestBody } from "./utils";

export const programInstructions = `
1. Change url
2. Write curl
3. Shut down
`;

const requestBodyInstructions = `
Type "e" if you want to change the endpoint
Add the initials of what you want to add, separed by spaces
Endpoint Method Header Body
`;

export const getRequestBody = async(): Promise<RequestBody[]> => {
    const request: RequestBody[] = [];
    const requestBody = await getString(requestBodyInstructions);
    const parts = requestBody.split(" ");
    parts.forEach(part => {
        const partEnum: RequestBody | null = 
            (Object.values(RequestBody).includes(part.toUpperCase() as unknown as RequestBody)) ? 
            part.toUpperCase() as unknown as RequestBody : null;
        if (partEnum !== null && !request.includes(partEnum!)) {
            request.push(partEnum);
        }
    });
    return request;
}

export const getBody = async(
    rb: RequestBody[], 
    e: string[],  
    m: string[], 
    h: string[], 
    b: string[]
) => {
    for (const body of rb) {
        switch (body) {
            case RequestBody.B:
                console.log("Getting data")
                await getData(b);
                break;
            case RequestBody.E:
                console.log("Getting a new endpoint")
                e[0] = await getEndpoint("Enter the new endpoint: ");
                break;
            case RequestBody.H:
                console.log("Getting headers")
                await getHeaders(h);
                break;
            case RequestBody.M:
                console.log("Getting method")
                await getMethod(m);
                break;
        }
    }
}