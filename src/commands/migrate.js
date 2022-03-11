'use strict';

const chalk = require('chalk');
const { Migrator } = require('../core/migrators');

module.exports = async ({ type }) => {
  const migrator = new Migrator();
  try {
    await migrator.init();
    switch (type) {
      case 'migrate': {
        await migrator.migrate();
        return;
      }
      case 'refresh': {
        await migrator.refresh();
        return;
      }
      default: {
        throw new Error('Unknown migration type');
      }
    }
  } catch (err) {
    console.log(chalk.red(err.message));
  } finally {
    await migrator.destroy();
  }
};
