<template lang="pug">
  .chart-section.section
    .chart-section__title {{ title }}
    .chart-section__subtitle {{ subtitle }}
    .chart-section__chart(:id="id")
</template>

<script>
import AmCharts from 'amcharts3';
import AmSerial from 'amcharts3/amcharts/serial';

export default {
  props: [
    'id',
    'title',
    'subtitle',
    'data',
  ],
  computed: {
    providerData() {
      const res = [];

      this.data.forEach((dataObj) => {
        const date = new Date(dataObj.begin * 1000);
        const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const monthDay = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
        const year = date.getFullYear();

        dataObj.type = `${month}/${monthDay}`;
        dataObj.formatDate = `${monthDay}.${month}.${year}`;
        res.push(dataObj);
      });

      return res;
    },
  },
  created() {
    const that = this;

    this.$nextTick(() => {
      window.AmCharts.makeChart(
        that.id,
        {
          type: 'serial',
          categoryField: 'type',
          fontFamily: 'Archivo',
          addClassNames: true,
          graphs: [
            {
              type: 'line',
              valueField: 'count',
              balloonText: '[[formatDate]]\nTransactions: [[value]]\nAmount: [[amount]]',
              fillAlphas: 0,
              lineColor: '#50c185',
              lineThickness: 2,
              bullet: 'round',
              bulletColor: '#50c185',
              bulletSize: 8,
            },
          ],
          categoryAxis: {
            labelOffset: 6,
            axisColor: '#ebebeb',
            axisAlpha: 1,
            tickLength: 16,
            gridAlpha: 0,
            color: '#000',
            fontSize: 12,
            startOnAxis: true,
            labelRotation: 60,
          },
          valueAxes: [
            {
              labelOffset: 10,
              tickLength: 0,
              axisAlpha: 0,
              gridAlpha: 1,
              gridColor: '#ebebeb',
              color: '#000',
              fontSize: 15,
              autoGridCount: false,
              gridCount: 4,
            },
          ],
          dataProvider: that.providerData,
        },
      );
    });
  },
};
</script>

<style scoped>

</style>
