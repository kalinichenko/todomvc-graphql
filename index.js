const bail = (error) => {
  console.error(error);
  process.exit(1);
};

process.on('uncaughtException', bail);
process.on('unhandledRejection', bail);

require('./apiServer.js');
require('./webServer.js');