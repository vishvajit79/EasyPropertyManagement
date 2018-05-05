import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropdetailComponent } from './propdetail.component';

describe('PropdetailComponent', () => {
  let component: PropdetailComponent;
  let fixture: ComponentFixture<PropdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
