import mammoth from "mammoth";
import PDFParser from "pdf2json";

export const extractTextFromResume = async (
  buffer: Buffer,
  filename: string
): Promise<string> => {
  if (filename.endsWith(".pdf")) {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", (errData: any) =>
        reject(new Error(errData.parserError))
      );

      pdfParser.on("pdfParser_dataReady", () => {
        const text = (pdfParser as any).getRawTextContent();
        resolve(text);
      });

      pdfParser.parseBuffer(buffer);
    });
  }

  if (filename.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Unsupported file type");
};

// import mammoth from "mammoth";

// export const extractTextFromResume = async (
//   buffer: Buffer,
//   filename: string
// ): Promise<string> => {
//   if (filename.endsWith(".pdf")) {
//     try {
//       // Dynamic import to avoid build issues
//       const pdfParse = (await import("pdf-parse")).default;
//       const data = await pdfParse(buffer);
      
//       console.log("📄 PDF parsed successfully");
//       console.log("📊 Pages:", data.numpages);
//       console.log("📝 Text length:", data.text.length);
//       console.log("📄 Text preview:", data.text.substring(0, 200));
      
//       return data.text;
//     } catch (error) {
//       console.error("PDF parsing error:", error);
//       throw new Error("Failed to parse PDF. The file might be corrupted or password-protected.");
//     }
//   }

//   if (filename.endsWith(".docx") || filename.endsWith(".doc")) {
//     try {
//       const result = await mammoth.extractRawText({ buffer });
//       console.log("📄 DOCX parsed successfully");
//       console.log("📝 Text length:", result.value.length);
//       console.log("📄 Text preview:", result.value.substring(0, 200));
//       return result.value;
//     } catch (error) {
//       console.error("DOCX parsing error:", error);
//       throw new Error("Failed to parse DOCX file.");
//     }
//   }

//   throw new Error("Unsupported file type");
// };