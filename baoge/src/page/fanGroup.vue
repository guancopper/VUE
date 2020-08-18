<template>
  <div>
    <div class="divheader">
      <p>全场有功功率:{{Totalactivepower}}</p>
      <p>平均风速:{{AVR_windspeed}}</p>
      <p>全场无功功率:{{Q_total}}</p>
      <p>并网台数:{{NumWT_in_Power_production}}</p>
      <p>通信故障台数:{{NumWT_comfail}}</p>
      <p>样板机台数:{{NumWT_in_lock}}</p>
      <el-radio-group v-model="radio" @change="changeHandler">
          <el-radio :label="1" style="color: white;margin-top: 3px;">1-15</el-radio>
          <el-radio :label="2" style="color: white;">15-30</el-radio>
          <el-radio :label="3" style="color: white;">30-33</el-radio>
        </el-radio-group>
    </div>
    <div id="app" class="wrapper">
      <div v-for="item in row" :key="item.id" class="wrapper-content">
        <station
        :WTID='item.WTID'
        :Tatalactivepower='item.Tatalactivepower'
        :P_set_adjust_help='item.P_set_adjust_help'
        :Q_total='item.Q_total'
        :Q_set_point='item.Q_set_point'
        :Windspeed='item.Windspeed'
        >
        </station>
      </div>
    </div>
  </div>
</template>

<script>
import Station from './fan.vue'
export default {
  name: 'app',
  components: {
    Station
  },
  data () {
    return {
      kw:"130",
      radio:1,
      start:1,
      end:5,
      windspeed:"10",
      wt:'',
      Totalactivepower:'0',
      AVR_windspeed:'0',
      Q_total:'0',
      NumWT_in_Power_production:'0',
      NumWT_comfail:'0',
      NumWT_in_lock:'0',
      row:[{WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"},
      {WTID:"0",Tatalactivepower:"0",P_set_adjust_help:"0",Q_total:"0",Q_set_point:"0",Windspeed:"0"}],
      row1:[],
      row2:[],
      row3:[]
    }
  },
  methods:{
    get() {
      //let i= 1
      for(var i=1;i<=15;i++){
        let tagnames = "WT"+i+"."+"ActivePower"+","
              +"WT"+i+"."+"ActivePowerDemand"+","
              +"WT"+i+"."+"ReactivePower"+","
              +"WT"+i+"."+"ReactivePowerDemand"+","
              +"WT"+i+"."+"WindSpeed";
        let id = "WT"+i
        console.log(tagnames)
        // this.$axios.get("/api/values/GetSnapshot",{
        //   params: {
        //     tagName: tagnames
        //   }
        // }).then((response) =>{
        //   console.log(tagnames);
        //   let WTData = {WTID:id,
        //   Tatalactivepower:parseFloat(response.data[0].Value).toFixed(0),
        //   P_set_adjust_help:parseFloat(response.data[1].Value).toFixed(0),
        //   Q_total:parseFloat(response.data[2].Value).toFixed(0),
        //   Q_set_point:parseFloat(response.data[3].Value).toFixed(0),
        //   Windspeed:parseFloat(response.data[4].Value).toFixed(0)};
        //   this.$set(this.row,i-1,WTData);
        // });
      }

    }
  },
  mounted() {
    this.timer = setInterval(this.get, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped>
.wrapper{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.wrapper-content{
  width: 17%;
  height: 180px;
}
.divheader{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 70px;
  color: white;
}
</style>
