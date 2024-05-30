import {AppComponent} from './app.component';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
} from "ng-mocks";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture:  MockedComponentFixture<AppComponent, AppComponent>;
  beforeEach( async () => {
    return MockBuilder(AppComponent);
  });

  beforeEach(() => {
    fixture = MockRender(AppComponent);
    component = fixture.point.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
