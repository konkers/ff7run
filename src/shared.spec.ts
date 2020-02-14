// Test shared functionality here because `ng test` does no see //shared

import { Run, RunType, MateriaType } from "../shared/model";
import { JOB_LIST, MATERIA_LIST } from "../shared/data";
import { assign_job, new_job_run } from "../shared/job-run";

const materia_map = MATERIA_LIST.reduce((map, obj) => {
  map[obj.name] = obj;
  return map;
}, {});

describe("MATERIA_LIST", () => {
  it("Steal is command type", () => {
    expect(materia_map["Steal"].ty).toBe(MateriaType.Command);
  });
});

describe("JOB_LIST", () => {
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

describe("new_job_run", () => {
  let run = new_job_run();
  it("is of Job type", () => {
    expect(run.ty).toBe(RunType.Job);
  });

  it("only has Cloud assigned", () => {
    expect(run.job_data).toBeDefined();
    expect(Object.keys(run.job_data.jobs).length).toBe(1);
    expect("Cloud" in run.job_data.jobs).toBeTruthy();
  });
});

describe("assign_job", () => {
  it("fails on wrong type", () => {
    expect(() => assign_job({ ty: RunType.Unknown }, "Cloud")).toThrow(
      "run is not a job run"
    );
  });

  let run = new_job_run();

  it("fails on unknown character", () => {
    expect(() => assign_job(run, "Cecil")).toThrow("Cecil does not exist");
  });

  it("fails on duplicate character", () => {
    expect(() => assign_job(run, "Cloud")).toThrow("Cloud already has a job");
  });

  it("assigns Aerith a Job", () => {
    assign_job(run, "Aerith");
    expect("Aerith" in run.job_data.jobs).toBeTruthy();
  });
});
