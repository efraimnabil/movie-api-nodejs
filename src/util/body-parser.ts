import { IncomingMessage } from "http";

const parseRequestBody = (request: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      
      request.on("data", (chunk: Buffer) => {
        body += chunk.toString();
      });

      request.on("end", () => {
        try {
          const parsedBody = JSON.parse(body);
          resolve(parsedBody);
        } catch (jsonError) {
          reject(`Error parsing JSON: ${jsonError}`);
        }
      });
    } catch (error) {
      console.error("Error parsing request body:", error);
      reject(error);
    }
  });
};

export default parseRequestBody;
