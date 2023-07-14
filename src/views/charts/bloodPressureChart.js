import PropTypes from 'prop-types';
import React from 'react';
import Chart from 'react-apexcharts';

function BloodPressureScatterChart({ data }) {
    const options = {
        chart: {
            id: 'scatter-chart',
            zoom: {
                enabled: true,
                type: 'xy'
            }
        },
        xaxis: {
            title: {
                text: 'Systolic Blood Pressure'
            }
        },
        yaxis: {
            title: {
                text: 'Diastolic Blood Pressure'
            }
        }
    };

    const series = [
        {
            name: 'Blood Pressure',
            data: data.map((patient) => ({
                x: patient.systolicBloodPressure,
                y: patient.diastolicBloodPressure
            }))
        }
    ];

    return <Chart options={options} series={series} type="scatter" />;
}

BloodPressureScatterChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            systolicBloodPressure: PropTypes.number.isRequired,
            diastolicBloodPressure: PropTypes.number.isRequired
        })
    ).isRequired
};

export default BloodPressureScatterChart;
