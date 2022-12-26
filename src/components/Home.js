import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  height: 400px;
  /* margin-top: 10px; */
`;
const About = styled.div`
  width: 90%;
  height: 250px;
  margin: auto;
  margin-top: 5%;
`;
const Home = () => {
  return (
    <div>
      <ImageContainer>
        <img
          src="https://media.istockphoto.com/id/1350787994/photo/light-bulbs-with-event-management-concept.jpg?b=1&s=170667a&w=0&k=20&c=GvH8NqOq5dU3AIPCsKIoXLkD8SijfcJiB0VhnS5RUV8="
          width="100%"
          height="100%"
        />
      </ImageContainer>
      <About>
        <h3>About Us</h3>
        <p>
          Our philosophy. Event Planner Ltd is an event logistics and marketing
          company which was formed back in 2013. The company offers A-Z event
          planning services from a team of experienced and energetic event
          planners, suppliers, venues and more. One of the main reasons behind
          the success of Event Planner is the fact that the team does not charge
          fees to its clients! With the number of events we organise, Event
          Planner Ltd does not need to add exorbitant fees and mark-ups to make
          its profit margins. This ensures that our clients list, which is
          constantly growing, make regular use of our services.
        </p>
      </About>
    </div>
  );
};

export default Home;
