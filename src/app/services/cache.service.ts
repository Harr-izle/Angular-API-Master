import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly cacheDuration = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any): void {
    const item = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  get(key: string): any | null {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }

    const parsedItem = JSON.parse(item);
    const isExpired = Date.now() - parsedItem.timestamp > this.cacheDuration;
    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return parsedItem.data;
  }

  clear(): void {
    localStorage.clear();
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}