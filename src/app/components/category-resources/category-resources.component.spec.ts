import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryResourcesComponent } from './category-resources.component';

describe('CategoryResourcesComponent', () => {
  let component: CategoryResourcesComponent;
  let fixture: ComponentFixture<CategoryResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
