import { Run, RunConfig, RunType, MateriaType } from './model';
import { CHARACTER_LIST, JOB_LIST, MATERIA_LIST } from './data';
import { new_job_run } from './job-run';

const materia_map = MATERIA_LIST.reduce((map, obj) => {
  map[obj.name] = obj;
  return map;
}, {});

describe('MATERIA_LIST', () => {
  it('Steal is command type', () => {
    expect(materia_map['Steal'].ty).toBe(MateriaType.Command);
  });
});

describe('JOB_LIST', () => {
  it(`Jobs' materia exist`, () => {
    for (const job of JOB_LIST) {
      for (const materia of job.materia) {
        expect(materia in materia_map).toBeTruthy(
          `${job.name}'s ${materia} materia is unknown.`
        );
      }
    }
  });
});

describe('new_job_run', () => {
  let run = new_job_run({ ty: RunType.Job });
  it('is of Job type', () => {
    expect(run.full.ty).toBe(RunType.Job);
    expect(run.current.ty).toBe(RunType.Job);
  });

  it('current only has Cloud assigned', () => {
    expect(run.current.job_data).toBeDefined();
    expect(Object.keys(run.current.job_data.jobs).length).toBe(1);
    expect('Cloud' in run.current.job_data.jobs).toBeTruthy();
  });

  it('full only has everyone assigned', () => {
    expect(run.full.job_data).toBeDefined();
    expect(Object.keys(run.full.job_data.jobs).length).toBe(
      CHARACTER_LIST.length
    );
    for (const char of CHARACTER_LIST) {
      expect(char in run.full.job_data.jobs).toBeTruthy();
    }
  });
});
