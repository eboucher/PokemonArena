import { Injectable } from '@angular/core';
import Log from '../model/log';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  logs: Array<Log> = [];

  constructor() { }

  add(log: Log): void {
    this.logs.push(log);
  }

  clear() : void {
    this.logs = [];
  }
}
