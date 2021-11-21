import React from "react";
import ReactApexChart from "react-apexcharts"

export const SalesChartReport = ({data}) => {
    let series = [{
        name: "Sale",
        data: data.map(d => d.sale)
    }]

    let options = {
            chart: {
                type: 'area',
                height: 350,
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            labels: data.map( d => d.month),

            legend: {
                horizontalAlign: 'left'
            }
        }

        return(
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={350}/>
        </div>)

}