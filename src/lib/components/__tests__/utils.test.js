import { capitalize } from '../utils';
// test('UserForm snapshot', () => {
//   const component = userFormWrapper;
//   // expect(component).toBe(true)
//   // expect(component).toMatchSnapshot();
// });

describe('utils ', () => {
  // test('two plus two is four', () => {
  //   expect(2 + 2).toBe(4);
  // });
  test('capitalize should capitalize an input word', () => {
    let inputWord = 'inputword';
    expect(capitalize(inputWord)).toBe('Inputword');
  });
});
