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