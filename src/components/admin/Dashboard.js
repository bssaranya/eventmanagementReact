import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getEventDetails, getInvities } from '../../actions';
//===== end of import ======//

// style components part //
const CounterMain = styled.div`
  width: 100%;
  height: 300px;
  margin: auto;
  margin-top: 3%;
`;
const Couter = styled.div`
  width: 35%;
  background: linear-gradient(
    90deg,
    rgba(43, 38, 34, 1) 0%,
    rgba(94, 79, 59, 1) 31%
  );
  height: 25vh;
  margin: auto;
`;
const CounterSub = styled.div`
  width: 40%;
  margin: auto;
  margin-top: 10%;
`;
const Heading = styled.h5`
  color: rgb(43, 38, 34);
`;

const Count = styled.p`
  font-size: 30px;
  color: rgb(46, 32, 21);
`;
// end of style components part //

const Dashboard = () => {
  const dispatch = useDispatch();
  const { eventData, invities } = useSelector((state) => state.formReducer);

  useEffect(() => {
    // get events data and ivities from actions //
    dispatch(getEventDetails());
    dispatch(getInvities());
  }, []);

  // find Events length //
  var myObject = eventData;
  var count = Object.keys(myObject).length;

  // find Invities length //
  var invite = invities;
  var countIn = Object.keys(invite).length;

  return (
    <div className="w-75 m-auto">
      <h6 className="text-muted mt-4">Dashboard</h6>
      <CounterMain className=" border d-flex flex-wrap">
        <Couter>
          <CounterSub>
            <Heading>No of Events</Heading>
            <Count className="ms-5">{count}</Count>
          </CounterSub>
        </Couter>
        <Couter className="ms-1">
          <CounterSub>
            <Heading>No of Invities</Heading>
            <Count className="ms-5">{countIn}</Count>
          </CounterSub>
        </Couter>
      </CounterMain>
    </div>
  );
};

export default Dashboard;
