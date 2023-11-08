const Config = {
  apiUrl: "http://192.168.0.88:8080",
};

if (process.env.NODE_ENV === "production") {
  Config.apiUrl = "https://urchin-app-lyhlx.ondigitalocean.app/";
}

module.exports = {
  name: "trvlr",
  version: "1.0.0",
  ios: {
    bundleIdentifier: "com.test.test",
  },
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
