import styled from "styled-components";
import TripForm from "./organisms/TripForm";
import TripData from "./organisms/TripData";

import {tripDataMock} from './mocks/mock';
import React from "react";
import { set } from "lodash";

const StyledApp = styled.div`
  font-family: sans-serif;
  min-width: 300px;
  max-width: 100%;
  margin: 50px auto;

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  header {
    background-color: Gray;
    color: white;
    padding: 5px;
    border-radius: 3px;
  }

  main {
    padding: 0 36px;
  }

  p {
    text-align: center;
  }

  h1 {
    text-align: center;
    margin-left: 18px;
    font-size: 24px;
  }

  h2 {
    text-align: center;
    font-size: 20px;
    margin: 40px 0 10px 0;
  }

  .file-input {
    display: flex;
    padding: 0;
    justify-content: space-between;
  }

  .file-upload-button, .file-upload-image {
    width: 200px;
    height: 200px;
  }

  .button-width-100 button {
    width: 100%;
    height: 100%;
  }

  .margin-10 {
    margin: 10px 0;
  }

  .itinerary-container {
    flex-direction: column;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }
  .details-container p {
    text-align: left;
  }

  .itinerary-container .activity-container {
    padding-top: 10px;
  }
  .itinerary-container .activity-container,
  .itinerary-container .details-container {

  }

  .hotel-name, .hotel-address {
    display: flex;
    align-items: center;
  }

  .hotel-address p {
    text-align: left;
  }

  .horizontal-divider {
    width: 100%;
    margin-top: 40px;
  }
`;

export function App() {

  const [formView, setFormView] = React.useState(true);
  const [tripData, setTripData] = React.useState(tripDataMock)

 const handleViewChange = (data: any) => {
  setFormView(!formView);
  console.log(data);
  setTripData(tripDataMock)
 }

   return (
    <StyledApp>
      <header className="flex">
        <h1>SnapTrip</h1>
      </header>
      <main>
        {formView && <TripForm handleViewChange={handleViewChange}/> }
        {!formView && <TripData tripData={tripData}/> }
      </main>
    </StyledApp>
  );
}

export default App;
