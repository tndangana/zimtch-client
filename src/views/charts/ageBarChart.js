import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

function AgePieChart({ data }) {
    const options = {
        chart: {
            id: 'pie-chart'
        },
        labels: ['0-17', '18-30', '31-40', '41-50', '51-60', '61+']
    };

    const series = [
        data.filter((patient) => patient.age >= 0 && patient.age <= 17).length,
        data.filter((patient) => patient.age >= 18 && patient.age <= 30).length,
        data.filter((patient) => patient.age >= 31 && patient.age <= 40).length,
        data.filter((patient) => patient.age >= 41 && patient.age <= 50).length,
        data.filter((patient) => patient.age >= 51 && patient.age <= 60).length,
        data.filter((patient) => patient.age > 60).length
    ];

    return (
        <div>
            <h1>Age Distribution of Patients</h1>
            <h2>Breakdown by Age Group:</h2>
            <Chart options={options} series={series} type="pie" />
        </div>
    );
}

AgePieChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            age: PropTypes.number.isRequired
        })
    ).isRequired
};

export default AgePieChart;
