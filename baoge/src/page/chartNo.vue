<template>
  <div id="cp">
    <el-container>
      <el-aside width="300px" v-if="this.$store.state.vl">
        <div style="padding-top: 150px;
        padding-left: 5px;
        text-align: left;
        font-size: large;
        color: white;
        background-color: unset;">
          <table>
            <tr>
                <th>无功功率:</th>
                <th>{{Q_total}}KW</th>
            </tr>
            <tr>
                <th>无功设定值:</th>
                <th>{{Q_set_point}}KW
                <el-popconfirm
                  confirmButtonText='是'
                  @onConfirm="onConfirm"
                  cancelButtonText='否'
                  icon="el-icon-info"
                  iconColor="red"
                  title="确定设置吗？"
                >
                <el-button slot="reference" type="primary" icon="el-icon-edit" circle></el-button>
                </el-popconfirm>
                </th>
            </tr>
            <tr>
                <th>风速:</th>
                <th>{{Windspeed}}m/s</th>
            </tr>
            <tr>
                <th>并网台数:</th>
                <th>{{NumWt_in_Power_production}}台</th>
            </tr>
            <tr>
                <th>无功可控上限:</th>
                <th>{{uplimitedreactivepower}}KW</th>
            </tr>
          </table>
        </div>
      </el-aside>
      <el-main>
        <div style="padding-top: 90px;">
          <ve-line theme="dark"
           :data="chartData"
           :settings="chartSettings"
           height="550px"
           :yAxis="yAxis"
           :events="chartEvents"
           ></ve-line>
           <div style="padding-top: 20px;">
             <el-radio-group v-model="radio1" @change="changeHandler1">
                 <el-radio :label="1" style="color: white;">本地控制</el-radio>
                 <el-radio :label="0" style="color: white;">远程控制</el-radio>
             </el-radio-group>
             <el-radio-group v-model="radio2" @change="changeHandler2">
                 <el-radio :label="1" style="color: white;">投入</el-radio>
                 <el-radio :label="0" style="color: white;">切入</el-radio>
             </el-radio-group>
           </div>
          <el-dialog width="250px" title="无功设定值" :visible.sync="dialogFormVisible">
            <el-form :model="form" :label-position="labelPosition" label-width="80px">
              <el-form-item label="值(KW):" :label-width="formLabelWidth">
                <el-input v-model="form.kw" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="SetKw">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
name:'cp',
data () {
      this.chartSettings = {
        xAxisType: 'category',
        labelMap: {
          date:'日期',
          NoPower: '无功功率',
          NoSetPower: '无功功率设定值'
        }
      }
      this.yAxis={
        max: 1100,
        min: 0
      }
      this.chartEvents = {
        click: function (e) {
          console.log(e.name)
        }
      }
      return {
        chartData: {
          columns: ['date', 'NoPower','NoSetPower'],
          rows: this.$store.state.rows1
        },
        msg:false,
        dialogFormVisible: false,
        form: {
          kw: ''
        },
        date: new Date().toLocaleString(),
        dateh1:'',
        dateh2:'',
        formLabelWidth: '80px',
        Q_total:'',
        Q_set_point:'',
        Windspeed:'',
        NumWt_in_Power_production:'',
        CSWindFarmActiveDemanLocal:'',
        uplimitedreactivepower:'',
        timer: '',
        timer1:'',
        radio1: this.$store.state.radio1,
        radio2: this.$store.state.radio2,
        labelPosition:'left'
      };
    },
    methods:{
      onConfirm(){
        this.dialogFormVisible =true
      },
      get(){
        this.$axios.get("/api/values/GetSnapshot",{
          params: {
            tagName: 'lua.AVR_windspeed,lua.NumWT_in_Power_production,LUA.Q_total,LUA.Q_set_point,LUA.uplimitedreactivepower'
          }
        }).then((response) =>{
            this.Q_total = parseFloat(response.data[2].Value).toFixed(0);
            this.Q_set_point = parseFloat(response.data[3].Value).toFixed(0);
            this.Windspeed = parseFloat(response.data[0].Value).toFixed(2);
            this.NumWt_in_Power_production = parseFloat(response.data[1].Value).toFixed(2);
            this.uplimitedreactivepower = parseFloat(response.data[4].Value).toFixed(0);
        })
      },
      handleClick(tab, event) {
          console.log(tab, event);
      },
      SetKw(){
        this.$axios({
          method: 'post',
          url: '/api/values/PutSnapshot',
          data:[{
            "TagName":"LUA.CSWindFarmReactiveDemandLocal",
            "Time":"2020/06/24 19:34:00",
            "Value":this.form.kw,
            "Quality":"0"
          }],
          headers: {'content-type': 'application/json; charset=UTF-8'}
        }).then((response) =>{this.dialogFormVisible = false;console.log(response)})
      },
      changeHandler1(value) {
        this.$axios({
          method: 'post',
          url: '/api/values/PutSnapshot',
          data:[{
            "TagName":"LUA.IsAGCRemote",
            "Time":this.date,
            "Value":value,
            "Quality":"0"
          }],
          headers: {'content-type': 'application/json; charset=UTF-8'}
        }).then((response) =>{console.log(this.date)})
        this.$store.commit('saveRadio1',value)
      },
      changeHandler2(value) {
        if (value == 1) {
            this.$axios({
              method: 'post',
              url: '/api/values/PutSnapshot',
              data:[{
                "TagName":"LUA.IsParkControlIntoService",
                "Time":this.date,
                "Value":value,
                "Quality":"0"
              },
              {
                "TagName":"LUA.login_P_remote",
                "Time":this.date,
                "Value":value,
                "Quality":"0"
              }],
              headers: {'content-type': 'application/json; charset=UTF-8'}
            }).then((response) =>{console.log(this.date)})
            this.$store.commit('saveRadio2',value)
          } else{
            this.$axios({
              method: 'post',
              url: '/api/values/PutSnapshot',
              data:[{
                "TagName":"LUA.IsParkControlIntoService",
                "Time":this.date,
                "Value":value,
                "Quality":"0"
              }],
              headers: {'content-type': 'application/json; charset=UTF-8'}
            }).then((response) =>{console.log(this.date)})
            this.$store.commit('saveRadio2',value)
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
.el-aside {
    color: #333;
    text-align: center;
    line-height: 80px;
  }
</style>
