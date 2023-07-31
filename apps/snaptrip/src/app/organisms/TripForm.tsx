import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Button,
    FormControl,
    Container,
    Card} from '@material-ui/core';
import ErrorBoundary from '../components/ErrorBoundary';
import FileInput from '../components/FileInput';
import { cityList } from '../mocks/mock';

interface ChildComponentProps {
    handleViewChange: (data: any) => void;
  }

const TripForm: React.FC<ChildComponentProps> = ({ handleViewChange }) => {
    const {
        control, // use "control" from useForm to initialize the controller
        handleSubmit,
        formState: { errors },
    } = useForm();
 
    const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
            //   setCurrentLocation(`${latitude},${longitude}`);
            },
            (error) => {
              console.error('Error getting location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };

    const onSubmit = (data: Record<string, any>) => {
        const formData = new FormData();
        if (data.image) {
            formData.append('inputImage', data.image[0]);
        }
        // const sourceLocation = cityList[Math.floor(Math.random() * cityList.length)];
        const sourceLocation = 'kolkata';
        formData.append('sourceLocation', sourceLocation);
        //handleViewChange(data);
        return fetch("http://127.0.0.1:5000/snaptrip", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              return response.json(); // Parse the response body as JSON and return it
            } else {
              throw new Error("Error fetching data from the SnapTrip API.");
            }
          })
          .then((data) => {
            // Handle successful response data here
            handleViewChange(data);
          })
          .catch((error) => {
            // Handle error
            console.log("Error fetching data:", error.message);
          });
          
    };

    return (
        <Container maxWidth="sm">
            <Card variant="outlined" className='card-container'>
            <ErrorBoundary>
            
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormControl fullWidth error={Boolean(errors.image)} margin="normal">
                        {/* Use Controller for input type="file" */}

                        {/* <FormLabel className='margin-10' >Upload the Snap</FormLabel> */}
                        <FileInput control={control} />

                        {/* {errors.image?.message && (
                <FormHelperText>{errors.image.message}</FormHelperText>
              )} */}
                    </FormControl>

                    
                    <Button type="submit" variant="contained" color="primary" className='submit-button'>
                        Get Itinerary
                    </Button>

                </form>
               
            </ErrorBoundary >
            </Card>
        </Container>
    );
};

export default TripForm;
