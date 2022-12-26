import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrgDataByid, getOrgDetails, getEventDetails } from '../actions';
import { useParams } from 'react-router-dom';

const Widget = () => {
  const dispatch = useDispatch();
  const { eventData, orgData } = useSelector((state) => state.formReducer);
  const { viewId } = useParams(); 

  useEffect(() => {
    dispatch(getOrgDetails());
    dispatch(getEventDetails());
    if (viewId) {
      dispatch(getOrgDataByid(viewId));
    }
  }, []);

  const display = eventData.map(
    (e) =>
      e.id == viewId &&
      orgData.map((o) =>
        e.organisation === o.name ? (
          <div style={{ height: '350px' }} className="border ms-3">
            <img src={o.image} style={{ width: '200px', height: '150px' }} />
            <h4>{o.name}</h4>
            <p>{o.address}</p>
            <span>{o.email}</span>
            <br />
            <span>{o.phone}</span>
          </div>
        ) : null
      )
  );

  return <div>{display}</div>;
};

export default Widget;
