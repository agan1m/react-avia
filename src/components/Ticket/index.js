import React, { Component } from 'react';
import styled from "styled-components";

import  './style.css';

const TicketWrap = styled.div`
    width: 556px;
    height: 161px;
    border-radius: 5px;
    box-shadow: 0 1px 4px rgba(91, 137, 164, 0.25);
    background-color: #ffffff;
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Open Sans', sans-serif;
`
const TicketLeft = styled.div`
    width: 30%;
    padding: 20px;
    display: flex;
    border-right: 1px solid #eceff1;
    align-items: flex-end;
        button {
            background-color: #ff6d00;
            border: 0;
            padding: 6px 38px;
            border-radius: 5px;
            box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1), 0 1px 0 #d64d08;
            color: #ffffff;
            font-size: 16px;
            font-weight: 400;
            :hover {
                background-color: #ff8124;
                cursor: pointer;
            }
        }
`
const TicketDep = styled.div`
    padding-top: 25px;
    padding-left: 25px
`

const  TicketStops = styled.div`
    padding-top: 25px;
`
const TicketArrival = styled.div`
    text-align: right;
    padding-top: 25px;
    padding-right: 25px;
        
`
const Time = styled.p`
    font-size: 32px;
    line-height: 26px;
    color: #4a4a4a;
    margin: 0;
`
const City = styled.p`
    color: #4a4a4a;
    font-size: 12px;
    line-height: 18px;
    margin: 0;
    margin-top: 5px;
    margin-left: 4px;
`
const DateStyle = styled.p`
    color: #8b9497;
    margin: 0;
    font-size: 12px;
    margin-left: 4px;
`
const Stops = styled.p`
    color: #8b9497;
    line-height: 12.1px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    border-bottom: 1px solid #d2d5d6;
    padding: 0 18px 7px 18px;
    background-size: 10px;
    width: 70px;
`


class Ticket extends Component {
    
    render() {
        const { origin, origin_name, destination, destination_name, departure_date, departure_time, arrival_date, arrival_time, stops, price} = this.props
        return (
            <TicketWrap>
                <TicketLeft>
                    <button>Купить за {price}</button>
                </TicketLeft>
                    <TicketDep>
                        <Time>{departure_time}</Time>
                        <City>{origin}, {origin_name}</City>
                        <DateStyle>{departure_date}</DateStyle>
                    </TicketDep>
                    <TicketStops>
                        <Stops className='stops'>{stops==1?stops+' пересадка':stops<1?null:stops+' пересадки'}</Stops>
                    </TicketStops>
                    <TicketArrival>
                        <Time>{arrival_time}</Time>
                        <City>{destination_name}, {destination}</City>
                        <DateStyle>{arrival_date}</DateStyle>
                    </TicketArrival>
            </TicketWrap>
        );
    }
}

export default Ticket;