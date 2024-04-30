# joyinscrum
putting joy back in scrum

To override registry in __package-lock.json__, try using:

```bash
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm --registry https://registry.npmjs.org install
```

> It might also be necessary to execute the __"replace"__ step below

Replace ```http://localhost:4873``` with ```https://registry.npmjs.org``` inside __package-lock.json__

