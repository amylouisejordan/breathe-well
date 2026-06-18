module.exports = function (api) {
  const isTest = api.env("test");
  api.cache(true);

  return {
    presets: [
      [
        "babel-preset-expo",
        {
          // Disable these plugins during tests to prevent module resolution errors
          reanimated: !isTest,
          worklets: !isTest,
        },
      ],
    ],
  };
};
