import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getEventDataByid, getEventDetails } from '../actions';
import { Link, useParams } from 'react-router-dom';
import Widget from './Widget';
import { setDataToJson } from '../services';
const CardView = styled.div`
  width: 60vw;
  height: 450px;
  margin-left: 70px;
  margin-top: 40px;
`;
const CardWidget = styled(CardView)`
  width: 25vw;
  background-color: #ebf0f2;
  margin-left: 25px;
`;
const Span = styled.span`
  color: green;
  font-size: small;
`;
const DisplayEvent = () => {
  const dispatch = useDispatch();
  const { eventData } = useSelector((state) => state.formReducer);
  // get url id by useparams  //
  const { viewId } = useParams();

  const [date, setDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // get data
    dispatch(getEventDetails());
    if (viewId) {
      // get data by id
      dispatch(getEventDataByid(viewId));
    }
  }, []);

  useEffect(() => {
    // compare event date and  input date
    let event = eventData.filter((e) => new Date(e.date) > new Date(date));
    if (event) {
      //set filtered data
      setSelectedEvents(event);
    }
  }, [date]);

  const onSubmit = (e) => {
    // data for submit
    e.preventDefault();
    // email validation
    if (email === '') {
      setError('Email Required');
    } else {
      // add data
      setDataToJson('/invities', email);
      setEmail('');
      setError('');
      alert(`Send Successfully to ${email}`);
    }
  };

  const displayEvent = eventData.map((e, index) =>
    e.id === JSON.parse(viewId) ? (
      <div key={index}>
        <img src={e.image} style={{ width: '100%', height: '100%' }} />
      </div>
    ) : null
  );

  const displayEventdata = eventData.map((e, index) =>
    e.id === JSON.parse(viewId) ? (
      <div key={index}>
        <h4 className="ms-4 text-decoration-underline">{e.title}</h4>
        <p className="mt-4">
          <span className="ms-4">Date : {e.date}</span>
          <br />
          <span className="ms-4">Venue : {e.venue}</span>
          <br />
          <p className="ms-4">Description : {e.description}</p>
          <span className="ms-4">Cost : {e.cost}</span>
          <br />
        </p>
      </div>
    ) : null
  );
  return (
    <div>
      <h4 className="text-center mt-4">Events</h4>
      <div className="d-flex flex-wrap">
        <CardView className="border">
          <div className="d-flex flex-wrap mt-3  ms-5">
            <div className=" col-3">{displayEvent}</div>
            <div className=" col-3 ms-2 d-flex flex-colom flex-wrap">
              {displayEventdata}
            </div>
          </div>
          <div className="col-6 ms-5 mt-3">
            Remaining Counters:
            <input
              type="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
            />
            {/* display remaining events */}
            {selectedEvents && date ? (
              <>
                {selectedEvents.map((events, index) => (
                  <Span key={index}>
                    <br />
                    {index + 1} : {events.date}
                  </Span>
                ))}
              </>
            ) : (
              ''
            )}
          </div>
          <div className="col-6 ms-5 mt-3">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control mt-2"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <span className="text-danger">{error}</span>
              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
              <Link to="/userevent" className="btn btn-secondary mt-2 ms-3">
                Back
              </Link>
            </form>
          </div>
        </CardView>
        {/* widget  */}
        <CardWidget className="ms-3 border">
          <Widget />
        </CardWidget>
      </div>
    </div>
  );
};

export default DisplayEvent;
