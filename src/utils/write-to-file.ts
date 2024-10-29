import * as fs from "fs";
import * as path from "path";

const writeDataToFile = (data: object | any[]): void => {
  try {
    const filePath = path.join(__dirname, "..", "..", "data", "movies.json");
    fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
  } catch (error) {
    console.error("Error writing file:", error);
  }
};

export default writeDataToFile;
