import React from 'react';
import {
    Grid,
    Typography,
    Card,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Box,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar,
    ListItemAvatar
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faLocationDot, faMonument } from '@fortawesome/free-solid-svg-icons'

interface Hotel {
    name: string;
    address: string;
}

interface Activity {
    fromTime: string;
    toTime: string;
    activity: string;
    place: string;
    travelOption: string;
}

interface Itinerary {
    day: string;
    activities: Activity[];
    estimatedCostForDay: string;
    placesToVisit: string;
    foodSuggestion: string;
    restaurantSuggestion: string;
    hotelSuggestionForTheDay: string;
}

interface TripData {
    summary: string;
    hotels: Hotel[];
    itinerary: Itinerary[];
}

interface Props {
    tripData: TripData;
}

const TripData: React.FC<Props> = ({ tripData }) => {
    const { summary, hotels, itinerary } = tripData;

    return (
        <Container maxWidth="md">
            <Grid container spacing={2} xs>
                <Grid item xs={12}>
                    <Typography variant="h2" align="left">Summary</Typography>
                    <Typography align="left">{summary}</Typography>
                </Grid>
                <Divider className='horizontal-divider'/>
                <Grid item xs={12}>
                    <Typography align="left" variant="h2" >Hotels</Typography>
                    <Grid container spacing={2}>
                        {hotels.map((hotel, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <section className='hotel-name'>
                                            <IconButton aria-label="name">
                                                <FontAwesomeIcon icon={faBed} />
                                            </IconButton>
                                            <Typography variant="body1" >{hotel.name}</Typography>
                                        </section>
                                        <section className='hotel-address'>
                                            <IconButton aria-label="location">

                                                <FontAwesomeIcon icon={faLocationDot} />
                                            </IconButton>
                                            <Typography variant="body1">{hotel.address}</Typography>
                                        </section>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Divider className='horizontal-divider'/>
                <Grid item xs={12}>
                    <Typography variant="h2">Itinerary</Typography>
                    {itinerary.map((day, index) => (
                        <Accordion key={index}>
                            <AccordionSummary>
                                <Typography variant="subtitle1" component="h3">{day.day} schedule</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='itinerary-container'>
                                <Grid container spacing={2} xs={12} className='activity-container'>
                                    <Grid item xs={12} md={6}>
                                    <List >
                                        <ListItem><ListItemText primary="Activities" /></ListItem>
                                        <Divider component="li" />
                                        
                                        {/* Display activities */}
                                       
                                            {day.activities.map((activity, activityIndex) => (
                                                <>
                                                    <ListItem key={activityIndex}>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <FontAwesomeIcon icon={faMonument} />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={`${activity.fromTime} - ${activity.toTime}`} secondary={`${activity.activity}`} />
                                                    </ListItem>
                                                    <Divider component="li"  variant="inset"/>
                                                </>
                                            ))}
                                        </List>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item xs={12} md={5}>
                                        <Typography variant="h6"><strong>Image</strong></Typography>
                                        {/* Image upload component goes here */}
                                        <img src="image_url_here" alt="Uploaded Image" />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} xs={12} className='details-container'>
                                    <Grid item xs={12}>
                                        <List>
                                        {/* Display additional information for the day */}
                                        <ListItem><ListItemText primary="Estimated Cost for the Day:" secondary={`${day.estimatedCostForDay} INR`} /></ListItem>
                                        <Divider component="li" />
                                        <ListItem><ListItemText primary="Places to Visit for the Day:" secondary={day.placesToVisit} /></ListItem>
                                        <Divider component="li" />
                                        <ListItem><ListItemText primary="Food Suggestion for the Day:" secondary={day.foodSuggestion} /></ListItem>
                                        <Divider component="li" />
                                        <ListItem><ListItemText primary="Restaurant Suggestion for the Day:" secondary={day.restaurantSuggestion} /></ListItem>
                                        <Divider component="li" />
                                        <ListItem><ListItemText primary="Hotel Suggestion for the Day:" secondary={day.hotelSuggestionForTheDay} /></ListItem>
                                        </List>
                                    </Grid>
                                </Grid>

                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
};

export default TripData;
