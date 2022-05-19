import { Datepicker, START_DATE } from "@datepicker-react/styled";
import React, {useEffect, useRef, useState} from "react";
import { DateWidgetDrop } from "../customStyle";
import { useSelector } from "react-redux";
const DateWidgetBox = (props) => {
    const date = useSelector(state => state.date);
    console.log("DateWidgetBox")
    const [state, setState] = useState({
        startDate: null,
        endDate: null,
        focusedInput: START_DATE,
    });
    
    const singleDateHandler = (event) => {
        // console.log(event.startDate, date.retun)
        setState({
            startDate: event.startDate,
            endDate: date.return,
            focusedInput: event.focusedInput,
        });
        // console.log("single",event);

        // props.onDateChange(event);
        props.onDateChange({
            startDate: event.startDate,
            endDate: date.return,
        })
    }
    const doubleDateHandler = (event) => {
        if (!event.focusedInput) {
            setState({
                ...event,
                focusedInput: START_DATE,
            });
        } else {
            setState(event);
        }
        if(event.startDate !== null && event.endDate !== null){
            // console.log("double",event);
            props.onDateChange(event);
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    });
    let datepickerWrapperRef = useRef(null);
    const [visible, setVisible] = useState(true);
    const handleClickOutside = (event) => {
        console.log("handleClickOutside",new Date())
        if (datepickerWrapperRef.current && !datepickerWrapperRef.current.contains(event.target)) {
            console.log("datepickerWrapperRef pre",new Date())
            setVisible(false);
            props.visible(false)
            console.log("datepickerWrapperRef post",new Date())
        }
    };

    return (
        visible &&
        <DateWidgetDrop
        tabIndex={-1}
        ref={datepickerWrapperRef}>
            {props.trip === "ONEWAY"?(
                <Datepicker
                    tabIndex={-1}
                    exactMinBookingDays={true}
                    showClose={false}
                    showResetDates={false}
                    onDatesChange={(e)=>singleDateHandler(e)}
                    minBookingDate={new Date()}
                    startDate={state.startDate}
                    endDate={null}
                    focusedInput={START_DATE}
                    numberOfMonths={2}
                    firstDayOfWeek={0}
                    minBookingDays={1}
                />
            ):(
                <Datepicker
                    showClose={false}
                    showResetDates={false}
                    onDatesChange={e => doubleDateHandler(e)}
                    minBookingDate={new Date()}
                    startDate={state.startDate}
                    endDate={state.endDate}
                    focusedInput={state.focusedInput}
                    numberOfMonths={2}
                    firstDayOfWeek={0}
                    minBookingDays={1}
                />
            )}
        </DateWidgetDrop>
  );
};

export default DateWidgetBox;
