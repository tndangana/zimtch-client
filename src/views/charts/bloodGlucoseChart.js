import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

function BloodGlucoseScatterChart({ data }) {
    const totalBloodGlucose = data.reduce((acc, patient) => acc + patient.bloodGlucose, 0);
    const averageBloodGlucose = totalBloodGlucose / data.length;

    const options = {
        chart: {
            id: 'scatter-chart',
            zoom: {
                enabled: true,
                type: 'xy'
            }
        },
        xaxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yaxis: {
            title: {
                text: 'Blood Glucose'
            },
            tickAmount: 6,
            min: 0,
            max: 300
        },
        markers: {
            size: 6
        }
    };

    const series = [
        {
            name: 'Blood Glucose',
            data: data.map((patient) => ({
                x: new Date(patient.treatmentStartDate).getTime(),
                y: patient.bloodGlucose
            }))
        },
        {
            name: 'Average Blood Glucose',
            data: [{ x: Date.now(), y: averageBloodGlucose }]
        }
    ];

    return (
        <div>
            <h1>Blood Glucose Scatter Chart</h1>
            <h2>Distribution of Blood Glucose Levels Over Time</h2>
            <p>Average Blood Glucose Level: {averageBloodGlucose.toFixed(2)}</p>
            <Chart options={options} series={series} type="scatter" />
        </div>
    );
}

BloodGlucoseScatterChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            bloodGlucose: PropTypes.number.isRequired,
            treatmentStartDate: PropTypes.string.isRequired
        })
    ).isRequired
};

export default BloodGlucoseScatterChart;
