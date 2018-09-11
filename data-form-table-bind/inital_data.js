// const INITIAL_DATA = [
//   {
//     first: 'vasia',
//     last: 'pupkin',
//     handle: '@vasia',
//   }, {
//     first: 'vasilisa',
//     last: 'pupkina',
//     handle: '@vasilisa',
//   }
// ];

const INITIAL_DATA = getInitialData();

function getInitialData() {
  if (localStorage.getItem('INITIAL_DATA') == null) {
    return [
      {
        first: 'vasia',
        last: 'pupkin',
        handle: '@vasia',
      }, {
        first: 'vasilisa',
        last: 'pupkina',
        handle: '@vasilisa',
      }
    ];
  } else {
    return JSON.parse(localStorage.getItem('INITIAL_DATA'));
  }
}

// BAD CODE
// INITIAL_DATA.test = 'test';
