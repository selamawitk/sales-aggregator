import { processCSV } from "../services/csvProcessor";

(async () => {
  console.log(" Starting CSV processing...");

  const result = await processCSV("uploads/test.csv");

  console.log("Processing finished:");
  console.log(result);
})();
