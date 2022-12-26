import React, { useEffect, useState } from 'react';
import Event from './Event';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getEventDetails } from '../../actions';
import DataTable from 'react-data-table-component';
// ====== end of imports ======//

// ==== style components =====//
const EventMain = styled.div`
  width: 80%;
  margin: auto;
`;

const EventList = () => {
  const dispatch = useDispatch();
  const { eventData } = useSelector((state) => state.formReducer);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // get events data from actions //
    dispatch(getEventDetails());
  }, []);

  // set table columns //
  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
    },
    {
      name: 'Organisation',
      selector: (row) => row.organisation,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
    },
    {
      name: 'Venue',
      selector: (row) => row.venue,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
    },
    {
      name: 'Cost',
      selector: (row) => row.cost,
    },
    {
      name: 'Image',
      selector: (row) => <img src={row.image} width="40%" />,
    },
    {
      name: 'Action',
      selector: (row) => (
        <Link
          to={`/edit-event/${row.id}`}
          type="button"
          onClick={() => setShowForm(true)}
        >
          Edit
        </Link>
      ),
    },
  ];

  return (
    <EventMain className="mt-5">
      <div className="d-flex justify-content-between">
        <h6 className="text-muted">Event</h6>
        <Link
          to="/add-event"
          className="btn btn-sm btn-primary"
          onClick={() => setShowForm(true)}
        >
          Add Events
        </Link>
      </div>
      {showForm ? (
        <Event />
      ) : (
        <div className="mt-5">
          {/* table  */}
          <DataTable columns={columns} data={eventData} />
        </div>
      )}
    </EventMain>
  );
};

export default EventList;
