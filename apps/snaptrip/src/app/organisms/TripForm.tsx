import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Button,
    FormControl,
    Container,
    Card,
    Box,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    TextField} from '@material-ui/core';
import ErrorBoundary from '../components/ErrorBoundary';
import FileInput from '../components/FileInput';
import { cityList, marks } from '../mocks/mock';

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
        formData.append('duration', data.duration);
        formData.append('budget', data.budget);
        formData.append('budgetCurrency', data.budgetCurrency);
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

                    <FormControl fullWidth error={Boolean(errors.duration)} margin="normal">
                        {/* Use Controller for Slider */}
                        <FormLabel>Duration</FormLabel>
                        <Controller
                            name="duration"
                            control={control}
                            defaultValue={1}
                            rules={{
                                required: 'Duration is required',
                                min: { value: 1, message: 'Duration should be at least 1' },
                                max: { value: 15, message: 'Duration should be at most 15' },
                            }}
                            render={({ field }) => (
                                <>
                                    <Slider
                                        id="duration"
                                        name="duration"
                                        value={field.value}
                                        onChange={(_, value) => field.onChange(value)}
                                        defaultValue={1}
                                        step={1}
                                        marks={marks}
                                        min={1}
                                        max={15}
                                        valueLabelDisplay="auto"
                                    />
                                </>
                            )}
                        />
                        {/* <FormHelperText>{errors.duration?.message}</FormHelperText> */}
                    </FormControl>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={Boolean(errors.budget)} margin="normal">
                                    {/* Use Controller for TextField */}
                                    <Controller
                                        name="budget"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: 'Budget is required' }}
                                        render={({ field }) => (
                                            <>
                                                <TextField
                                                    id="budget"
                                                    name="budget"
                                                    type="number"
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    label="Budget"
                                                    variant="outlined"
                                                />
                                            </>
                                        )}
                                    />
                                    {/* {errors.budget?.message && (
                <FormHelperText>{errors.budget.message}</FormHelperText>
              )} */}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth margin="normal" error={Boolean(errors.budgetCurrency)} variant='outlined'>
                                    <InputLabel id="budget-currency-label">Budget Currency</InputLabel>
                                    {/* Use Controller for Select */}
                                    <Controller
                                        name="budgetCurrency"
                                        control={control}
                                        defaultValue="usd"
                                        render={({ field }) => (
                                            <>
                                                <Select
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    labelId="budget-currency-label"
                                                    id="budget-currency-label"
                                                    label="Budget Currency"
                                                >

                                                    <MenuItem value="usd">USD</MenuItem>
                                                    <MenuItem value="eur">EUR</MenuItem>
                                                    <MenuItem value="gbp">GBP</MenuItem>
                                                    <MenuItem value="inr">INR</MenuItem>
                                                </Select>
                                            </>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>



                    
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
