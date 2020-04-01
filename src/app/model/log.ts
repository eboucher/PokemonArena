import LogType from './logtype';

class Log {
    constructor(
       public type: LogType,
       public message: string
    ) {}
}

export default Log;
