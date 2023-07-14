import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

function GenderBarChart({ data }) {
    const options = {
        chart: {
            id: 'bar-chart'
        },
        xaxis: {
            categories: ['Male', 'Female']
        }
    };

    const series = [
        {
            name: 'Number of Patients',
            data: [data.filter((patient) => patient.gender === 'MALE').length, data.filter((patient) => patient.gender === 'FEMALE').length]
        }
    ];

    return (
        <div>
            <h2>Gender Distribution of Patients</h2>
            <Chart options={options} series={series} type="bar" />
        </div>
    );
}

GenderBarChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            gender: PropTypes.oneOf(['MALE', 'FEMALE']).isRequired
        })
    ).isRequired
};

export default GenderBarChart;
