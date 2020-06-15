// import initializePixi from './scripts/initializePixi';

// initializePixi().then(sprites => {
//   console.log('Initilize finish. Sprites: ', sprites);
// });

import initPixi from './scripts/initPixi';
import './styles/reset.less';

initPixi().then(() => {
  console.log('success');
});
