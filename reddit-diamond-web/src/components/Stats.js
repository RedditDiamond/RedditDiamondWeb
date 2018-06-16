import React, { Component } from 'react';
import Header from './Header'
import Fire from '../config/Fire'
import {Bar, Line, HorizontalBar, Pie} from 'react-chartjs-2';
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
        uniqueCharities: []
      }
    }

getCharityTotals() {
    var charityList = []
    var totals = []
    var totals_sorted = []
    var diamonds = this.state.allDiamonds
    diamonds.forEach(function(diamond){
        charityList.push(diamond.charity)
        });
    var theUniques = Array.from(new Set(charityList));
    this.setState ( {uniqueCharities : theUniques })
    theUniques.forEach(function(charity){
        var thisTotal = 0
        diamonds.forEach(function(diamond){
            if(diamond.charity == charity) { thisTotal += diamond.amount }
        });  
        totals.push( thisTotal )
    });
    this.setState( {charityTotals: totals} )
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


  getSubTotals() {
    var subList = []
    var totals = []
    var diamonds = this.state.allDiamonds
    diamonds.forEach(function(diamond){
        subList.push(diamond.sub)
    });
    var theUniques = Array.from(new Set(subList));
    this.setState ( {uniqueSubs : theUniques })
    theUniques.forEach(function(sub){
        var thisTotal = 0
        diamonds.forEach(function(diamond){
            if(diamond.sub == sub) { thisTotal += diamond.amount }
        });  
        totals.push( thisTotal )
    });
    this.setState( {subTotals: totals} )
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
    }

    handleBarClick(element, id){ 
        console.log(`The bin ${element.text} with id ${id} was clicked`);
      }

    render() {

               // need to add more colors here
            const subData = {
                labels: this.state.uniqueSubs,
                datasets: [{
                    label: "Combined Subreddit Donations (USD)",
                    data: this.state.subTotals,
                    backgroundColor: [
                    '#FF6384', // r, g, b, etc
                    '#36A2EB',
                    '#FFCE56',
                    '#4EE595',
                    '#FF7D01', // orange
                    '#F42494', // pink
                    '#FFFA00', // yellow 
                    '#8B20BB', // magenta
                    '#007AC7', // navy
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4EE595',
                    '#FF7D01', // orange
                    '#F42494', // pink
                    '#FFFA00', // yellow 
                    '#8B20BB', // magenta
                    '#007AC7', // navy
                    ]
                }]
            };

            const charityData = {
                labels: this.state.uniqueCharities,
                datasets: [
                    {
                    label: 'Popular Charities by Donations (USD)',
                    backgroundColor: 'rgba(69,136,199,0.5)',
                    borderColor: 'rgba(255,69,0,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,69,0,0.5)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.charityTotals
                    }
                ]
                };

        return (
            <div>
                <Header />
                <div className="firstGraph">
                    <h2>Subreddit Donations (USD)</h2>
                        <Pie
                            data={subData}
                            options={{ maintainAspectRatio: true }}
                            redraw
                        />
                </div>
                <div className="nextGraph"> 
                    <h2>Most Popular Charities</h2>
                        <HorizontalBar                
                            data={charityData}
                            options={{ maintainAspectRatio: true }}
                            redraw
                            />
                </div>
            </div>
        );
    }
}

export default Stats;