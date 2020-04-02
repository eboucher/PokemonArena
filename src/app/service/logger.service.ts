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
    console.log(message);
  }

  addPokemon2Log(message: string): void {
    this.logs.push(new Log(LogType.Pokemon2, message));
    console.log(message);
  }

  addNormalLog(message: string): void {
    this.logs.push(new Log(LogType.Normal, message));
    console.log(message);
  }

  addDeadLog(message: string): void {
    this.logs.push(new Log(LogType.Dead, message));
    console.log(message);
  }

  addBeginLog(message: string): void {
    this.logs.push(new Log(LogType.Begin, message));
    console.log(message);
  }

  addDamageLog(defender: string, damage: number): void {
    const logDamage: Log = new Log(LogType.Damage, '');
    logDamage.defender = defender;
    logDamage.damage = damage;
    this.logs.push(logDamage);
    console.log(`${defender} prends ${damage} dégâts`);
  }

  clear(): void {
    this.logs = [];
  }
}
