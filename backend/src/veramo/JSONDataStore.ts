import fs from 'fs';
import { IDataStore, DataStorePlugin } from '@veramo/core';

export class JSONDataStore extends DataStorePlugin implements IDataStore {
  async save(id: string, data: any): Promise<void> {
    fs.writeFileSync(`data/${id}.json`, JSON.stringify(data));
  }

  async get<T>(id: string): Promise<T | undefined> {
    try {
      const rawData = fs.readFileSync(`data/${id}.json`);
      return JSON.parse(rawData.toString()) as T;
    } catch (error) {
      return undefined;
    }
  }

  async delete(id: string): Promise<void> {
    fs.unlinkSync(`data/${id}.json`);
  }

  async saveVerifiableCredential(credential: any): Promise<void> {
    // Implement this method if needed
  }

  async getVerifiableCredential(id: string): Promise<any | undefined> {
    // Implement this method if needed
    return undefined;
  }

  async deleteVerifiableCredential(id: string): Promise<void> {
    // Implement this method if needed
  }

  async saveMessage(message: any): Promise<void> {
    // Implement this method if needed
  }

  async getMessage(id: string): Promise<any | undefined> {
    // Implement this method if needed
    return undefined;
  }

  async deleteMessage(id: string): Promise<void> {
    // Implement this method if needed
  }
}
