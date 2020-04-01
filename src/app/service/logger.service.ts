import { Injectable } from '@angular/core';
import Log from '../model/log';
import TypeLog from '../model/typelog';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  logs: Array<Log> = [];

  constructor() { }

  addPokemon1Log(message: string): void {
    this.logs.push(new Log(TypeLog.Pokemon1, message));
  }

  addPokemon2Log(message: string): void {
    this.logs.push(new Log(TypeLog.Pokemon2, message));
  }

  addNormalLog(message: string): void {
    this.logs.push(new Log(TypeLog.Normal, message));
  }

  addDeadLog(message: string): void {
    this.logs.push(new Log(TypeLog.Dead, message));
  }

  clear() : void {
    this.logs = [];
  }
}
