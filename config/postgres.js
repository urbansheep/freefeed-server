import knexjs from 'knex'
import * as logger from '../app/support/debugLogger';
import { load as configLoader } from './config'

const config = configLoader()

const knex = knexjs(config.postgres)

if (logger.isEnabledFor('sql') || logger.isEnabledFor('sql-error')) {
  const log = logger.get('sql');
  const errLog = logger.get('sql-error');

  knex.on('start', (builder) => {
    const q = builder.toString();
    const start = new Date().getTime();
    builder.on('end', () => {
      log('%s %s', q, logger.stylize(`${new Date().getTime() - start}ms`, 'green'));
    });
    builder.on('error', () => {
      errLog('%s %s', logger.stylize('ERROR', 'red'), q);
    });
  });
}

export function connect() {
  return knex
}

export function configure() {
  const { textSearchConfigName } = config.postgres;
  return knex.raw(`SET default_text_search_config TO '${textSearchConfigName}'`)
}
