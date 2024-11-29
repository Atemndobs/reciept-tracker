import { createWorker } from 'tesseract.js';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

class OcrService {
  constructor() {
    this.worker = null;
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    this.worker = await createWorker({
      logger: m => console.log(m),
    });

    // Initialize worker with German language
    await this.worker.loadLanguage('deu');
    await this.worker.initialize('deu');
    
    this.isInitialized = true;
  }

  async preprocessImage(uri) {
    try {
      // Enhance image for better OCR results
      const processedImage = await ImageManipulator.manipulateAsync(
        uri,
        [
          { resize: { width: 1000 } }, // Resize for consistent processing
          { contrast: 1.2 },           // Increase contrast
          { brightness: 1.1 },         // Slightly increase brightness
        ],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      return processedImage.uri;
    } catch (error) {
      console.error('Error preprocessing image:', error);
      throw error;
    }
  }

  async recognizeText(imageUri) {
    try {
      await this.initialize();

      // Preprocess the image
      const processedUri = await this.preprocessImage(imageUri);

      // Perform OCR
      const { data: { text } } = await this.worker.recognize(processedUri);

      // Parse the receipt text
      return this.parseReceiptText(text);
    } catch (error) {
      console.error('Error performing OCR:', error);
      throw error;
    }
  }

  parseReceiptText(text) {
    // Initialize receipt data structure
    const receiptData = {
      store: null,
      date: null,
      items: [],
      total: null,
    };

    // Split text into lines
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

    // Try to identify store (REWE, DM, ALDI, PENNY)
    const storePatterns = {
      'REWE': /REWE/i,
      'DM': /dm(-|\s)?markt/i,
      'ALDI': /ALDI/i,
      'PENNY': /PENNY/i
    };

    // Find store name
    for (const [store, pattern] of Object.entries(storePatterns)) {
      if (lines.some(line => pattern.test(line))) {
        receiptData.store = store;
        break;
      }
    }

    // Regular expressions for German receipt formats
    const datePattern = /\d{1,2}[.-]\d{1,2}[.-]\d{2,4}/;
    const pricePattern = /(\d+[,.]\d{2})\s*€?/;
    const itemPattern = /^[\w\s-]+\s+(\d+[,.]\d{2})\s*€?/;

    // Process each line
    lines.forEach(line => {
      // Try to find date if not found yet
      if (!receiptData.date && datePattern.test(line)) {
        receiptData.date = line.match(datePattern)[0];
      }

      // Try to find total
      if (line.toLowerCase().includes('summe') || line.toLowerCase().includes('gesamt')) {
        const totalMatch = line.match(pricePattern);
        if (totalMatch) {
          receiptData.total = parseFloat(totalMatch[1].replace(',', '.'));
        }
      }

      // Try to identify items with prices
      const itemMatch = line.match(itemPattern);
      if (itemMatch) {
        receiptData.items.push({
          name: line.split(itemMatch[1])[0].trim(),
          price: parseFloat(itemMatch[1].replace(',', '.')),
        });
      }
    });

    return receiptData;
  }

  async terminate() {
    if (this.worker) {
      await this.worker.terminate();
      this.isInitialized = false;
    }
  }
}

export default new OcrService();
