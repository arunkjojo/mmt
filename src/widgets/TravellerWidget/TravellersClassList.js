import React from "react";
import TravellerClass from "./TravellerClass";
import TravellerCount from "./TravellerCount";
import { useSelector, useDispatch } from "react-redux";
import { changeClassCount } from "../../redux/flightSlice";
import { TravellerData } from "../../DB";
import {
  TravellerClassDiv,
  FlexDiv,
  Button,
  TravellerBody,
  TravellerFooter,
  ErrorMessage,
} from "../../customStyle";

const TravellersClassList = (props) => {
  var error = null;
  const travellerCount = useSelector((state) => state.flight.count);
  const travellerClass = useSelector((state) => state.flight.classes);
  const dispatch = useDispatch();
  const adultHandler = (data) => {
    const adult = data;
    if (
      adult > 0 &&
      travellerCount.children >= 0 &&
      travellerCount.infant >= 0
    ) {
      let total = adult + travellerCount.children + travellerCount.infant;
      dispatch(
        changeClassCount({
          count: {
            adult: adult,
            children: travellerCount.children,
            infant: travellerCount.infant,
            total: total,
          },
        })
      );
    }
  };
  const childrenHandler = (data) => {
    const children = data;
    if (
      travellerCount.adult > 0 &&
      children >= 0 &&
      travellerCount.infant >= 0
    ) {
      let total = travellerCount.adult + children + travellerCount.infant;
      dispatch(
        changeClassCount({
          count: {
            adult: travellerCount.adult,
            children: children,
            infant: travellerCount.infant,
            total: total,
          },
        })
      );
    }
  };
  const infantHandler = (data) => {
    const infant = data;
    if (
      travellerCount.adult > 0 &&
      travellerCount.children >= 0 &&
      infant >= 0
    ) {
      let total = travellerCount.adult + travellerCount.children + infant;
      dispatch(
        changeClassCount({
          count: {
            adult: travellerCount.adult,
            children: travellerCount.children,
            infant: infant,
            total: total,
          },
        })
      );
    }
  };
  const classesHandler = (data) => {
    dispatch(
      changeClassCount({
        classes: data,
      })
    );
  };
  if (travellerCount.infant > travellerCount.adult) {
    error = "Number of infants cannot be more than adults";
  }
  return (
    <TravellerClassDiv>
      <TravellerBody>
        <TravellerCount
          value={travellerCount.adult}
          paragraph="ADULTS (12y +)"
          start={1}
          end={9}
          travellerCounter={adultHandler}
        />
        <FlexDiv>
          <TravellerCount
            marginRight="57px"
            flexColum={true}
            value={travellerCount.children}
            paragraph="CHILDREN (2y - 12y )"
            start={0}
            end={6}
            travellerCounter={childrenHandler}
          />

          <TravellerCount
            flexColum={true}
            marginLeft="0px"
            value={travellerCount.infant}
            paragraph="INFANTS (below 2y)"
            start={0}
            end={6}
            travellerCounter={infantHandler}
          />
        </FlexDiv>
        <TravellerClass
          value={travellerClass}
          data={TravellerData}
          paragraph="CHOOSE TRAVEL CLASS"
          TravellerClassHandler={classesHandler}
        />
      </TravellerBody>
      <TravellerFooter>
        <div>{error && <ErrorMessage size={11}>{error}</ErrorMessage>}</div>
        <Button onClick={props.onApply}>Apply</Button>
      </TravellerFooter>
    </TravellerClassDiv>
  );
};

export default TravellersClassList;
