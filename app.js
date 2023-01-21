require('@babel/register');
require("./src/configs/server");
// require("./src/configs/dbConn");
require("./src/configs/cronJobs");
require("./src/messenger/messenger.socket");
require("./src/stripe/stripe");