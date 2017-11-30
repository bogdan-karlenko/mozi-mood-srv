import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodMockComponent } from './mood-mock.component';

describe('MoodMockComponent', () => {
  let component: MoodMockComponent;
  let fixture: ComponentFixture<MoodMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodMockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
