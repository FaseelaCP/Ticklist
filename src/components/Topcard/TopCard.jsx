import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import BestsellerTag from '../BestSeller/pages';
import RecommendedTag from '../Recommended/pages';
import venuesImage from '../../../src/assets/venues.jpg';

const TopCard = ({ event, attraction, venue }) => {
  return (
    <div>
      {event && (
        <Link to={`/events/${event.id}`} style={{ textDecoration: 'none', width: '100%' }}>
          <Card sx={{ position: 'relative', maxWidth: 345, height: 260, borderRadius: '10px', display: 'flex', flexDirection: 'column' }}>
            <BestsellerTag />
            {event.images && event.images.length > 0 && (
              <CardMedia
                component="img"
                alt={event.name}
                height="140"
                image={event.images[0].url}
                sx={{ objectFit: 'cover', maxHeight: '50%' }}
              />
            )}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: 80 }}>
                {event.name}
              </Typography>
              {event.dates && event.dates.start && (
                <Typography variant="body2">{event.dates.start.localDate}</Typography>
              )}
            </CardContent>
          </Card>
        </Link>
      )}

      {attraction && (
        <Link to={`/attractions/${attraction.id}`} style={{ textDecoration: 'none', width: '100%' }}>
          <Card sx={{ position: 'relative', maxWidth: 345, height: 260, borderRadius: '10px', display: 'flex', flexDirection: 'column' }}>
            {attraction.images && attraction.images.length > 0 && (
              <CardMedia
                component="img"
                alt={attraction.name}
                height="140"
                image={attraction.images[0].url}
                sx={{ objectFit: 'cover', maxHeight: '50%' }}
              />
            )}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="div" sx={{ overflow: 'hidden', textAlign: 'center', textOverflow: 'ellipsis', maxHeight: 80 }}>
                {attraction.name}
              </Typography>
              {attraction.classifications && attraction.classifications.genre && (
                <Typography variant="body2">{attraction.classifications.genre[0].name}</Typography>
              )}
            </CardContent>
          </Card>
        </Link>
      )}

      {venue && (
        <Link to={`/venues/${venue.id}`} style={{ textDecoration: 'none', width: '100%' }}>
          <Card sx={{ maxWidth: 345, height: 260, borderRadius: '10px', display: 'flex', flexDirection: 'column' }}>
            {venue.images && venue.images.length > 0 && (
              <CardMedia
                component="img"
                alt={venuesImage}
                height="140"
                image={venue.images[0].url}
                sx={{ objectFit: 'cover', maxHeight: '50%' }}
              />
            )}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: 80 }}>
                {venue.name}
              </Typography>
              {venue.city && (
                <Typography variant="body" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: 80 }}>
                  {venue.city.name}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Link>
      )}
    </div>
  );
};

export default TopCard;
