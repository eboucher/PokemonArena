import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import Pokemon from '../model/pokemon';
import Attack from '../model/attack';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let pikachu: Pokemon;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;

    let pikachuAttacks = Array<Attack>();
    const charge: Attack = new Attack("Charge", 50, 100, "Normal", "Physic");
    pikachuAttacks.push(charge);
    pikachu = new Pokemon("Pikachu", 50, 142, 117, 90, 156, pikachuAttacks);
    component.pokemon = pikachu;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create pokemon element', () => {
    expect(component.pokemon.name).toBe(pikachu.name);
  });
});
