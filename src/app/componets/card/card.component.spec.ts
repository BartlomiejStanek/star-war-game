import { CardComponent } from './card.component';
import { MockBuilder,MockRender, MockedComponentFixture } from 'ng-mocks';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: MockedComponentFixture<CardComponent, CardComponent>;
  beforeEach(async () => {
    return MockBuilder(CardComponent);
  });

  beforeEach(() => {
    fixture = MockRender(CardComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
