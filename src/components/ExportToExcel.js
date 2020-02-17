import React from 'react';

import ReactHTMLTableToExcel  from 'react-html-table-to-excel';

class ExportToExcel extends React.Component {


    render(){

        return(

            <div>
                <ReactHTMLTableToExcel
                id = "table-xls-button"                
                className ="exportXls"
                table = "table-to-xls"
                filename = "exportedData"
                sheet = "inputData"
                buttonText = "Export"
                />
                <table hidden="true" id="table-to-xls">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map(dataRow =>{
                            return(
                                <tr key ={dataRow.id}>
                                    <td>{dataRow.userId}</td>
                                    <td>{dataRow.id}</td>
                                    <td>{dataRow.title}</td>
                                    <td>{dataRow.body}</td>
                                </tr>
                            )
                        })

                    }
                    </tbody>
                </table>
            </div>



        );



    }






}
export default ExportToExcel;