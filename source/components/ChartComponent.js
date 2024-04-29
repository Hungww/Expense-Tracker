import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import ViewSlider from 'react-native-view-slider'
import PieChartComponent from "./PieChart.js";
import BarChartComponent from "./BarChart.js";
import HeatMap from "./HeatMap.js";

const { width, height } = Dimensions.get('window');

const chartConfig = {
    backgroundGradientTo: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientFrom: "white",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `black`,
    barPercentage: 0.5,
    barRadius : 5, 
};

const HeatMapData = [
    { date: "2017-01-02", value: 10 },
    { date: "2017-01-03", value: 20 },
    { date: "2017-01-04", value: 30 },
    { date: "2017-01-05", value: 40 },
    { date: "2017-01-06", value: 50 },
    { date: "2017-01-30", value: 20 },
    { date: "2017-01-31", value: 30 },
    { date: "2017-02-30", value: 40 },
    { date: "2017-03-01", value: 20 },
    { date: "2017-03-05", value: 20 },
    { date: "2017-04-02", value: 40 },
    { date: "2017-05-06", value: 50 },
];

const BarData = {
    labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat","Sun"],
            datasets: [
                {
                    data: [40, 84, 56, -40, 60, -55, 40],
                    colors: [
                        (opacity = 1) => `#BE95FF`,
                        (opacity = 1) => `#78A9FF`,
                        (opacity = 1) => `#78A9FF`,
                        (opacity = 1) => `#BE95FF`,
                        (opacity = 1) => `#78A9FF`,
                        (opacity = 1) => `#BE95FF`,
                        (opacity = 1) => `#78A9FF`,
                        (opacity = 1) => `#BE95FF`,
                        (opacity = 1) => `#78A9FF`,
                    ]
                } 
            ]
}

const Piedata = [
    {
        name: "Subscriptions",
        population: 2150000,
        color: "#4CC297",
    },
    {
        name: "Shopping",
        population: 1800000,
        color: "#FCDDA1",
    },
    {
        name: "Food",
        population: 1527612,
        color: "#FD6F7A",
    }
];

const ChartComponent = () => {
    return (
        <>
            <ViewSlider 
                renderSlides = {
                    <>
                        <View style={styles.viewBox}>
                            <PieChartComponent data={Piedata} chartConfig={chartConfig}/>
                        </View>
                        <View style={styles.viewBox}>
                            <BarChartComponent data={BarData} chartConfig={chartConfig}/>
                        </View>
                        <View style={styles.viewBox}>
                            <HeatMap data={HeatMapData} chartConfig={chartConfig}/>
                        </View>
                    </>
                }
                style={styles.slider} 
                height = {240}
                slideCount = {3}
                dots = {true}
                dotActiveColor = '#19B079' 
                dotInactiveColor = 'gray'
                dotsContainerStyle={styles.dotContainer} 
            />
        </>
    )
}

const styles = StyleSheet.create({
    viewBox: {
        justifyContent: 'center',
        width: width,
        alignItems: 'center',
        height: 200
    },
    slider: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0
    }
})

export default ChartComponent;