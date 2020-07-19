import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortofolioComponent } from './portofolio.component';

describe('PortofolioComponent', () => {
  let component: PortofolioComponent;
  let fixture: ComponentFixture<PortofolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortofolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortofolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
