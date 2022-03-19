import React from "react";
import { defaults, Bar } from "react-chartjs-2";

defaults.global.legend.position = "bottom";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Chart = ({ data }) => {
  const labels = [];
  const areas = [];
  const populations = [];
  const gdps = [];
  const populationDensities = [];
  const vehicleOwnerships = [];
  const totalRoadDeaths = [];
  const roadDeathPerMillionInhabitants = [];
  const backgroundColors = [];
  data.forEach((entry) => {
    labels.push(entry.country);
    areas.push(entry.area);
    populations.push(entry.population);
    populationDensities.push(entry.populationDensity);
    gdps.push(entry.gDPPerCapita);
    vehicleOwnerships.push(entry.vehicleOwnership);
    totalRoadDeaths.push(entry.totalRoadDeaths);
    roadDeathPerMillionInhabitants.push(entry.roadDeathPerMillionInhabitants);
    backgroundColors.push(getRandomColor());
  });
  return (
    <div>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "Area (thousands of km²)",
              data: areas,
              backgroundColor: "rgba(0, 150, 0, 0.2)",
              borderColor: "rgba(0, 150, 0, 1)",
              borderWidth: 1,
            },
            {
              label: "Population",
              data: populations,
              backgroundColor: "rgba(0, 0, 150, 0.2)",
              borderColor: "rgba(0, 0, 150, 1)",
              borderWidth: 1,
            },
            {
              label: "GPD Per Capita",
              data: gdps,
              backgroundColor: "rgba(150, 0, 0, 0.2)",
              borderColor: "rgba(150, 0, 0, 1)",
              borderWidth: 1,
            },
            {
              label: "Population Density (inhabitants per km²)",
              data: populationDensities,
              backgroundColor: "rgba(0, 150, 150, 0.2)",
              borderColor: "rgba(0, 150, 150, 1)",
              borderWidth: 1,
            },
            {
              label: "Vehicle Ownership (per thousand inhabitants)",
              data: vehicleOwnerships,
              backgroundColor: "rgba(150, 0, 150, 0.2)",
              borderColor: "rgba(150, 0, 150, 1)",
              borderWidth: 1,
            },
            {
              label: "Total Road Deaths",
              data: totalRoadDeaths,
              backgroundColor: "rgba(150, 150, 150, 0.2)",
              borderColor: "rgba(150, 150, 150, 1)",
              borderWidth: 1,
            },
            {
              label: "Road Deaths per Million Inhabitants",
              data: roadDeathPerMillionInhabitants,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderColor: "rgba(0, 0, 0, 1)",
              borderWidth: 1,
            },
          ],
        }}
        height={700}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 16,
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
