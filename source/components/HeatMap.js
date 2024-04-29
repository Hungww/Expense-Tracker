import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const HeatMapComponent = ({ data, chartConfig }) => {
    return (
        <ContributionGraph
            values={data}
            endDate={new Date("2017-05-01")}
            numDays={105}
            width={screenWidth}
            height={220}
            gutterSize={2}
            accessor="value"
            chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientFromOpacity: 1,
                backgroundGradientTo: "#fff",
                backgroundGradientToOpacity: 1,
                color: (opacity = 1) => `rgba(25, 176, 121, ${opacity})`,
                propsForLabels: {
                    fill: "#19B079",
                    fontWeight: "bold",
                },
            }}
            tooltipDataAttrs={(a) => ({rx : a.value ? 9 : 5, ry : a.value ? 9 : 5})}
        />
    )
};

export default HeatMapComponent;