import { Component, Input, OnInit } from '@angular/core';

import { Materia, materia_list } from '@shared';

import { MateriaService } from '../materia.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss']
})
export class MateriaComponent implements OnInit {
  private _name: string;

  @Input()
  set name(name: string) {
    this._name = name;
    this.materia = this.materiaService.getMateria(name);
  }

  get name(): string {
    return this._name;
  }

  materia: Materia;

  constructor(private materiaService: MateriaService ) { }

  ngOnInit() {
  }

}
