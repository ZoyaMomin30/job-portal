// import * as pdfjsLib from "pdfjs-dist";

// // Set worker path for server-side rendering
// if (typeof window === "undefined") {
//   const pdfjsWorker = require("pdfjs-dist/build/pdf.worker.min.mjs");
//   pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// }

// export const parsePDF = async (buffer: Buffer): Promise<string> => {
//   const uint8Array = new Uint8Array(buffer);
//   const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
//   const doc = await loadingTask.promise;
  
//   let text = "";
//   for (let i = 1; i <= doc.numPages; i++) {
//     const page = await doc.getPage(i);
//     const content = await page.getTextContent();
//     const pageText = content.items
//       .map((item: any) => item.str)
//       .join(" ");
//     text += pageText + "\n";
//   }
  
//   return text.trim();
// };

