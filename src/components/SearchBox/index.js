import React, { useState } from "react";
import DateWidget from "../../widgets/DateWidget";
import LocationWidget from "../../widgets/LocationWidget";
import TravellerWidget from "../../widgets/TravellerWidget";
import { SearchBoxDiv, SpinCircle, SpinIcon,  } from "../../customStyle";
import { useSelector, useDispatch } from "react-redux";
import { toggleLocation } from "../../redux/locationSlice";
import { changeTrip } from "../../redux/tripSlice";
import { changeDate } from "../../redux/dateSlice";
import MultiCity from "./MultiCity";
import DateWidgetBox from "../../widgets/DateWidgetBox";

const SearchBox = () => {
  const dispatch = useDispatch();
  const tripType = useSelector(state => state.tripType.tripType);
  const locationValue = useSelector(state => state.location);
  const dateValue = useSelector(state => state.date);

  // const [dateVisibility, setDateVisibility] = useState(false);
  // const [fromVisibility, setFromVisibility] = useState(false);
  // const [toVisibility, setToVisibility] = useState(false);
  // const [travellerVisibility, setTravellerVisibility] = useState(false);

  const [visibility, setVisibility] = useState({
    depature:false,
    return:false,
    from:false,
    to:false,
    traveller:false
  });

  const getDifferenceInDate = (date1, date2) => {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  const toggleLocationHandler = () => {
    dispatch(toggleLocation(locationValue));
  }

  function depatureDateHandler() {

    setVisibility({
      date:true,
      from:false,
      to:false,
      traveller:false
    });

    console.log("depatureDateHandler",visibility);
    
    // setDateVisibility(true);
    // setFromVisibility(false);
    // setToVisibility(false);
    // setTravellerVisibility(false);

  }

  function returnDateHandler() {

    setVisibility({
      date:true,
      from:false,
      to:false,
      traveller:false
    });

    console.log("returnDateHandler",visibility)

    dispatch(changeTrip({
      tripType:"ROUND TRIP"
    }));
  }
  
  function fromLocationHandler() {

    setVisibility({
      date:false,
      from:true,
      to:false,
      traveller:false
    });

    console.log("fromLocationHandler",visibility)
  }

  function toLocationHandler() {
    
    setVisibility({
      date:false,
      from:false,
      to:true,
      traveller:false
    });
    
    console.log("toLocationHandler",visibility)
  }

  function travellerHandler() {
    
    setVisibility({
      date:false,
      from:false,
      to:false,
      traveller:true
    });
    
    console.log("travellerHandler",visibility)
  }

  function locationChangeHandler(type, location){
    // console.log(type, location);
    if(type==='from')
      
      setVisibility({
        date:false,
        from:false,
        to:true,
        traveller:false
      });
    if(type==='to')
      setVisibility({
        date:true,
        from:false,
        to:false,
        traveller:false
      });
    
    console.log("locationChangeHandler",visibility)
  }

  function dateHandler(data) {
    
    if(data.startDate !== null && data.endDate !== null){

      setVisibility({
        date:false,
        from:false,
        to:false,
        traveller:false
      });
    
      console.log("dateHandler",visibility)

      dispatch(
        changeDate({
          departure: data.startDate,
          return: data.endDate,
        })
      );
    }
  }

  function dateVisibleHandler() {
    setVisibility({
      date:false,
      from:false,
      to:false,
      traveller:false
    });
    
    console.log("visibleHandler",visibility)

  }
  
  function travellerVisibilityHandler() {
    setVisibility({
      date:false,
      from:false,
      to:false,
      traveller:false
    });
    
    console.log("travellerVisibilityHandler",visibility)
  }

  return (
    tripType=== 'MULTI CITY' 
    ? (
      <MultiCity />
    )
    : (
      <SearchBoxDiv>
        <LocationWidget
          label="From"
          widthValue="300px"
          primaryKey="from"
          id={locationValue.from.id}
          name={locationValue.from.name}
          country={locationValue.from.country}
          description={locationValue.from.description}
          code={locationValue.from.code}
          expand={visibility.from}
          onClick={fromLocationHandler} 
          onLocationChange={(data)=>locationChangeHandler('from', data)}
        />
        <SpinCircle onClick={(e)=>{
          e.preventDefault();
          toggleLocationHandler()
        }}>
          <SpinIcon/>
        </SpinCircle>
        <LocationWidget
          label="To"
          widthValue="300px"
          primaryKey="to"
          id={locationValue.to.id}
          name={locationValue.to.name}
          country={locationValue.to.country}
          description={locationValue.to.description}
          code={locationValue.to.code}
          expand={visibility.to}
          onClick={toLocationHandler}
          onLocationChange={(data)=>locationChangeHandler('to', data)}
        />
        <DateWidget
          primaryKey="from"
          label="Departure"
          expand={visibility.depature}
          onClick={depatureDateHandler}
          date={new Date(dateValue.departure)}
          widthValue="158px"
        />
        <DateWidget
          disAble={tripType === "ONEWAY"}
          primaryKey="to"
          label="Return"
          expand={visibility.return}
          onClick={returnDateHandler}
          date={new Date(dateValue.return)}
          widthValue="158px"
          error={getDifferenceInDate(new Date(dateValue.return), new Date(dateValue.departure))}
        />
        {visibility.date && (
          <DateWidgetBox 
            trip={tripType}
            tabIndex="-1"
            visible={dateVisibleHandler}
            onDateChange={dateHandler}
          />
        )}
        <TravellerWidget
          expand={visibility.traveller}
          onClick={travellerHandler}
          widthValue="260px"
          visible={travellerVisibilityHandler}
        />
      </SearchBoxDiv>
    )
  );
};
export default SearchBox;
