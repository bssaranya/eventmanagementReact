import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOrgDetails,
  getEventDataByid,
  getEventDetails,
} from '../../actions';
import ImageUploader from 'react-images-upload';
import { setDataToJson, editEventData } from '../../services';
import history from '../../history';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//====== end of imports ======//

//====== style components =======//
const EventForm = styled.div`
  width: 25%;
  margin: auto;
`;
const Span = styled.div`
  color: red;
`;

// ====== validation part =========//
const DisplayingErrorMessagesSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  venue: Yup.string().required('Required'),
  organisation: Yup.string().required('Required'),
  date: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  cost: Yup.number().required('Required'),
});

const Event = () => {
  const dispatch = useDispatch();
  const { editId } = useParams();
  const { orgData, editEventDatas } = useSelector((state) => state.formReducer);
  const [image, setImage] = useState('');

  useEffect(() => {
    // get data from action //
    dispatch(getOrgDetails());
    dispatch(getEventDetails());
    // get data byt id from action //
    if (editId) {
      dispatch(getEventDataByid(editId));
    }
  }, []);

  const onDrop = (pictureFiles, pictureDataURLs) => {
    // data for submit
    setImage(pictureDataURLs[0]);
  };
  return (
    <div className="mt-3">
      <Formik
        initialValues={{
          organisation: editId ? editEventDatas.organisation : '',
          title: editId ? editEventDatas.title : '',
          venue: editId ? editEventDatas.venue : '',
          date: editId ? editEventDatas.date : '',
          description: editId ? editEventDatas.description : '',
          cost: editId ? editEventDatas.cost : '',
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values) => {
          // data for submit
          values = { ...values, image: image };
          if (editId) {
            // edit data
            editEventData(editId, values);
            history.push('/events');
          } else {
            // add data
            setDataToJson('/event', values);
            history.push('/events');
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
          isSubmitting,
          /* and other goodies */
        }) => (
          <EventForm>
            <form onSubmit={handleSubmit}>
              {editId ? (
                <h5 className="text-decoration-underline">Edit Event</h5>
              ) : (
                <h5 className="text-decoration-underline">Add Event</h5>
              )}

              <div className="mt-3">
                <label>Organisation Name</label>
                <br />
                <select
                  name="organisation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.organisation}
                  style={{ width: '79%', height: '30px' }}
                >
                  <option>Select Organisation</option>
                  {orgData.map((e, index) => {
                    return <option key={index}>{e.name}</option>;
                  })}
                </select>
                {touched.organisation && errors.organisation && (
                  <Span>{errors.organisation}</Span>
                )}
              </div>
              <div className="mt-2">
                <label>Title</label>
                <br />
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                {touched.title && errors.title && <Span>{errors.title}</Span>}
              </div>
              <div>
                <label>Date</label>
                <br />
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.date}
                  style={{ width: '79%', height: '30px' }}
                />
                {touched.date && errors.date && <Span>{errors.date}</Span>}
              </div>
              <div>
                <label>Image</label>
                <br />
                {editId ? (
                  <img
                    src={editEventDatas.image}
                    width="250px"
                    height="150px"
                  />
                ) : null}
                {/* File Uploader */}
                <ImageUploader
                  singleImage={true}
                  withPreview={true}
                  withIcon={false}
                  buttonText="Choose images"
                  onChange={onDrop}
                  imgExtension={['.jpeg', '.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={3242880}
                />
                {/* <Span>{errorMesssage}</Span> */}
              </div>
              <div>
                <label>Venue</label>
                <br />
                <input
                  type="text"
                  name="venue"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.venue}
                />
                {touched.venue && errors.venue && <Span>{errors.venue}</Span>}
              </div>
              <div>
                <label>Description</label>
                <br />
                <input
                  type="text"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {touched.description && errors.description && (
                  <Span>{errors.description}</Span>
                )}
              </div>
              <div>
                <label>Cost</label>
                <br />
                <input
                  type="number"
                  step="0.01"
                  name="cost"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cost}
                />
                {touched.cost && errors.cost && <Span>{errors.cost}</Span>}
              </div>
              <button
                type="submit"
                className="btn btn-light border-primary mt-3"
              >
                Submit
              </button>
              <Link
                to="/events"
                className="btn btn-light border-danger mt-3 ms-3"
              >
                back
              </Link>
            </form>
          </EventForm>
        )}
      </Formik>
    </div>
  );
};

export default Event;
