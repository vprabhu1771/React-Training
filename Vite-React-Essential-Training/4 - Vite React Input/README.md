# 4 - Vite React Input
 
1. Folder Setup

Folder Setup

```
project_name -> src -> components
```

File Setup

```
project_name -> src -> components -> Input.jsx
```

2. Notes

Clear Content 

index.css

app.css


3. open `Input.jsx`

```
import React, { useState } from 'react';

const Input = () => {

  const [inputValue, setInputValue] = useState('');
  

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div style={{ margin: '1em' }}>

      <label htmlFor="exampleInput" style={{ display: 'block', marginBottom: '0.5em' }}>Input Field</label>

      <input
        type="text"
        id="exampleInput"
        value={inputValue}
        onChange={handleChange}        
        style={{
          padding: '0.5em',
          width: '20%',
          boxSizing: 'border-box',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />

      <div style={{ marginTop: '0.5em', fontSize: '0.9em', color: '#666' }}>
        {inputValue}
      </div>

    </div>
  );
};

export default Input;
```

![Image](4.PNG)

![Image](5.PNG)