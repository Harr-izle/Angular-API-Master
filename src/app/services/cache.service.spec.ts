import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService]
    });
    service = TestBed.inject(CacheService);
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get cache data', () => {
    const key = 'test_key';
    const data = { value: 'test_data' };

    service.set(key, data);

    const cachedData = service.get(key);
    expect(cachedData).toEqual(data);
  });

  it('should return null for expired cache', () => {
    const key = 'expired_key';
    const data = { value: 'expired_data' };

    service.set(key, data);

    // Simulate cache expiration
    jest.advanceTimersByTime(service['cacheDuration'] + 1000); // Advance time beyond cache duration

    const cachedData = service.get(key);
    expect(cachedData).toBeNull();
  });

  it('should remove cache data', () => {
    const key = 'remove_key';
    const data = { value: 'remove_data' };

    service.set(key, data);
    service.remove(key);

    const cachedData = service.get(key);
    expect(cachedData).toBeNull();
  });

  it('should clear all cache data', () => {
    const key1 = 'clear_key1';
    const data1 = { value: 'clear_data1' };
    const key2 = 'clear_key2';
    const data2 = { value: 'clear_data2' };

    service.set(key1, data1);
    service.set(key2, data2);
    service.clear();

    const cachedData1 = service.get(key1);
    const cachedData2 = service.get(key2);

    expect(cachedData1).toBeNull();
    expect(cachedData2).toBeNull();
  });
});
