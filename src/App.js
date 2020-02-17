import React from 'react';

import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import ExportToExcel from './components/ExportToExcel';
import './App.css';

class App extends React.Component {
 
  constructor(props){
    super(props);

    this.state = { data : []};

    this.renderEditable = this.renderEditable.bind(this);

  }

  renderEditable (cellInfo) {
    console.log("cell,info",cellInfo.original.isEditable)
    
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }


  componentDidMount(){
    const url = "https://jsonplaceholder.typicode.com/posts"
    fetch(url,{method : "GET"}).then(response => response.json()).then(data =>{
      console.log("Test data ",data);
      
      data.forEach(element => {
        element.isEditable = false;
      });

      this.setState({data:data});
    });
    
  }
 


  deleteRow(id){
    console.log("delete row function",id);
    // do database stuff 
  
    let filteredArray = this.state.data.filter(d => d.id !== id);
    this.setState({data:filteredArray});
  }

  

  insertRow(row){

  }

  render(){
    
    const columns =[{
                    Header: "User ID",
                    accessor: "userId",
                    sortable:true,
                    filterable:true,
                    // Cell: this.renderEditable,
                    style:{textAlign:"center"}
                  },
                  {
                    Header: "ID",
                    accessor: "id",
                    sortable:true,
                    filterable:true,
                    // Cell: this.renderEditable,
                    style:{textAlign:"center"}
                  },
                  {
                    Header: "Title ",
                    accessor: "title",
                    sortable:true,
                    filterable:true,
                    Cell: this.renderEditable,
                    style:{textAlign:"center"}
                  },
                  {
                    Header: "Content",
                    accessor: "body",
                    sortable:true,
                    filterable:true,
                    Cell: this.renderEditable,
                    style:{textAlign:"center"}
                  },
                  {
                    Header: "Actions",
                    Cell: props =>{
                      return(<div>
                        <button style={{backgroundColor: "red", color:"#fefefe"}}
                        onClick ={()=>{
                          console.log("delete :",props.original.id);
                          this.deleteRow(props.original.id);
                        }
                        
                      }>DELETE !</button>

                        <button style={{backgroundColor: "blue", color:"#fefefe"}}
                        onClick ={()=>{
                          console.log("Edit :",props.original.isEditable = !props.original.isEditable);
                          console.log("props",props);
                          // this.editRow(props.original.id);
                        }
                        
                      }>EDIT !</button>
                      </div>
                      );
                    },
                    filterable:false,
                    sortable:false,
                    style:{textAlign:"center"}
                  }];


  return (
    
    <ReactTable
    columns = {columns}
    data = {this.state.data}
    filterable
    showPaginationTop
    noDataText={"Incarcare ..."}
    >
      {(state,filtredData, instance)=>{
        this.reactTable = state.pageRows.map(data =>{return data._original});
        return(
          <div>
            {filtredData()}
            <ExportToExcel data={this.reactTable}/>
          </div>

        )
      }}
    </ReactTable>
  );
  }
}

export default App;
