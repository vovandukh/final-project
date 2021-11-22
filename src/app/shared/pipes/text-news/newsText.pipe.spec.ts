import { NewsTextPipe } from './newsText.pipe';

describe('TextNewsPipe', () => {
  it('create an instance', () => {
    const pipe = new NewsTextPipe();
    expect(pipe).toBeTruthy();
  });
});
