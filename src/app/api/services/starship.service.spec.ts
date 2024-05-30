import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { StarshipService } from '@app/api/services/starship.service';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

describe('StarshipService', () => {
  let service: StarshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(HttpClient, {get: () => of()}),
        StarshipService
      ]
    });
    service = TestBed.inject(StarshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getRandomStarship', () => {
    const httpGet = spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(of({}));
    service.getRandomStarship();
    expect(httpGet).toHaveBeenCalled();
  });
});
