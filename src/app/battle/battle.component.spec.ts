import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BattleComponent } from './battle.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from '../app.component';
import Pokemon from '../model/pokemon';
import Attack from '../model/attack';
import { BattleService } from '../service/battle.service';

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;
  let view: any;
  let battleService: BattleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
      BattleComponent,
      AppComponent],
      providers: [
        BattleService
      ],
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
    component.pokemon1 = new Pokemon('Pikachu', 50, 142, 117, 90, 156, '../../assets/img/25.png', attacks);
    component.pokemon2 = new Pokemon('Aligatorus', 50, 1, 117, 90, 156, '../../assets/img/129.png', attacks);
    this.battleService.simulateFight(component.pokemon1, component.pokemon2);
    fixture.detectChanges();
    this.battleService.simulateFight(component.pokemon1, component.pokemon2).then(pokemon => expect(pokemon).toBe('Pikachu'));
  });

  it('should print nouveau tour', () => {
    component = fixture.componentInstance;
    view.querySelector('#fight').click();
    fixture.detectChanges();
    expect(view.textContent).toContain('tour');
  });
});
