import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesPublicComponent } from './resources-public.component';

describe('ResourcesPublicComponent', () => {
  let component: ResourcesPublicComponent;
  let fixture: ComponentFixture<ResourcesPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
