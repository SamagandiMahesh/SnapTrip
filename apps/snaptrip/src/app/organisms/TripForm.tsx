import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField,
    Select,
    MenuItem,
    Button,
    Slider,
    Chip,
    FormControl,
    InputLabel,
    Box,
    FormLabel,
    Container,
    Grid,
    OutlinedInput
} from '@material-ui/core';
import ErrorBoundary from '../components/ErrorBoundary';
import { cityList, marks } from '../mocks/mock';
import FileInput from '../components/FileInput';

interface ChildComponentProps {
    handleViewChange: (data: any) => void;
  }

const TripForm: React.FC<ChildComponentProps> = ({ handleViewChange }) => {
    const {
        control, // use "control" from useForm to initialize the controller
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [toDoTripThings, setToDoTripThings] = useState<string[]>([]); // Update to an array
    const [dislikes, setDislikes] = useState<string[]>([]);
   
    const valuetext = (value: number) => {
        return `${value}`;
    }

    const onSubmit = (data: Record<string, any>) => {
        const formData = new FormData();
        if (data.image) {
            formData.append('inputImage', data.image[0]);
        }
        // formData.append('image', data.image[0]);
        formData.append('duration', data.duration);
        formData.append('sourceLocation', data.sourceLocation);
        formData.append('budget', data.budget);
        formData.append('budgetCurrency', data.budgetCurrency);
        formData.append('toDoTripThings', JSON.stringify(toDoTripThings));
        formData.append('dislikes', JSON.stringify(dislikes));
        formData.append('type', JSON.stringify(data.type));
        console.log(formData, data, errors);

        handleViewChange(data);

        return fetch("/api/recipes/create", {
            method: "POST",
            body: formData,
          }).then((response) => {
            if (response.ok) {
              // Handle successful upload
            } else {
              // Handle error
            }
          });
    };

    const handleAddToDoTripThing = () => {
        console.log(toDoTripThings)
        const newToDoTripThing = watch('newToDoTripThing');
        if (newToDoTripThing.trim() !== '') {
            setToDoTripThings((prevToDoTripThings) => [...prevToDoTripThings, newToDoTripThing.trim()]);
        }
    };

    const handleDeleteToDoTripThing = (index: number) => {
        const updatedToDoTripThings = [...toDoTripThings];
        updatedToDoTripThings.splice(index, 1);
        setToDoTripThings(updatedToDoTripThings);
    };

    const handleAddDislike = () => {
        console.log(dislikes)
        const newDislike = watch('newDislike');
        if (newDislike.trim() !== '') {
            setDislikes([...dislikes, newDislike.trim()]);
        }
    };

    const handleDeleteDislike = (index: number) => {
        const updatedDislikes = [...dislikes];
        updatedDislikes.splice(index, 1);
        setDislikes(updatedDislikes);
    };

    return (
        <Container maxWidth="sm">
            <ErrorBoundary>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormControl fullWidth error={Boolean(errors.image)} margin="normal">
                        {/* Use Controller for input type="file" */}

                        <FormLabel className='margin-10' >Upload the Snap</FormLabel>
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
                                        getAriaValueText={valuetext}
                                    />
                                </>
                            )}
                        />
                        {/* <FormHelperText>{errors.duration?.message}</FormHelperText> */}
                    </FormControl>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={Boolean(errors.sourceLocation)} margin="normal" variant="outlined">
                                    <InputLabel id="source-location">From</InputLabel>
                                    {/* Use Controller for Select */}
                                    <Controller
                                        name="sourceLocation"
                                        control={control}
                                        defaultValue={[]}
                                        rules={{ required: 'Source Location is required' }}
                                        render={({ field }) => (
                                            <>
                                                <Select
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    labelId="source-location"
                                                    label="Location"
                                                    id="source-location"
                                                >
                                                    {cityList.map((city) => (
                                                        <MenuItem key={city} value={city}>
                                                            {city}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </>
                                        )}
                                    />
                                    {/* {errors.sourceLocation && typeof errors.sourceLocation === 'string' && (
            <FormHelperText>{errors.sourceLocation?.message}</FormHelperText>
          )} */}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth margin="normal"  variant="outlined">
                                    <InputLabel id="type-label">Type</InputLabel>
                                    {/* Use Controller for Select (multiple) */}
                                    <Controller
                                        name="type"
                                        control={control}
                                        defaultValue={[]}
                                        render={({ field }) => (
                                            <>
                                                <Select
                                                    multiple
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    labelId="type-label"
                                                    id="type-label"
                                                    input={<OutlinedInput label="Name" />}
                                                    // renderValue={(selected: any) => (
                                                    //     <div>
                                                    //         {selected.map((value: any) => (
                                                    //             <Chip key={value} label={value} />
                                                    //         ))}
                                                    //     </div>
                                                    // )}
                                                >
                                                    <MenuItem value="adventure">Adventure</MenuItem>
                                                    <MenuItem value="beach">Beach</MenuItem>
                                                    <MenuItem value="city">City</MenuItem>
                                                    <MenuItem value="nature">Nature</MenuItem>
                                                </Select>
                                            </>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>

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


                    <Box className='button-width-100'>
                        <Box sx={{ my: 2, display: 'flex' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={9} md={9}>
                                    <FormControl fullWidth error={Boolean(errors.newToDoTripThing)}>
                                        <Controller
                                            name="newToDoTripThing"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    id="newToDoTripThing"
                                                    name="newToDoTripThing"
                                                    label="Add To-Do Trip Thing"
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    variant="outlined"
                                                    autoComplete='off'
                                                />
                                            )}
                                        />
                                        {/* {errors.newToDoTripThing && (
          <FormHelperText>{errors.newToDoTripThing.message}</FormHelperText>
        )} */}
                                    </FormControl>
                                </Grid>
                                <Grid item xs md>
                                    <Button variant="contained" color="primary" onClick={handleAddToDoTripThing}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <div>
                            {toDoTripThings.map((thing, index) => (
                                <Chip
                                    key={index}
                                    label={thing}
                                    onDelete={() => handleDeleteToDoTripThing(index)}
                                    style={{ margin: '0.5rem' }}
                                />
                            ))}
                        </div>
                    </Box>
                    <Box className='button-width-100'>
                        <Box sx={{ my: 2, display: 'flex' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={9} md={9}>
                                    <FormControl fullWidth error={Boolean(errors.newDislike)}>
                                        <Controller
                                            name="newDislike"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    id="newDislike"
                                                    name="newDislike"
                                                    label="Add Dislike"
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    variant="outlined"
                                                    autoComplete='off'
                                                />
                                            )}
                                        />
                                        {/* {errors.newDislike && (
            <FormHelperText>{errors.newDislike.message}</FormHelperText>
            )} */}
                                    </FormControl>
                                </Grid>
                                <Grid item xs md>
                                    <Button variant="contained" color="primary" onClick={handleAddDislike}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <div>
                            {dislikes.map((dislike, index) => (
                                <Chip
                                    key={index}
                                    label={dislike}
                                    onDelete={() => handleDeleteDislike(index)}
                                    style={{ margin: '0.5rem' }}
                                />
                            ))}
                        </div>
                    </Box>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>

                </form>
            </ErrorBoundary >
        </Container>
    );
};

export default TripForm;
