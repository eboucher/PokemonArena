import TypeLog from "./typelog";

class Log {
    constructor(
       public type: TypeLog,
       public message: string 
    ) {}
}

export default Log;