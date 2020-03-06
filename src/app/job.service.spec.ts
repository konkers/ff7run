import { TestBed } from '@angular/core/testing';

import { JobService } from './job.service';

describe('JobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobService = TestBed.get(JobService);
    expect(service).toBeTruthy();
  });

  it('should support aliases', () => {
    const service: JobService = TestBed.get(JobService);
    expect(service.getJob('Mime').name).toBe('Onion Mime');
    expect(service.getJob('Summoner').name).toBe('Caller');
  });
});
