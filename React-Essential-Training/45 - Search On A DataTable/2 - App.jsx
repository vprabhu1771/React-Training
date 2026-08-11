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
