module.exports = function() {
  var env = "devEnv";
  var devEnv = {
    PORT: 8000,
    DB_URL: "mongodb://localhost/task",
    secretKey: "<@task@>",
  };
  var prodEnv = {
    PORT: 8000,
    DB_URL: "mongodb://localhost/task",
    secretKey: "<@task@>",
  };
  return env == "devEnv" ? devEnv : prodEnv;
};
