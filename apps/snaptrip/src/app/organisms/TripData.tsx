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
    HotelName: string;
    Address: string;
    Website: string;
    MapLink?: string;
}

interface Activity {
    Timings: string;
    Activity: string;
    Place: string;
    BestTime?: string;
    TravelOption: string;
}

interface Itinerary {
    DayOfTheTrip: string | number;
    Activities: Activity[];
    EstimatedCostForDay: string | number;
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
    Budget: string;
}

interface Props {
    tripData: TripData;
}

const TripData: React.FC<Props> = ({ tripData }) => {
    const { Summary, Hotels, Itinerary, BestTimeToVisit, Budget } = tripData;

    return (
        <Container maxWidth="md" >
            <Grid container spacing={2} xs>
                <Grid item xs={12}>
                    <Typography variant="h2" align="left">Summary</Typography>
                    <Typography align="left">{Summary}</Typography>
                </Grid>
                <Divider className='horizontal-divider' />
                <Grid item xs={12}>
                    <Typography variant="h2" align="left">Budget</Typography>
                    <Typography align="left">{Budget}</Typography>
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
                                            <Typography variant="body1" ><a href={hotel.Website} target='_blank'>{hotel.HotelName}</a></Typography>
                                        </section>
                                        <section className='hotel-address'>
                                            <IconButton aria-label="location">
                                                <FontAwesomeIcon icon={faLocationDot} />
                                            </IconButton>
                                            <Typography variant="body1">{hotel.Address}</Typography>
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
                                <Typography variant="h5" component="h3">{day.DayOfTheTrip} Schedule</Typography>
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
                                                {day.Activities.map((activity, activityIndex) => (
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
                                                                    
                                                                    <ListItemText className="travel-option-details" primary="Location" secondary={`${activity.Place}`} />
                                                                    <ListItemText className="travel-option-details" primary="TravelOption" secondary={`${activity.TravelOption}`} />
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
                                            <ListItem> <ListItemText className='label-width'><strong>Estimated Cost for the Day</strong></ListItemText><ListItemText className='label-values'  primary={`${day.EstimatedCostForDay} INR`} /></ListItem>
                                            <Divider component="li" />
                                            <ListItem className='details-list'>
                                                <ListItemText className='label-width'><strong>Place to visit</strong></ListItemText>
                                                <Box className='label-values'>
                                                {day.PlacesToVisit.map((place, index) => (
                                                     <><ListItemText className="location-links">
                                                        <a target="_blank" dangerouslySetInnerHTML={{ __html: place.place }} href={`http://127.0.0.1:5000/snaptrip/interestingFacts?location=${place.place},imagePath=${place.imageUrl}`} />
                                                    </ListItemText>
                                                   
                                                    </>
                                                ))}
                                                </Box>
                                            </ListItem>
                                            <Divider component="li" />
                                            <ListItem className='details-list'>
                                                <ListItemText className='label-width'><strong>Food Suggestion</strong></ListItemText>
                                                <Box className='label-values'>
                                                {day.FoodSuggestion.map((food, index) => (

                                                    <ListItemText key={index} primary={food.RestaurantName} secondary={food.Dish} />
                                                ))}
                                                </Box>
                                            </ListItem>
                                            
                                            <Divider component="li" />
                                            <ListItem className='details-list'> 
                                                <ListItemText className='label-width'><strong>Hotel  Suggestion</strong></ListItemText>
                                                <Box className='label-values'>
                                                {day.HotelSuggestionForTheDay.map((hotel, index) => (
                                                    <ListItemText key={index} primary={hotel.HotelName} secondary={hotel.Address} />
                                                ))}
                                                </Box>
                                            </ListItem>
                                            <Divider component="li" />
                                            </List>
                                    </Grid>
                                </Grid>

                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>
                <Divider className='horizontal-divider' />
                <Grid item xs={12}>
                    <Typography variant="h2" align="left">Best Time To Visit</Typography>
                    <Typography align="left">{BestTimeToVisit}</Typography>
                </Grid>
                
            </Grid>
        </Container>
    );
};

export default TripData;
