import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalesNuevosComponent } from './hospitales-nuevos.component';

describe('HospitalesNuevosComponent', () => {
  let component: HospitalesNuevosComponent;
  let fixture: ComponentFixture<HospitalesNuevosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalesNuevosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HospitalesNuevosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
