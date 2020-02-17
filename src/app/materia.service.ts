import { Injectable } from '@angular/core';

import { Materia, materia_list } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class MateriaService {
  private materiaMap = new Map<string, Materia>();

  constructor() {
    for (const job of materia_list()) {
      this.materiaMap.set(job.name, job);
    }
  }

  getMateria(name: string): Materia {
    return this.materiaMap.get(name);
  }
}
