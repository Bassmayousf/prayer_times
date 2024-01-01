// import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// eslint-disable-next-line react/prop-types
export default function PrayerCards({image,prayer,time}) {
  return (
    <div>
      <Card sx={{ maxWidth: 345 ,minWidth: 270,height:270}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{color:"#27d20a",fontWeight:"bold",textTransform:"capitalize"}}>
            {prayer}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{fontSize:"33px" ,color:"#a29696"}}>
            {time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>  
    </div>
  );
}
