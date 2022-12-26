import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { passwordChange } from '../../actions/index';
import styled from 'styled-components';

//====== end of import =======//

//===== style components part ======//
const Main = styled.div`
  margin: auto;
  margin-top: 10%;
`;

const ChangePswd = () => {
  const dispatch = useDispatch();
  const [oldPswd, setOldPswd] = useState('');
  const [newPswd, setNewPswd] = useState('');

  // form submit function //
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordChange({ oldPswd, newPswd }));
  };

  return (
    <Main className=" w-25">
      <h4>Change Password</h4>
      <form onSubmit={formSubmit} className="mt-3">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Current Password"
            className="form-control"
            value={oldPswd}
            onChange={(e) => setOldPswd(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="New Password"
            className="form-control"
            value={newPswd}
            onChange={(e) => setNewPswd(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Change
        </button>
      </form>
    </Main>
  );
};

export default ChangePswd;
