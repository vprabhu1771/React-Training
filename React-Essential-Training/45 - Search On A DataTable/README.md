
```
under project_folder -> src -> Create Table.jsx
```

2 - `Table.jsx`

```
import React from "react";

const Table = ({data}) => {

    return (
        <table>

            <thead>

                <tr>

                    <th>First Name</th>
                    
                    <th>Last Name</th>
                    
                    <th>Email</th>
                    
                    <th>Gender</th>

                </tr>

            </thead>

            <tbody>

                { data.map(item => (
                    
                    <tr key={item.id}>
                    
                        <td>{item.first_name}</td>
                        
                        <td>{item.last_name}</td>
                        
                        <td>{item.email}</td>
                        
                        <td>{item.gender}</td>

                    </tr>
                )) }


            </tbody>

        </table>
    )

}

export default Table;
```

3 - `App.jsx`

```
import { useState } from 'react';
import './App.css';

import Table from "./Table";

import { Users } from './users';

function App() {

  const [query,setQuery] = useState("");

  const keys = ["first_name", "last_name", "email"];

  const Search = (data) => {

    return data.filter((item) =>

      keys.some((key) => item[key].toLowerCase().includes(query))

    );
    
  };

  // console.log(Users.filter(user => user.first_name.toLowerCase().includes("fe")));

  return (
    <div className="app">

      <input 
        type="text" 
        placeholder="Search..." 
        className="search" 
        onChange={ (e) => 
          { 
            console.log(e.target.value);
            setQuery(e.target.value);
          } 
        }
        />

    {<Table data={Search(Users)} />}

      

    </div>
  );

}

export default App;
```