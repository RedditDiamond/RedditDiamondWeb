import React, { Component } from 'react';
import Header from './Header'
import Fire from '../config/Fire'
import {Bar, Line, HorizontalBar, Pie} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2'

import '../styles/stats.css'

  
class Stats extends Component {
    constructor() {
      super();
      this.state = {
        allDiamonds: [],
        subTotals: [],
        donatorTotals: [],
        charityTotals: [],
        uniqueSubs: [],
        uniqueDonators: [],
        uniqueCharities: [],
        width: 0,
        height: 0,
        barFontSize: 12
      }
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      defaults.global.defaultFontFamily = 'Oxygen';
    }

getCharityTotals() {
    var charityList = []
    var tmpuniques = []
    var newtotals = []   
    var newuniques = [] 
    var tmpsort = []
    var diamonds = this.state.allDiamonds
    var index = 0
 
    diamonds.forEach(function(diamond){
           charityList.push(diamond.charity) 

    });

    tmpuniques = Array.from(new Set(charityList));
    
    tmpuniques.forEach(function(charity){
        var thisTotal = 0
        diamonds.forEach(function(diamond){
            if(diamond.charity == charity) { thisTotal += diamond.amount 
        } });  
        tmpsort.push( [charity, thisTotal] )
    });
    // Generate new sorted arrays for the graphs to use
    tmpsort.sort(this.sortFunction).reverse()

    tmpsort.forEach(function(this_sort){
        if ( (this_sort[1]>0) && (this_sort[0] != 'RedditDiamondBot')) {
            newuniques.push ( this_sort[0] )
            newtotals.push ( this_sort[1] )
        }
    
        
    });
    this.setState( {charityTotals: newtotals, uniqueCharities: newuniques} )
    }

  getUserTotals() {
    var userList = []
    var totals = []
    var diamonds = this.state.allDiamonds
    diamonds.forEach(function(diamond){
        userList.push(diamond.donator)
      });
    var theUniques = Array.from(new Set(userList));
    this.setState ( {uniqueDonators : theUniques })

    theUniques.forEach(function(donator){
        var thisTotal = 0
        diamonds.forEach(function(diamond){
            if(diamond.donator == donator) { thisTotal += diamond.amount }
        });  
        totals.push( thisTotal )
    });

    this.setState( {donatorTotals: totals} )
  }

  reSortLists() {
    this.state.uniqueSubs.sortable({
     
    });
  }

  sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

  getSubTotals() {
    var subList = []
    var tmpuniques = []
    var newtotals = []   
    var newuniques = [] 
    var tmpsort = []
    var diamonds = this.state.allDiamonds
    var index = 0
 
    diamonds.forEach(function(diamond){
           subList.push(diamond.sub) 

    });

    tmpuniques = Array.from(new Set(subList));
    
    tmpuniques.forEach(function(sub){
        var thisTotal = 0
        diamonds.forEach(function(diamond){
            if(diamond.sub == sub) { thisTotal += diamond.amount 
        } });  
        tmpsort.push( [sub, thisTotal] )
    });
    // Generate new sorted arrays for the graphs to use
    tmpsort.sort(this.sortFunction).reverse()

    tmpsort.forEach(function(this_sort){
        if ( (this_sort[1]>0) && (this_sort[0] != 'RedditDiamondBot')) {
            newuniques.push ( this_sort[0] )
            newtotals.push ( this_sort[1] )
        }
    
        
    });
    this.setState( {subTotals: newtotals, uniqueSubs: newuniques} )

  }

