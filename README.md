# CURL Interpreter

A TypeScript program built to simplify cURL requests to backend servers and make it easier to test APIs directly from the terminal. You can write the API information you want to test and see the response.

This project was built because I wanted to try new things with TypeScript and create a cURL interpreter for TypeScript programs. It can also be used to test backends built with technologies such as Spring Boot or FastAPI, similar to using something like Swagger UI.

## Structure

```text
src/

    interpreter.ts

    instructions.ts

    main.ts

    utils.ts
```

## File Functions

### main.ts

This file contains the user interface. The `main` function is responsible for executing the other functions and receiving the API data.

The program prompts the user for the API URL and the first endpoint to try. Then, it prompts for the endpoint information, such as:

* If the user wants to change the endpoint.
* If the user wants to use the default header: `Content-Type: application/json`.
* The HTTP method.
* Other headers.
* The request body.

The method, headers, body, and endpoint are saved in a list. After choosing between changing the URL, making a request, or closing the program, the method, header, and body data are reset.

### utils.ts

This file contains the enums for the request body options and cURL methods.

It also contains functions that prompt the user for different types of data, such as:

* URL
* Endpoint
* Strings
* Numbers
* Headers
* HTTP methods

These functions validate that the user input has the correct format.

### instructions.ts

This file contains the instructions displayed to the user during the program execution.

It also contains the request body function, which prompts the user for the endpoint configuration, such as the HTTP method, request body, additional headers, or changing the endpoint.

The `getBody` function uses the request body selected by the user to determine which function should be used to get the required data.

### interpreter.ts

This file contains the `getCommandCurl` function, which uses all the endpoint data to build the cURL command and return it.

It also contains the `interpreter` function, which executes the generated cURL command, gets the response data as JSON, and displays it in a table like: | Key | Value |

## How to Use

If you are in the project directory, open a Linux terminal or the VS Code terminal and run:

```bash
npx tsx src/main.ts
```

Then:

* Write the URL that you want to test.
* Write the endpoint that you want to test.
* Choose whether you want to use `Content-Type: application/json`.
* Choose the request body required by the endpoint.
* Write the data requested by the program.
* The program executes a cURL request using the data you provided.
* The response is displayed in the terminal.

## How to Install

Clone the repository and enter the project directory:

```bash
git clone <repository-url>
cd <project-directory>
```

Install the dependencies:

```bash
npm install
```

Run the program:

```bash
npx tsx src/main.ts
```