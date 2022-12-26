import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getEventDetails } from '../actions';
import { Link } from 'react-router-dom';
//  end of imports  //

// style part //
const Event = styled.div`
  width: 90%;
  margin: auto;
`;
const EventFlex = styled.div`
  width: 95%;
  margin: auto;
`;

const UserEvent = () => {
  const dispatch = useDispatch();
  const { eventData } = useSelector((state) => state.formReducer);

  useEffect(() => {
    dispatch(getEventDetails());
  }, []);

  const eventDisplay = eventData.map((data) => {
    return (
      <>
        <div class="card" style={{ width: '18rem' }}>
          <img class="card-img-top" src={data.image} alt="Card image cap " />
          <div class="card-body">
            <h5 class="card-title">{data.title}</h5>
            <p class="card-text">
              <span>{data.venue}</span>
              <br />
              <span>{data.date}</span>
              <br />
              <span>{data.description}</span>
              <br />
              <span>{data.cost}</span>
              <br />
            </p>
            <Link to={`/view-event/${data.id}`} className="text-warning">
              View
            </Link>
          </div>
        </div>
      </>
    );
  });
  return (
    <Event>
      <h4 className="ms-4 mt-4">Events</h4>
      <EventFlex className="d-flex flex-wrap  mt-3">
        <div className="col-16t" style={{ height: '400px' }}>
          <div className="d-flex flex-wrap mt-4">{eventDisplay}</div>
        </div>
      </EventFlex>
    </Event>
  );
};

export default UserEvent;
