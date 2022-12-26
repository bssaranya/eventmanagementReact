import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getOrgDetails } from '../../actions';
import Organisation from './Organisation';
import DataTable from 'react-data-table-component';
// end of imports //

// style components //
const Orgmain = styled.div`
  width: 80%;
  margin: auto;
`;
const Image = styled.img`
  height: 150px;
`;

const OrganisationList = () => {
  const dispatch = useDispatch();
  const { orgData } = useSelector((state) => state.formReducer);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    //get data from actions
    dispatch(getOrgDetails());
  }, []);

  // set table columns //
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Address',
      selector: (row) => row.address,
    },
    {
      name: 'Image',
      selector: (row) => <img src={row.image} width="40%" />,
    },
    {
      name: 'Action',
      selector: (row) => (
        <Link
          to={`/edit-organisation/${row.id}`}
          type="button"
          onClick={() => setShowForm(true)}
        >
          Edit
        </Link>
      ),
    },
  ];

  return (
    <Orgmain className="mt-5">
      <div className="d-flex justify-content-between">
        <h6 className="text-muted">Organisation</h6>
        <Link
          to="/organisation-add"
          className="btn btn-sm btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          Add Organisation
        </Link>
      </div>
      {showForm ? (
        <Organisation />
      ) : (
        <div className="mt-5">
          {/* table  */}
          <DataTable columns={columns} data={orgData} />
        </div>
      )}
    </Orgmain>
  );
};

export default OrganisationList;
