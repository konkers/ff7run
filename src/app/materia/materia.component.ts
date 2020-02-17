import { Component, Input, OnInit } from '@angular/core';

import { Materia, materia_list } from '@shared';

import { MateriaService } from '../materia.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss'],
})
export class MateriaComponent implements OnInit {
  private privName: string;

  @Input()
  set name(name: string) {
    this.privName = name;
    this.materia = this.materiaService.getMateria(name);
  }

  get name(): string {
    return this.privName;
  }

  materia: Materia;

  constructor(private materiaService: MateriaService) {}

  ngOnInit() {}
}
