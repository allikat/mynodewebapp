const config = {};

config.host = process.env.HOST || "[cosmos uri]";
config.authKey =
  process.env.AUTH_KEY || "[cosmos primary key]";
config.databaseId = "Products";
config.containerId = "Items";

if (config.host.includes("https://localhost:")) {
  console.log("Local environment detected");
  console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log(`Go to http://localhost:${process.env.PORT || '4242'} to try the sample.`);
}

module.exports = config;
