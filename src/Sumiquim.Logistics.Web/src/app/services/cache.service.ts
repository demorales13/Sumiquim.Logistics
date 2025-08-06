import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  expiration: number = 100;

  constructor() { }

  save(data: string, key: string, expiration?: number) {
    // Set expiration date in miliseconds
    const expirationMS = expiration ? expiration * 60 * 1000 : this.expiration * 60 * 1000;

    const record = {
        value: typeof data === 'string' ? data : JSON.stringify(data),
        expiration: new Date().getTime() + expirationMS
    }
    localStorage.setItem(key, JSON.stringify(record))
  }

  load(key: string) {
    const item = localStorage.getItem(key)
    if (item !== null) {
        const record = JSON.parse(item)
        const now = new Date().getTime()
        // Expired data will return null
        if (!record || (record.hasExpiration && record.expiration <= now)) {
            return null
        } else {
            return JSON.parse(record.value)
        }
    }
    return null
  }

  remove(key: string) {
    localStorage.removeItem(key)
  }

  cleanLocalStorage() {
      localStorage.clear()
  }
}
