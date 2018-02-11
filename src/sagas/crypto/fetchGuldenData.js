import moment from 'moment';

import config from '../../config/crypto';

const fetchGuldenData = (minutesAgo = 0) => {
  const fetchFor = moment.utc().subtract(minutesAgo, 'minutes').format('YYYY-MM-DD\THH:mm:ss');

  return fetch('https://gulden-rate.booij.me/?at=' + fetchFor)
    .then(response => response.json())
    .then(response => response.buy * config.gulden.balance);
};

export default () => {
  return Promise.all([
    fetchGuldenData(),
    fetchGuldenData(24 * 60)
  ])
    .then(results => {
      const now = results[0];
      const initial = results[1];

      return {
        value: now,
        symbol: 'NLG',
        change: {
          ['24hr']: ((now - initial) / initial) * 100
        }
      }
    });
};
