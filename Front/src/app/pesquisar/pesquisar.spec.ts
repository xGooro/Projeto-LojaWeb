import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pesquisa } from './pesquisar';

describe('Pesquisar', () => {
  let component: Pesquisa;
  let fixture: ComponentFixture<Pesquisa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pesquisa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pesquisa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
