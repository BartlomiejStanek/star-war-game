import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PeopleService } from '@app/api/services/people.service';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

describe('PeopleService', () => {
  let service: PeopleService;
  let httpGet: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(HttpClient, {get: () => of()}),
        PeopleService
      ]
    });
    service = TestBed.inject(PeopleService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getRandomPeople', () => {
    httpGet = spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(of({}));
    service.getRandomPerson();
    expect(httpGet).toHaveBeenCalled();
  });
});
