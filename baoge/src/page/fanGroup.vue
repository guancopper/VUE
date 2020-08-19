<template>
  <div>
    <div class="divheader">
      <p>全场有功功率:  {{Totalactivepower}}</p>
      <p>平均风速:  {{AVR_windspeed}}</p>
      <p>全场无功功率:  {{Q_total}}</p>
      <p>并网台数:  {{NumWT_in_Power_production}}</p>
      <p>通信故障台数:  {{NumWT_comfail}}</p>
      <p>样板机台数:  {{NumWT_in_lock}}</p>
      <el-radio-group v-model="radio" @change="changeHandler">
          <el-radio :label="1" style="color: white;margin-top: 3px;">1-15</el-radio>
          <el-radio :label="2" style="color: white;">16-30</el-radio>
          <el-radio :label="3" style="color: white;">31-33</el-radio>
        </el-radio-group>
    </div>
    <div id="app" class="wrapper">
      <div v-for="item in row" :key="item.id" class="wrapper-content">
        <station
        :WTID='item.WTID'
        :activepowerkw='item.activepowerkw'
        :reactivepowerkv='item.reactivepowerkv'
        :activepowerdemand='item.activepowerdemand'
        :reactivepowerdemand='item.reactivepowerdemand'
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
      end:15,
      windspeed:"10",
      wt:'',
      Totalactivepower:'0',
      AVR_windspeed:'0',
      Q_total:'0',
      NumWT_in_Power_production:'0',
      NumWT_comfail:'0',
      NumWT_in_lock:'0',
      row:[{WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"},
      {WTID:"0",activepowerkw:"1",reactivepowerkv:"2",activepowerdemand:"3",reactivepowerdemand:"4",Windspeed:"5"}],
      row1:[],
      row2:[],
      row3:[]
    }
  },
  methods:{
    changeHandler(value){
      switch(value){
        case 1:
        this.start =1
        this.end = 15
        console.log(this.start)
        console.log(this.end)
        break;
        case 2:
        this.start =16
        this.end =30
        console.log(this.start)
        console.log(this.end)
        break;
        case 3:
        this.start =31
        this.end =32
        this.row.length =2
        console.log(this.start)
        console.log(this.end)
        break;
      }
    },
    get() {
      this.$axios.get("/api/values/GetSnapshot",{
        params: {
          tagName: 'LUA.Totalactivepower,LUA.avr_windspeed,LUA.Q_total,LUA.NumWT_in_Power_production,LUA.NumWT_comfail,LUA.NumWT_in_lock'
        }
      }).then((response) =>{
          this.Totalactivepower = parseFloat(response.data[0].Value).toFixed(0);
          this.AVR_windspeed = parseFloat(response.data[1].Value).toFixed(0);
          this.Q_total = parseFloat(response.data[2].Value).toFixed(0);
          this.NumWT_in_Power_production = parseFloat(response.data[3].Value).toFixed(0);
          this.NumWT_comfail = parseFloat(response.data[4].Value).toFixed(0);
          this.NumWT_in_lock = parseFloat(response.data[5].Value).toFixed(0);
      });
      this.wt = ""
      for(var i=this.start;i<=this.end;i++){
        if(i==this.end){
          this.wt = this.wt+"WT"+i+"."+"activepowerkw"+","
                +"WT"+i+"."+"reactivepowerkv"+","
                +"WT"+i+"."+"activepowerdemand"+","
                +"WT"+i+"."+"reactivepowerdemand"+","
                +"WT"+i+"."+"Windspeed";
        }else{
          this.wt = this.wt+"WT"+i+"."+"activepowerkw"+","
                +"WT"+i+"."+"reactivepowerkv"+","
                +"WT"+i+"."+"activepowerdemand"+","
                +"WT"+i+"."+"reactivepowerdemand"+","
                +"WT"+i+"."+"Windspeed"+",";
        }
      };
      //console.log(this.wt)
      this.$axios.get("/api/info/GetInfo",{
        params: {
          start:this.start,
          end:this.end,
          tagName:this.wt
        }
      }).then((response) =>{
        //console.log(response.data.length)
        for(var i=0;i<response.data.length;i++){
          //console.log(response.data)
          let WTData1 = {WTID:parseFloat(response.data[i].WTID).toFixed(0),
          activepowerkw:parseFloat(response.data[i].activepowerkw).toFixed(0),
          reactivepowerkv:parseFloat(response.data[i].reactivepowerkv).toFixed(0),
          activepowerdemand:parseFloat(response.data[i].activepowerdemand).toFixed(0),
          reactivepowerdemand:parseFloat(response.data[i].reactivepowerdemand).toFixed(0),
          Windspeed:parseFloat(response.data[i].Windspeed).toFixed(0)};
          this.$set(this.row,i,WTData1);
        }
      });
    }
  },
  mounted() {
    //console.log(this.wt)
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
