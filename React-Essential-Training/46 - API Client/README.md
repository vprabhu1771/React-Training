
1 - Create api Folder

```
Folder name: api
```

2 - Initialize Node Project

```
api -> npm init --y
```

3 - Install Express

```
npm i express
```

4 - Install cors

```
npm i cors
```

5 - Install nodemon

```
npm i nodemon
```

6 - Create users.js

```
under project_name -> src -> Create users.js
```

8 - Create index.js

```
under api -> Create index.js
```

9 - index.js

```
import express from "express";
const app = express();
import { Users } from "./users.js";
import cors from "cors";

app.use(cors());

app.get("/", (req, res) => {
  const { q } = req.query;

  const keys = ["first_name", "last_name", "email"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q))
    );
  };

  q ? res.json(search(Users).slice(0, 10)) : res.json(Users.slice(0, 10));
});

app.listen(5000, () => console.log("API is working!"));
```

10 - Open package.json

```
api -> Open package.json
```

11 - package.json

```
{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.2",
    "nodemon": "^2.0.15"
  },
  "type": "module"
}
```