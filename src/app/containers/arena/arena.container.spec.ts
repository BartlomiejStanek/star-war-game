import { TestBed } from '@angular/core/testing';
import { ArenaContainer } from './arena.container';
import { MockComponent, MockProvider, MockRender, MockedComponentFixture } from 'ng-mocks';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { PeopleService } from '@app/api/services/people.service';
import { of } from 'rxjs';
import { Gender } from '@app/model/enum/gender';
import { StarshipService } from '@app/api/services/starship.service';
import { Resource } from '@app/model/enum/resource';

describe('ArenaContainer', () => {
  let component: ArenaContainer;
  let fixture: MockedComponentFixture<ArenaContainer,ArenaContainer>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArenaContainer],
      declarations: [
        ArenaContainer,
        MockComponent(MatButton),
        MockComponent(MatButtonToggle)
      ],
      providers: [
        MockProvider(PeopleService, {getRandomPerson: () => of()}),
        MockProvider(StarshipService, {getRandomStarship: () => of()})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(ArenaContainer);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should draw players from resource people',() => {
    const peopleServiceMock = spyOn(TestBed.inject(PeopleService), 'getRandomPerson').and.returnValue(of({
      name: 'Luke Skywalker',
      gender: Gender.male,
      height: '172',
      mass: 77,
      birthYear: '19BBY'}));
    component.drawPlayers();
    expect(peopleServiceMock).toHaveBeenCalled();
  });

  it('should draw players from resource starship',() => {
    component.resourcesForm.setValue(Resource.starships);
    const starshipMock = spyOn(TestBed.inject(StarshipService), 'getRandomStarship').and.returnValue(of({
      name: 'Death Star',
      model: 'DS-1 Orbital Battle Station',
      crew: 342953,
      cargoCapacity: '10000',
      length: '120000',
    }));
    fixture.detectChanges();
    component.drawPlayers();
    expect(starshipMock).toHaveBeenCalled();
  });

  it('should reset cards after resource change',() => {
    component.resourcesForm.setValue(Resource.starships);
    const starshipMock = spyOn(TestBed.inject(StarshipService), 'getRandomStarship').and.returnValue(of({
      name: 'Death Star',
      model: 'DS-1 Orbital Battle Station',
      crew: 342953,
      cargoCapacity: '10000',
      length: '120000',
    }));
    fixture.detectChanges();
    component.drawPlayers();
    expect(starshipMock).toHaveBeenCalled();
    component.resourcesForm.setValue(Resource.people);
    fixture.detectChanges();
    expect(component.player1.person).toBeUndefined();
  });
});
