import React, { Component } from 'react';
import {connect} from 'react-redux'
import styled from "styled-components";

import { dataRequest, dataFilter } from '../../ducks/actions'
import {getData, getIsLoading, getError, getFilter} from '../../ducks/reducers'
import Ticket from "../Ticket";
import './style.css'

const MenuWrap = styled.div`
    width: 232px;
    height: 331px;
    border-radius: 5px;
    box-shadow: 0 1px 4px rgba(91, 137, 164, 0.25);
    background-color: #ffffff;
    margin-right: 20px;
    padding: 15px 0;
    p {
        text-transform: uppercase;
        font-family: "Open Sans";
        font-size: 12px;
        line-height: 19px;
        letter-spacing: 0.5px;
        color: #4a4a4a;
        padding-left: 15px;
        font-weight: 600;
        :first-child{
            margin: 0;
            margin-bottom: 10px;
        }
    }
`
const Wrap = styled.div`
    padding-top: 80px;
    max-width: 1140px;
    margin: 0 auto;
`
const WrapperPage = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: center;
`

const MenuStops = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`
const CostMenu = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    margin: 0 auto;
    margin-left: 15px;
    width: 200px;
    margin-right: 15px;
    border-radius: 5px;
    li {
        width: 33%;
        padding: 10px 10px;
        text-align: center;
        border: 1px solid #d2d5d6;
        font-family: "Open Sans";
        letter-spacing: 0.5px;
        font-weight: 600;
        font-size: 12px;
        color: #2196f3;
        cursor: pointer;
        :hover {
            background-color: #f2fcff;
        }
        :last-child{
            border-radius: 0 5px 5px 0;
        }
        :first-child{
            border-radius: 5px 0 0 5px;
        }
    }
`

const TitleStops = styled.p`
    margin: 0;
    margin-top: 30px;
    padding-left: 15px;
`




class App extends Component {
    
    state = {
        all: true,
        currency: 'RUB',
        rate: 1,
        countStops: {
            0: false,
            1: false,
            2: false,
            3: false,
        },
        stops: []
    }


    componentDidMount() {
        const { dataRequest, } = this.props
        dataRequest()
        
    }

    checkBoxes = (state) => {
        let result = [];
        
        for (let item in state) {
            if (state[item]===true){ 
                result = [...result, item]
            }
        }
        return Array.from(result)
    }
 

    handleChange = (e) => {
        const { dataFilter} = this.props
        let atrib = e.target.getAttribute('data')
        let Self = this;
        if(atrib==='all') {
            return (this.setState({ [atrib]: !this.state.all, countStops: { 1: false, 2: false, 3: false}, stops: [[]]}),
                setTimeout(() => {
                    dataFilter(this.props.data.tickets, this.state.stops)
                }, 200)
        )
        }
        if(atrib!=='all'){
            this.setState({all: false, countStops: {...this.state.countStops, [atrib]: !this.state.countStops[atrib]}})
            setTimeout(() => {
                Self.setState({ stops: [Self.checkBoxes(Self.state.countStops)] })
            }, 100);
            setTimeout(() => {
                dataFilter(this.props.data.tickets, this.state.stops)
            }, 200); 
        }
    }

    handleClick = (e) => {
        
        let value = e.target.innerHTML
        this.setState({currency: value})
        setTimeout(() => {
            if (this.state.currency === 'RUB') this.setState({ rate: 1 })
            if (this.state.currency === 'EUR') this.setState({ rate: 70 })
            if (this.state.currency === 'USD') this.setState({ rate: 60 })
        }, 100);
        
    }

    render() {
        let ticketList= []
         ticketList = this.props.filters
        let dataList;
        let symbol;
        if (this.state.currency === 'RUB') symbol ='₽'
        if (this.state.currency === 'USD') symbol ='$'
        if (this.state.currency === 'EUR') symbol ='€'
        if(this.state.all) {
             dataList = this.props.data.tickets
        }
        
        return (
            <Wrap>
                <div className='logo'></div>
                <WrapperPage>
                <MenuWrap>
                    <p>валюта</p>
                    <CostMenu onClick={this.handleClick}>
                        <li className={this.state.currency==='RUB'?'active':''}>RUB</li>
                        <li className={this.state.currency ==='USD' ? 'active' : ''}>USD</li>
                        <li className={this.state.currency ==='EUR' ? 'active' : ''}>EUR</li>
                    </CostMenu>
                    <TitleStops>количество пересадок</TitleStops>
                    <MenuStops>
                        <li className='custom'>
                            <input type='checkbox' onChange={this.handleChange} data={'all'} checked={this.state.all} id='all'></input>
                            <label htmlFor='all'>Все</label>
                        </li>
                        <li className='custom'>
                            <input type='checkbox' onChange={this.handleChange} data={0} checked={this.state.countStops[0]} id='none'></input>
                            <label htmlFor='none'>Без пересадок</label>
                        </li>
                        <li className='custom'>
                            <input type='checkbox' onChange={this.handleChange} data={1} checked={this.state.countStops[1]} id='one'></input>
                            <label htmlFor='one'>1 пересадка</label>
                        </li>
                        <li className='custom'>
                            <input type='checkbox' onChange={this.handleChange} data={2} checked={this.state.countStops[2]} id='two'></input>
                            <label htmlFor='two'>2 пересадки</label>
                        </li>
                        <li className='custom'>
                            <input type='checkbox' onChange={this.handleChange} data={3} checked={this.state.countStops[3]} id='three'></input>
                            <label htmlFor='three'>3 пересадки</label>
                        </li>
                    </MenuStops>
                </MenuWrap>
                <div>
                    {dataList ? dataList.map(item => {
                         return   (<Ticket
                                key={Math.random()} 
                                origin={item.origin}
                                origin_name={item.origin_name}
                                destination={item.destination}
                                destination_name={item.destination_name}
                                departure_date={item.departure_date}
                                departure_time={item.departure_time}
                                arrival_date={item.arrival_date}
                                arrival_time={item.arrival_time}
                                carrier={item.carrier}
                                stops={item.stops}
                             price={Math.ceil(item.price / this.state.rate)+symbol}/>)
                    }) : ticketList.map(item => {
                        return (<Ticket
                            key={Math.random()}
                            origin={item.origin}
                            origin_name={item.origin_name}
                            destination={item.destination}
                            destination_name={item.destination_name}
                            departure_date={item.departure_date}
                            departure_time={item.departure_time}
                            arrival_date={item.arrival_date}
                            arrival_time={item.arrival_time}
                            carrier={item.carrier}
                            stops={item.stops}
                            price={Math.ceil(item.price / this.state.rate)+symbol} />)
                    })}
                </div>
                </WrapperPage>
            </Wrap>
        );
    }
}

const mapStateToProps = state => ({
    data: getData(state),
    isLoading: getIsLoading(state),
    error: getError(state),
    filters: getFilter(state)
});

const mapDispatchToProps = { dataRequest, dataFilter,}

export default connect(mapStateToProps, mapDispatchToProps)(App);