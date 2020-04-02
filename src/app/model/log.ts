import LogType from './logtype';

class Log {
    public damage: number;
    public defender: string;

    constructor(
       public type: LogType,
       public message: string
    ) {}
}

export default Log;
