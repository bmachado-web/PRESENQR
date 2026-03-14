module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

Guardá y luego:
```
cd C:\PresenQR
git add babel.config.js
git commit -m "fix: corregir babel.config.js"
git push origin master