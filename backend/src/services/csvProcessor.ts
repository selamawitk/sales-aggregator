import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { v4 as uuidv4 } from "uuid";

export interface ProcessResult {
  outputFileName: string;
  departmentCount: number;
  processingTimeMs: number;
}

export const processCSV = (
  inputFilePath: string
): Promise<ProcessResult> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const departmentTotals = new Map<string, number>();

    fs.createReadStream(inputFilePath)
      .pipe(csv())
      .on("data", (row) => {
       const department = row["Department Name"]?.trim();
       const sales = Number(row[" Number of Sales"] || row["Number of Sales"]);

        if (!department || isNaN(sales)) return;

        const currentTotal = departmentTotals.get(department) || 0;
        departmentTotals.set(department, currentTotal + sales);
      })
      .on("end", () => {
        const outputFileName = `${uuidv4()}.csv`;
        const outputPath = path.join("outputs", outputFileName);

        const writeStream = fs.createWriteStream(outputPath);
        writeStream.write("Department Name,Total Number of Sales\n");

        departmentTotals.forEach((total, department) => {
          writeStream.write(`${department},${total}\n`);
        });

        writeStream.end();

        resolve({
          outputFileName,
          departmentCount: departmentTotals.size,
          processingTimeMs: Date.now() - startTime,
        });
      })
      .on("error", reject);
  });
};
