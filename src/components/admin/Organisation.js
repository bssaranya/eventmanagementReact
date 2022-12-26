import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import ImageUploader from 'react-images-upload';
import { setDataToJson, editOrgData } from '../../services';
import { Link } from 'react-router-dom';
import { getOrgDataByid, getOrgDetails } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import history from '../../history';
// ==== end of imports ====//

//==== style components ===//
const Orgmain = styled.div`
  width: 80%;
  margin-left: 10px;
`;

const Span = styled.div`
  color: red;
`;

// validation part //
const DisplayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string()
    .matches(new RegExp('[0-9]{7}'))
    .max(10)
    .min(10)
    .required('Required'),
  address: Yup.string().required('Required'),
});

const Organisation = () => {
  const dispatch = useDispatch();
  const { editOrgDatas } = useSelector((state) => state.formReducer);
  const { orgId } = useParams();
  const [image, setImage] = useState('');

  useEffect(() => {
    // get organisation detail form actions //
    dispatch(getOrgDetails());
    if (orgId) {
      // get organisation detail by id form actions //
      dispatch(getOrgDataByid(orgId));
    }
  }, []);

  // image upload function //
  const onDrop = (pictureFiles, pictureDataURLs) => {
    // data for submit //
    setImage(pictureDataURLs[0]);
  };
  return (
    <Orgmain className="mt-3">
      <div style={{ margin: 'auto', width: '25%' }}>
        <Formik
          initialValues={{
            name: orgId ? editOrgDatas.name : '',
            email: orgId ? editOrgDatas.email : '',
            phone: orgId ? editOrgDatas.phone : '',
            address: orgId ? editOrgDatas.address : '',
          }}
          validationSchema={DisplayingErrorMessagesSchema}
          onSubmit={(values, { resetForm }) => {
            // data for submit
            values = { ...values, image: image };
            if (orgId) {
              // edit data
              editOrgData(orgId, values);
              history.push('/organisation');
            } else {
              //add data
              setDataToJson('/organisation', values);
              resetForm();
              // redirect page
              history.push('/organisation');
            }
          }}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              {orgId ? (
                <h5 className="text-decoration-underline">Edit Organisation</h5>
              ) : (
                <h5 className="text-decoration-underline">Add Organisation</h5>
              )}

              <div className="mt-3">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {touched.name && errors.name && <Span>{errors.name}</Span>}
              </div>
              <div className="mt-2">
                <label>Phone Number</label>
                <br />
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                {touched.phone && errors.phone && <Span>{errors.phone}</Span>}
              </div>
              <div className="mt-2">
                <label>Email</label>
                <br />
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {touched.email && errors.email && <Span>{errors.email}</Span>}
              </div>
              <div className="mt-2">
                <label>Logo</label>
                <br />
                {orgId ? (
                  <img src={editOrgDatas.image} width="250px" height="150px" />
                ) : null}
                {/* image uploader */}
                <ImageUploader
                  singleImage={true}
                  withPreview={true}
                  withIcon={false}
                  buttonText="Choose images"
                  onChange={onDrop}
                  imgExtension={['.jpeg', '.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={3242880}
                />
                {touched.image && errors.image && <Span>{errors.image}</Span>}
              </div>
              <div className="mt-2">
                <label>Address</label>
                <br />
                <textarea
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  style={{ width: '98%' }}
                ></textarea>

                {touched.address && errors.address && (
                  <Span>{errors.address}</Span>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-light border-primary mt-3"
              >
                Submit
              </button>
              <Link
                to="/organisation"
                className="btn btn-light border-danger ms-3 mt-3"
              >
                Back
              </Link>
            </form>
          )}
        </Formik>
      </div>
    </Orgmain>
  );
};

export default Organisation;
