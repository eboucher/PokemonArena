import Attack from './attack';

class Pokemon {
    public currentHealth: number;

    constructor(
        public name: string,
        public level: number,
        public maxHealth: number,
        public attack: number,
        public defense: number,
        public speed: number,
        public image: string,
        public attacks: Attack[]
    ) {
        this.currentHealth = maxHealth;
    }

    public attackTarget(attack: Attack, target: Pokemon): string {
        console.log(`${this.name} attaque ${target.name} avec ${attack.name}`);
        return `${this.name} attaque ${target.name} avec ${attack.name}`;
    }

    public takeDamages(attack: Attack, attacker: Pokemon): number {
        const damages: number =
          Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) * attacker.attack * attack.power / this.defense) / 50) + 2;
        this.currentHealth = this.currentHealth - damages;
        console.log(`${this.name} prends ${damages} de dommages`);
        // return `${this.name} prends ${damages} de dommages`;
        return  damages;
    }
}

export default Pokemon;
