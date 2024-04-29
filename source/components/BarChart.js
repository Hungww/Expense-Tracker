import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const BarChartComponent = ({ data, chartConfig }) => {
    return (
        <BarChart 
            data={data}
            width={screenWidth}
            height={200} 
            chartConfig={chartConfig}
            fromZero={true}
            withCustomBarColorFromData={true}
            flatColor={true}
            showValuesOnTopOfBars={false}
            withInnerLines={false}
            yAxisSuffix="$"
            showBarTops={false}
        />
    )
}

export default BarChartComponent;