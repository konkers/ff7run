import { Pipe, PipeTransform } from "@angular/core";

import { MateriaType } from "@shared";

@Pipe({
  name: "materiaTypeName"
})
export class MateriaTypeNamePipe implements PipeTransform {
  transform(value: MateriaType): string {
    switch (value) {
      case MateriaType.Command:
        return "command";
      case MateriaType.Independent:
        return "independent";
      case MateriaType.Magic:
        return "magic";
      case MateriaType.Summon:
        return "summon";
      case MateriaType.Support:
        return "support";
    }
  }
}
