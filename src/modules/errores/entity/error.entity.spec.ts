import { ErrorEntity } from './error.entity';

describe('Error', () => {
  it('should be defined', () => {
    expect(new ErrorEntity()).toBeDefined();
  });
});
