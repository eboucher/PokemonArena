import { Injectable } from '@angular/core';
import Log from '../model/log';
import LogType from '../model/logtype';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  logs: Array<Log> = [];

  constructor() { }

  addPokemon1Log(message: string): void {
    this.logs.push(new Log(LogType.Pokemon1, message));
  }

  addPokemon2Log(message: string): void {
    this.logs.push(new Log(LogType.Pokemon2, message));
  }

  addNormalLog(message: string): void {
    this.logs.push(new Log(LogType.Normal, message));
  }

  addDeadLog(message: string): void {
    this.logs.push(new Log(LogType.Dead, message));
  }

  clear() : void {
    this.logs = [];
  }
}
