import fetchReadmes from './fetchReadmes';
import parseReadmes from './parseReadmes';

fetchReadmes()
  .then(readmes => {
    console.log('DONE FETCHING');
    return readmes;
  });