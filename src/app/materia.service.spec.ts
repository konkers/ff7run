import { TestBed } from '@angular/core/testing';

import { MateriaService } from './materia.service';

describe('MateriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MateriaService = TestBed.get(MateriaService);
    expect(service).toBeTruthy();
  });
});
