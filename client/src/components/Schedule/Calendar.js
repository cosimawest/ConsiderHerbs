//////////Calandar

import React, { useState } from 'react';
import Events from './Events.js'

const Calendar = (props) => {
    // const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const [render, forceRender] = useState(0);

    const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    let today = new Date(new Date().setHours(0, 0, 0, 0));

   
    
    let DAYS_OF_THE_WEEK = [
        {
            day: 'SUN',
            num: 0,
            date: '',
        },
        {
            day: 'MON',
            num: 1,
            date: '',
        },
        {
            day: 'TUE',
            num: 2,
            date: '',
        },
        {
            day: 'WED',
            num: 3,
            date: '',
        },
        {
            day: 'THU',
            num: 4,
            date: '',
        },
        {
            day: 'FRI',
            num: 5,
            date: new Date(),
        },
        {
            day: 'SAT',
            num: 6,
            date: new Date(),
        },
    ];

    let initDates = () => {
        console.log("render:", render)
        if(render === 0){
        DAYS_OF_THE_WEEK.forEach(element => {
            element.date = new Date(today.getTime() + (element.num - today.getDay()) * 24 * 60 * 60 * 1000);
        })
    }
    }
    let nextWeek = () => {
        console.log("nweek")
        DAYS_OF_THE_WEEK.forEach(element => {
            element.date = new Date(new Date(element.date).getTime() + (7 * 24 * 60 * 60 * 1000))
        })
    }

    let lastWeek = () => {
        console.log("lweek")
        DAYS_OF_THE_WEEK.forEach(element => {
            let old = new Date(element.date);
            element.date = new Date(old.getTime() - (7 * 24 * 60 * 60 * 1000))
        })
        forceRender(render+1);
        console.log(DAYS_OF_THE_WEEK)
    }

    // let isLeapYear = (year) => {
    //     return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    // }
    // let days = isLeapYear ? DAYS_LEAP : DAYS;

    return (
        <div className="calendar">
            <div className="calendarHeader">
                <button className="changeWeek" onClick={lastWeek}> Last Week </button>
                <h1 className="CalandarTitle">{MONTHS[today.getMonth()]}</h1>
                <button className="changeWeek" onClick={nextWeek}> Next Week </button>
            </div>

            {initDates()}
            {DAYS_OF_THE_WEEK.map(day => {
                return (
                    <div className="dayCol">
                        <h2 className="dayLabel">{day.day}</h2>
                        <p>{typeof new Date(day.date)}</p>
                        <p>{new Date(day.date).getDate()}</p>
                        <Events className="EventinCol" date={day.date} />
                    </div>
                )
            })
            }
        </div>
    )
}

export default Calendar;

