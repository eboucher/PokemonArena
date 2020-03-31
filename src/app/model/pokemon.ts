import Attack from './attack';

class Pokemon {
    constructor(
        public name: string,
        public level: number,
        public health: number,
        public attack: number,
        public defense: number,
        public speed: number,
        public attacks : Attack[]
    ) {}

    public attackTarget(attack: Attack, target: Pokemon): string {
        // console.log(this.name + ' attaque ' + target.name + ' avec ' + attack.name);
        // target.takeDamages(attack, this);
        return this.name + ' attaque ' + target.name + ' avec ' + attack.name;
    }

    public takeDamages(attack: Attack, attacker: Pokemon): string {
        let damages: number = Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) * attacker.attack * attack.power / this.defense) / 50) + 2;
        this.health = this.health - damages;
        // console.log(this.name + ' prends ' + damages + ' de dommages');
        return this.name + ' prends ' + damages + ' de dommages';
    }
}

export default Pokemon;
