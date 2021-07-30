import moment from "moment";

export const lineChartConfig = {
  chart: {
    type: "line",
    className: 'line-chart',
    height: 300,
    width: 400,
  },
  yAxis: {
    labels: {
        formatter(this: any) {
          return this.value + '%';
        },
    }
  },
  xAxis: {
    labels: {
        formatter(this: any) {
          return moment(this.value).format("h:mm:ss");
        },
    }
  },
  title: {
    text: "CPU Usage (%)",
    align: 'center',
  },
  plotOptions: {
    series: {
      minPointSize: 10,
      zMin: 0,
      innerSize: '55%',
      dataLabels: {
        enabled: false,
      },
      point: {
        events: {
          legendItemClick: function () {
            return false;
          },
        },
      },

      showInLegend: false,
    },
  }
}
