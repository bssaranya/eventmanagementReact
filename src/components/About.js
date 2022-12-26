import React from 'react';
import styled from 'styled-components';

const Abouts = styled.div`
  width: 80%;
  height: 430px;
  margin: auto;
  margin-top: 5%;
`;
const About = () => {
  return (
    <div>
      <Abouts>
        <h3 className="text-muted">About Us</h3>
        <h5 className="mt-3">Our philosophy.</h5>
        <p>
          Event Planner Ltd is an event logistics and marketing company which
          was formed back in 2013. The company offers A-Z event planning
          services from a team of experienced and energetic event planners,
          suppliers, venues and more. One of the main reasons behind the success
          of Event Planner is the fact that the team does not charge fees to its
          clients! With the number of events we organise, Event Planner Ltd does
          not need to add exorbitant fees and mark-ups to make its profit
          margins. This ensures that our clients list, which is constantly
          growing, make regular use of our services.
        </p>
        <h5 className="mt-5">The Team</h5>
        <p>
          The Event Planner team is made up of a mix of people. James and Ilona
          take care of corporate events. Josette is the wedding guru. Nicole is
          the creative one. Sergio is the merchandise expert. In addition to
          this group of people, a large support team helps out in everything the
          company does, in office work to on-site logistics planning. One thing
          we can truly say about our team is that we are very passionate about
          our job!
        </p>
      </Abouts>
    </div>
  );
};

export default About;
