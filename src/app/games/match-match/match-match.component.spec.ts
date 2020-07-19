import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchMatchComponent } from './match-match.component';

describe('MatchMatchComponent', () => {
  let component: MatchMatchComponent;
  let fixture: ComponentFixture<MatchMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
