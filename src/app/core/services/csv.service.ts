import { Injectable } from '@angular/core';
import { Receiver } from '../models/receiver.model';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor() {}

  parseCsvFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const csv = e.target?.result as string;
          const result = this.parseCsvContent(csv);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  }

  private parseCsvContent(csvContent: string): any[] {
    // Split by lines and get header row
    const lines = csvContent.split('\n');
    if (lines.length === 0) {
      return [];
    }

    const headers = this.parseCsvLine(lines[0]);
    const result: any[] = [];

    // Process each data row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = this.parseCsvLine(line);
      const obj: any = {};

      // Map values to headers
      headers.forEach((header, index) => {
        if (index < values.length) {
          obj[header.trim()] = values[index].trim();
        } else {
          obj[header.trim()] = '';
        }
      });

      result.push(obj);
    }

    return result;
  }

  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current);
    return result;
  }

  validateReceiver(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check name
    if (!data.name || data.name.trim() === '') {
      errors.push('Name is required');
    }

    // Check phone number
    if (!data.phoneNumber || data.phoneNumber.trim() === '') {
      errors.push('Phone number is required');
    } else {
      // Simple phone number validation (international format)
      const phoneRegex = /^\+[1-9]\d{1,14}$/;
      if (!phoneRegex.test(data.phoneNumber.trim())) {
        errors.push(
          'Invalid phone number format. Must start with + followed by country code and number.'
        );
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  mapToReceivers(
    data: any[],
    userId: string
  ): {
    valid: Receiver[];
    invalid: { row: number; data: any; errors: string[] }[];
  } {
    const valid: Receiver[] = [];
    const invalid: { row: number; data: any; errors: string[] }[] = [];

    data.forEach((item, index) => {
      const validation = this.validateReceiver(item);

      if (validation.isValid) {
        valid.push({
          name: item.name.trim(),
          phoneNumber: item.phoneNumber.trim(),
          userId: userId,
        });
      } else {
        invalid.push({
          row: index + 2, // +2 because index starts at 0 and we skip the header row
          data: item,
          errors: validation.errors,
        });
      }
    });

    return { valid, invalid };
  }
}
