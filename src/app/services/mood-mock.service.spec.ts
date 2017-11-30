import { TestBed, inject } from '@angular/core/testing';

import { MoodMockService } from './mood-mock.service';

describe('MoodMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoodMockService]
    });
  });

  it('should be created', inject([MoodMockService], (service: MoodMockService) => {
    expect(service).toBeTruthy();
  }));
});
