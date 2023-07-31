import styled from "styled-components";
import TripForm from "./organisms/TripForm";
import TripData from "./organisms/TripData";

import {tripDataMock, tripDataMock2} from './mocks/mock';
import React from "react";

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
    justify-content: center;
    width: 100%;
    height: 100%;

    @media (max-width: 500px) {
      width: 100%;
      flex-direction: column;
    }
  }

  .submit-button{
    width: 100%;
    height: 50px;
    margin: 8px 0 16px 0;
  }

  .file-upload-button, .file-upload-image {
    width: 200px;
    height: 200px;
    background-color: white;
    margin: 0 10px;

    @media (max-width: 500px) { 
      width: 100%;
      margin: 10px 0;
    }
  }

  .file-upload-button:hover {
    background-color: #3f51b5;
    color: white;
  
  }

  .button-width-100 button {
    width: 100%;
    height: 100%;
  }

  .margin-10 {
    margin: 10px 0 20px 0;
    color: #fff;
    text-align: center;
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

  .card-container {
    margin: 20px;
    padding: 20px;
    background-color: #37474f;
  }

  .card-container:hover {
    // background-color: #d33a4c;
  }

  .activities-list p {
    text-align: left;
  }

  .width-100, .width-100 li, .width-100 ul {
    width: 100%;
  }

  .location-links {
    margin: 0 10px 0 0;
    @media (max-width: 768px) {
      margin: 10px 0;
    }
  }

  .label-width {
    width: 30%;
    display: flex;
    @media (max-width: 768px) {
      width: 100%;
    
    }
  }

  .label-values {
    display: flex;
    width: 70%;
    flex-direction: row;
    @media (max-width: 768px) {
      width: 100%;
      flex-direction: column;
    }
  }

  .details-list {
    flex-direction: row;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .travel-option {
    flex-direction: row;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .travel-option-details {
    width: 100%;
  }
`
export function App() {

  const [formView, setFormView] = React.useState(true);
  const [tripData, setTripData] = React.useState()

 const handleViewChange = (data: any) => {
  setFormView(!formView);
  console.log(data);
  setTripData(data)
 }

   return (
    <StyledApp>
      <header className="flex">
        <h1>SnapTrip</h1>
      </header>
      <main>
        {formView && <TripForm handleViewChange={handleViewChange}/> }
        {!formView && tripData && <TripData tripData={tripData}/> }
      </main>
    </StyledApp>
  );
}

export default App;
