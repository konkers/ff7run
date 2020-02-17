import { RunType, MateriaType } from './model';
import { character_list, job_list, materia_list } from './data';
import { new_job_run } from './job-run';

const materiaMap = materia_list().reduce((map, obj) => {
  map[obj.name] = obj;
  return map;
}, {});

describe('MATERIA_LIST', () => {
  it('Steal is command type', () => {
    expect(materiaMap['Steal'.toString()].ty).toBe(MateriaType.Command);
  });
});

describe('JOB_LIST', () => {
  it(`Jobs' materia exist`, () => {
    for (const job of job_list()) {
      for (const materia of job.materia) {
        expect(materia in materiaMap).toBeTruthy(
          `${job.name}'s ${materia} materia is unknown.`
        );
      }
    }
  });
});

describe('new_job_run', () => {
  const [plan, state] = new_job_run({ ty: RunType.Job });

  it('is of Job type', () => {
    expect(state.config.ty).toBe(RunType.Job);
  });

  it('state only has Cloud assigned', () => {
    expect(state.data.job_data).toBeDefined();
    expect(Object.keys(state.data.job_data.jobs).length).toBe(1);
    expect('Cloud' in state.data.job_data.jobs).toBeTruthy();
  });

  it('plan only has everyone assigned', () => {
    expect(plan.job_data).toBeDefined();
    expect(Object.keys(plan.job_data.jobs).length).toBe(
      character_list().length
    );
    for (const char of character_list()) {
      expect(char in plan.job_data.jobs).toBeTruthy();
    }
  });
});