  componentDidMount () {
        Fire.database().ref('validated').on('value', snap =>  {
            var data = [];
            snap.forEach(ss => {
            data.push(ss.val());
            });

            this.setState({allDiamonds: Array.from(data)})
            this.getSubTotals()
            this.getUserTotals()
            this.getCharityTotals()
     });
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    calculateFontSize() {
        if ( this.state.width > 900) {
            defaults.global.defaultFontSize = 11;
        } else if ((this.state.width < 900) && (this.state.width > 680)) {
            defaults.global.defaultFontSize = 9;
        } else if ((this.state.width < 680) && (this.state.width > 500)) {
            defaults.global.defaultFontSize = 7;
        } else if ( (this.state.width < 500) && (this.state.width > 400)) {
            defaults.global.defaultFontSize = 6;
        } else if ( (this.state.width < 400) && (this.state.width > 300)) {
            defaults.global.defaultFontSize = 5;
        } else if ( this.state.width < 300) {
            defaults.global.defaultFontSize = 4;
        }   
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        this.calculateFontSize();
    }

    render() {
            //Bar.defaults.global.defaultFontSize = this.state.barFontSize;

               // need to add more colors here
            const subData = {
                labels: this.state.uniqueSubs,
                datasets: [{
                    label: "Combined Subreddit Donations (USD)",
            
                    data: this.state.subTotals,
                    defaultFontSize: this.state.barFontSize,
                    backgroundColor: [
                    '#FF6384', '#36A2EB', '#ff0000',
                    '#4EE595', '#FF7D01', '#32f2e6',
                    '#5806d7', '#56f63d', '#FFFA00',
                    '#8B20BB', '#007AC7', '#3d4517',
                    '#e6c3a5', '#a941f5', '#766152',
                    '#fbdd16', '#ad6588', '#d34680',
                    '#3d11b2', '#2d3f67', '#82ac7e',
                    '#a95190', '#b29dab', '#6f665d',
                    '#96441b', '#fb601d', '#46a676', '#fcd694' ],    
                }]};
        
         
            const charityData = {
                labels: this.state.uniqueCharities,
                datasets: [
                    {
                    label: 'Popular Charities by Donations (USD)',
                    backgroundColor: 'rgba(69,136,199,0.5)',
                    borderColor: 'rgba(255,69,0,1)',
                    borderWidth: 1,
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#ff0000',
                        '#4EE595', '#FF7D01', '#32f2e6',
                        '#5806d7', '#56f63d', '#FFFA00',
                        '#8B20BB', '#007AC7', '#3d4517',
                        '#e6c3a5', '#a941f5', '#766152',
                        '#fbdd16', '#ad6588', '#d34680',
                        '#3d11b2', '#2d3f67', '#82ac7e',
                        '#a95190', '#b29dab', '#6f665d',
                        '#96441b', '#fb601d', '#46a676', '#fcd694' ],
                        hoverBackgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56',
                        '#4EE595', '#FF7D01', '#32f2e6',
                        '#dec950', '#F42494', '#FFFA00',
                        '#8B20BB', '#007AC7', '#3d4517',
                        '#e6c3a5', '#a941f5', '#766152',
                        '#fbdd16', '#ad6588', '#d34680',
                        '#3d11b2', '#2d3f67', '#82ac7e',
                        '#a95190', '#b29dab', '#6f665d',
                        '#96441b', '#fb601d', '#46a676', '#fcd694' ],
                    data: this.state.charityTotals
                    }]};

        this.calculateFontSize()
        return (
            <div>
                <Header />
                <div className="firstGraph">
                    <h2>Subreddit Donations (USD)</h2>
                    <HorizontalBar 
                            data={subData}
                            options= {
                                { maintainAspectRatio: true,
                                 responsive: true,
                                 scales: {
                                    xAxes: [{
                                          stacked: true,
                                    }],
                        
                                    yAxes: [{
                                         stacked: true,
                                          ticks: {
                                            beginAtZero:true
                                        }
                                    }]
                                }
                                }}
                            redraw
                        />
                </div>
                <div className="nextGraph"> 
                    <h2>Most Popular Charities</h2>
                        <HorizontalBar                
                            data={charityData}
                            options= {
                                { maintainAspectRatio: true,
                                 responsive: true,
                                 scales: {
                                    xAxes: [{
                                          stacked: true,
                                    }],
                        
                                    yAxes: [{
                                         stacked: true,
                                          ticks: {
                                            beginAtZero:true
                                        }
                                    }]
                                }
                                }}
                            redraw
                            />
                </div>
            </div>
        );
    }
}

export default Stats;