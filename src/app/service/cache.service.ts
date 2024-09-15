import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: { [key: string]: { data: any; timestamp: number } } = {};
  private readonly cacheDuration = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any): void {
    this.cache[key] = {
      data,
      timestamp: Date.now()
    };
  }

  get(key: string): any | null {
    const cached = this.cache[key];
    if (!cached) {
      return null;
    }

    const isExpired = Date.now() - cached.timestamp > this.cacheDuration;
    if (isExpired) {
      delete this.cache[key];
      return null;
    }

    return cached.data;
  }

  clear(): void {
    this.cache = {};
  }
}
