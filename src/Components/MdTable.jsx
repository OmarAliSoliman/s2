import React, { Component } from "react";

// mdreact
import { MDBDataTable } from "mdbreact";

class MdTable extends Component {
  render() {
    var {datatable} = this.props;
    return (
      <div>
        <MDBDataTable
          entriesOptions={[5, 10, 15, 20]}
          entries={5}
          pagesAmount={4}
          hover
          large
          responsive
          data={datatable}
        />
      </div>
    );
  }
}

export default MdTable;
