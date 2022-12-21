const Config = {
  apiUrl: "http://localhost:8080",
};

if (process.env.NODE_ENV === "production") {
  Config.apiUrl = "https://desolate-mesa-38375.herokuapp.com";
}

module.exports = {
  name: "trvlr",
  version: "1.0.0",
  extra: {
    ...Config,
    eas: {
      projectId: "eb1a7973-4686-4dc6-97a3-fa843754140b",
    },
  },
  updates: {
    url: "https://u.expo.dev/eb1a7973-4686-4dc6-97a3-fa843754140b",
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
};
