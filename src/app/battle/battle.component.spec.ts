import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleComponent } from './battle.component';
import {PokemonComponent} from '../pokemon/pokemon.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppComponent} from '../app.component';
import Pokemon from '../model/pokemon';
import Attack from '../model/attack';

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;
  let view: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleComponent,
      PokemonComponent,
      AppComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    view = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display at least one pokemon', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(view.textContent).toContain('Pikachu');
  });

  it('should pause be disabled', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(view.querySelector('#pause').disabled).toBe(true);
  });

  it('should pause be enabled', () => {
    component = fixture.componentInstance;
    view.querySelector('#fight').click();
    fixture.detectChanges();
    expect(view.querySelector('#pause').disabled).toBe(false);
  });

  it('should pikachu be the winner enabled', () => {
    component = fixture.componentInstance;
    const frankSinatra: Attack = new Attack('FrankSinatra', 50, 100, 'Pulverisation', 'Physic');
    const linkToThePast: Attack = new Attack('LinkToThePast', 50, 100, 'Pulverisation', 'Physic');
    const attacks: Array<Attack> = [frankSinatra, linkToThePast];
    component.pokemon1.pokemon = new Pokemon('Pikachu', 50, 142, 117, 90, 156, attacks);
    component.pokemon2.pokemon = new Pokemon('Aligatorus', 50, 1, 117, 90, 156, attacks);
    component.simulateFight(component.pokemon1.pokemon, component.pokemon2.pokemon);
    fixture.detectChanges();
    component.simulateFight(component.pokemon1.pokemon, component.pokemon2.pokemon).then(pokemon => expect(pokemon).toBe('Pikachu'));
  });
});
