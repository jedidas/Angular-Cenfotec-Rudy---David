import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  public set(keyName: string, value: any): void {

    localStorage.setItem(keyName, JSON.stringify(value));

  }

  public get(keyName: string): any {
    return JSON.parse(
      localStorage.getItem(keyName)
    );
  }

  public delete(keyName: string): void {
    localStorage.removeItem(keyName);
  }

}
