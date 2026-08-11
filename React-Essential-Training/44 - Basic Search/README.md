
```
npx create-react-app project_folder
```

```
under project_folder -> src -> Create users.js
```

```
under project_folder -> src -> Rename App.js to App.jsx
```

4 - `App.jsx`

```
import { useState } from "react";
import { Users } from "./users";
import "./App.css";



// Basic Search

function App() {

  const [query, setQuery] = useState("");

  return (

    <div className="app">

      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

      <ul className="list">

        {Users.filter((asd) =>
          asd.first_name.toLowerCase().includes(query)
        ).map((user) => (

          <li className="listItem" key={user.id}>

            {user.first_name}

          </li>

        ))}

      </ul>

    </div>

  );

}

export default App;
```

```
under react_search_filter -> src -> Open App.css
```

6 - `App.css`

```
.app {
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
}


.search {
  padding: 10px;
  font-size: 20px;
}

.list {
  padding: 0;
  list-style: none;
  text-align: center;
}

.listItem {
  margin-bottom: 20px;
  font-size: 25px;
  color: #444;
  font-weight: 300;
}

table {
  width: 100%;
  margin: 50px 0px;
  border-spacing: 15px;
  color: #444;
}

tr {
  margin-bottom: 20px;
}

th {
  width: 250px;
  text-align: left;
  font-size: 20px;
}

td {
  width: 250px;
  font-size: 20px;
}
```