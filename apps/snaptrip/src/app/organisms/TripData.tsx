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
    hotelName: string;
    address: string;
    hotelLink: string;
    mapLink: string;
}

interface Activity {
    Timings: string;
    Activity: string;
    Place: string;
    BestTime: string;
    travelOption: string;
}

interface Itinerary {
    DayOfTheTrip: number;
    activities: Activity[];
    EstimatedCostForDay: number;
    PlacesToVisit: PlacesToVisitData[];
    FoodSuggestion: FoodSuggestion[];
    HotelSuggestionForTheDay: HotelSuggestionForTheDay[];
}

interface HotelSuggestionForTheDay {
    HotelName: string;
    Address: string;
}

interface FoodSuggestion {
    RestaurantName: string;
    Dish: string;
}

interface PlacesToVisitData {
    place: string;
    imageUrl: string;
}

interface TripData {
    Summary: string;
    Hotels: Hotel[];
    Itinerary: Itinerary[];
    BestTimeToVisit: string;
}

interface Props {
    tripData: TripData;
}

const TripData: React.FC<Props> = ({ tripData }) => {
    const { Summary, Hotels, Itinerary, BestTimeToVisit } = tripData;

    return (
        <Container maxWidth="md">
            <Grid container spacing={2} xs>
                <Grid item xs={12}>
                    <Typography variant="h2" align="left">Summary</Typography>
                    <Typography align="left">{Summary}</Typography>
                </Grid>
                <Divider className='horizontal-divider' />
                <Grid item xs={12}>
                    <Typography variant="h2" align="left">BestTimeToVisit</Typography>
                    <Typography align="left">{BestTimeToVisit}</Typography>
                </Grid>
                <Divider className='horizontal-divider' />
                <Grid item xs={12}>
                    <Typography align="left" variant="h2" >Hotels</Typography>
                    <Grid container spacing={2}>
                        {Hotels.map((hotel, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <section className='hotel-name'>
                                            <IconButton aria-label="name">
                                                <FontAwesomeIcon icon={faBed} />
                                            </IconButton>
                                            <Typography variant="body1" ><a href={hotel.hotelLink} target='_blank'>{hotel.hotelName}</a></Typography>
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
                <Divider className='horizontal-divider' />
                <Grid item xs={12}>
                    <Typography variant="h2">Itinerary</Typography>
                    {Itinerary.map((day, index) => (
                        <Accordion key={index}>
                            <AccordionSummary>
                                <Typography variant="h5" component="h3">Day {day.DayOfTheTrip} Schedule</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='itinerary-container'>
                                <Grid container spacing={2} xs={12} className='activity-container'>
                                    <Grid item xs={12} md={12}>
                                        <List className="width-100">
                                            <Accordion>
                                                <AccordionSummary>
                                                    <ListItemText><strong>Activities</strong></ListItemText>
                                                </AccordionSummary>

                                                {/* Display activities */}
                                                {day.activities.map((activity, activityIndex) => (
                                                    <div key={activityIndex}>
                                                        <ListItem className="activities-list">
                                                            <List>
                                                                <ListItem key={activityIndex}>
                                                                    <ListItemAvatar>
                                                                        <Avatar>
                                                                            <FontAwesomeIcon icon={faMonument} />
                                                                        </Avatar>
                                                                    </ListItemAvatar>
                                                                    <ListItemText primary={activity.Timings} secondary={`${activity.Activity}`} />
                                                                </ListItem>
                                                               
                                                                <ListItem className="travel-option">
                                                                    
                                                                    <ListItemText primary="Location" secondary={`${activity.Place}`} />
                                                                    <ListItemText primary="TravelOption" secondary={`${activity.travelOption}`} />
                                                                </ListItem>
                                                            </List>
                                                        </ListItem>
                                                        <Divider component="li" />
                                                    </div>
                                                ))}
                                            </Accordion>
                                        </List>
                                    </Grid>
                                
                                </Grid>

                                <Grid container spacing={2} xs={12} className='details-container'>
                                    <Grid item xs={12}>
                                        <List>
                                            {/* Display additional information for the day */}
                                            <ListItem> <ListItemText><strong>Estimated Cost for the Day:</strong></ListItemText><ListItemText primary="Cost" secondary={`${day.EstimatedCostForDay} INR`} /></ListItem>
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText><strong>Place to visit</strong></ListItemText>
                                                {day.PlacesToVisit.map((place, index) => (
                                                     <><Typography variant="body1" component="div" className="location-links">
                                                        <a target="_blank" dangerouslySetInnerHTML={{ __html: place.place }} href={`http://127.0.0.1:5000/snaptrip/interestingFacts?location=${place.place},imagePath=${place.imageUrl}`} />
                                                    </Typography>
                                                    {/* <ListItemText key={index} primary={`Place ${index + 1}:`} secondary={`${`<span>${place.place}</span>`}`} /> */}
                                                    </>
                                                ))}
                                            </ListItem>
                                            {/* <ListItem><ListItemText primary="Places to Visit for the Day:" secondary={day.placesToVisit} /></ListItem> */}
                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText><strong>Food Suggestion</strong></ListItemText>
                                                {day.FoodSuggestion.map((food, index) => (

                                                    <ListItemText key={index} primary={food.RestaurantName} secondary={food.Dish} />
                                                ))}
                                            </ListItem>
                                            {/* <ListItem><ListItemText primary="Food Suggestion for the Day:" secondary={day.FoodSuggestion} /></ListItem> */}

                                            <Divider component="li" />
                                            <ListItem>
                                                <ListItemText><strong>Hotel  Suggestion</strong></ListItemText>
                                                {day.HotelSuggestionForTheDay.map((hotel, index) => (

                                                    <ListItemText key={index} primary={hotel.HotelName} secondary={hotel.Address} />

                                                ))}
                                            </ListItem>
                                            {/* <ListItem><ListItemText primary="Restaurant Suggestion for the Day:" secondary={day.restaurantSuggestion} /></ListItem> */}
                                            <Divider component="li" />
                                            {/* <ListItem><ListItemText primary="Hotel Suggestion for the Day:" secondary={day.hotelSuggestionForTheDay} /></ListItem> */}
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
