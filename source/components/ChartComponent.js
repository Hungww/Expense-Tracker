import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import ViewSlider from 'react-native-view-slider'
import PieChartComponent from "./PieChart.js";
import BarChartComponent from "./BarChart.js";
import HeatMap from "./HeatMap.js";

const { width, height } = Dimensions.get('window');

const colors = ["#BE95FF", "#78A9FF", "#FD6F7A", "#FCDDA1", "#4CC297", "#33FFBD", "#5733FF", "#BD33FF", "#FF33DB"];

const chartConfig = {
    backgroundGradientTo: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientFrom: "white",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `black`,
    barPercentage: 0.5,
    barRadius : 5, 
};

const ChartComponent = (data) => {
    data = data.data
    console.log(data)
    let categorySum = {};

    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (!data[i].isExpense) continue;
            if (categorySum[data[i].category]) {
                categorySum[data[i].category] += parseFloat(data[i].value);;
            } else {
                categorySum[data[i].category] = parseFloat(data[i].value);;
            }
        }
    }

    let Piedata = [];
    let BarData = new Array(7).fill(0);
    if(data) {
        data.forEach((transaction) => {
            let date = new Date(transaction.date);
            let dayOfWeek = date.getUTCDay();
            BarData[dayOfWeek] += transaction.isExpense ? -parseFloat(transaction.value) : parseFloat(transaction.value);
        })
    }
    for (let key in categorySum) {
        Piedata.push({
            name: key,
            population: categorySum[key],
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    const BarDataConfig = {
        labels: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
                datasets: [
                    {
                        data: BarData,
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

    let HeatMapData = [];
    if(data) {
        data.forEach((transaction) => {
            let date = new Date(transaction.date);
            let formattedDate = date.toISOString().split('T')[0];
            HeatMapData.push({date: formattedDate, value: transaction.isExpense ? -parseFloat(transaction.value) : parseFloat(transaction.value)});
        })
    }

    return (
        <>
            <ViewSlider 
                renderSlides = {
                    <>
                        <View style={styles.viewBox}>
                            <PieChartComponent data={Piedata} chartConfig={chartConfig}/>
                        </View>
                        <View style={styles.viewBox}>
                            <BarChartComponent data={BarDataConfig} chartConfig={chartConfig}/>
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
