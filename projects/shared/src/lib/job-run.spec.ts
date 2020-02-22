import { RunData, RunType, RunStatus, MateriaType } from './model';
import { character_list, job_list, materia_list } from './data';
import { JobRunGenerator } from './job-run';
import { Driver, DefaultDriver } from './driver';

export class TestDriver extends DefaultDriver {
  public getRandomInt(max: number): number {
    return 0;
  }
}

const materiaMap = materia_list().reduce((map, obj) => {
  map[obj.name] = obj;
  return map;
}, {});

function maxJobCount(plan: RunData): number {
  const jobCounts = job_list().reduce((map, obj) => {
    map[obj.name] = 0;
    return map;
  }, {});

  for (const job of Object.values(plan.job_data.jobs)) {
    jobCounts[job.name] += 1;
  }

  return Object.values<number>(jobCounts).reduce(
    (a: number, b: number): number => Math.max(a, b),
    0
  );
}

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
  const gen = new JobRunGenerator(new TestDriver());
  const [plan, state] = gen.newRun({ ty: RunType.Job });

  it('is of Job type', () => {
    expect(state.config.ty).toBe(RunType.Job);
  });

  it('is active', () => {
    expect(state.status).toBe(RunStatus.Active);
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
      expect(char.name in plan.job_data.jobs).toBeTruthy();
    }
  });
});

describe('new_job_run unique flag', () => {
  const gen = new JobRunGenerator(new TestDriver());

  it('"unique_jobs: false" has dup jobs', () => {
    const [plan, state] = gen.newRun({
      ty: RunType.Job,
      job_config: {
        unique_jobs: false,
      },
    });
    expect(maxJobCount(plan)).toBeGreaterThan(1);
  });

  it('default has dup jobs', () => {
    const [plan, state] = gen.newRun({
      ty: RunType.Job,
    });
    expect(maxJobCount(plan)).toBeGreaterThan(1);
  });

  it('"unique_jobs: true" has no dup jobs', () => {
    const [plan, state] = gen.newRun({
      ty: RunType.Job,
      job_config: {
        unique_jobs: true,
      },
    });
    expect(maxJobCount(plan)).toBe(1);
  });
});
