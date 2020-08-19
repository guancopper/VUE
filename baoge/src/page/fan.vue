<template>
  <div id="station" style="color: white;">
      <table border="1" v-contextmenu:contextmenu>
        <tr>
          <td rowspan="6" style="width: 100px;">
            <div>
              <div class="lds-hourglass"></div>
            </div>
          </td>
          <td style="width: 185px;"><p style="float: left;">ID:{{WTID}}</p></td>
        </tr>
        <tr>
          <td style="width: 185px;"><p style="float: left;">风速:{{Windspeed}}(m/s)</p></td>
        </tr>
        <tr>
          <td style="width: 185px;"><p style="float: left;">有功功率:{{activepowerkw}}KW</p></td>
        </tr>
        <tr>
          <td style="width: 185px;"><p style="float: left;">无功功率:{{reactivepowerkv}}KV</p></td>
        </tr>
        <tr>
          <td style="width: 185px;"><p style="float: left;">有功设定值:{{activepowerdemand}}KW</p></td>
        </tr>
        <tr>
          <td style="width: 185px;"><p style="float: left;">无功设定值:{{reactivepowerdemand}}KV</p></td>
        </tr>
      </table>
      <v-contextmenu ref="contextmenu">
          <v-contextmenu-item @click="handleClick1">设置样板机</v-contextmenu-item>
          <v-contextmenu-item @click="handleClick2">取消样板机</v-contextmenu-item>
          <v-contextmenu-item @click="dialogFormVisible = true">有功设定值</v-contextmenu-item>
          <v-contextmenu-item @click="dialogFormVisible1 = true">无功设定值</v-contextmenu-item>
      </v-contextmenu>
      <!-- Form -->
      <el-dialog title="有功设定值" :visible.sync="dialogFormVisible" width="30%" center="true">
        <el-form :model="form">
          <el-form-item label="设定值(KW)" :label-width="formLabelWidth">
            <el-input v-model="formKW.value" placeholder="请输入值" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="SetKW">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="无功设定值" :visible.sync="dialogFormVisible1" width="30%" center="true">
        <el-form :model="form">
          <el-form-item label="设定值(KV)" :label-width="formLabelWidth">
            <el-input v-model="formKV.value" placeholder="请输入值" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="SetKV">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'station',
  data () {
    return {
      divhideen: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      formKW: {
        value: ''
      },
      formKV: {
        value: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods:{
    handleClick1(){
      this.$refs.contextmenu.hide()
      this.$axios({
        method: 'post',
        url: '/api/values/PutSnapshot',
        data:[{
          "TagName":"demo.demo8",
          "Time":"2020/06/24 19:34:00",
          "Value":"1",
          "Quality":"0"
        }],
        headers: {'content-type': 'application/json; charset=UTF-8'}
      }).then((response) =>{console.log(response)})
    },
    handleClick2(){
      this.$refs.contextmenu.hide()
      this.$axios({
        method: 'post',
        url: '/api/values/PutSnapshot',
        data:[{
          "TagName":"demo.demo8",
          "Time":"2020/06/24 19:34:00",
          "Value":"0",
          "Quality":"0"
        }],
        headers: {'content-type': 'application/json; charset=UTF-8'}
      }).then((response) =>{console.log(response)})
    },
    SetKW(){
      //console.log(this.formKW.value)
      this.$axios({
        method: 'post',
        url: '/api/values/PutSnapshot',
        data:[{
          "TagName":"demo.demo9",
          "Time":"2020/06/24 19:34:00",
          "Value":this.formKW.value,
          "Quality":"0"
        }],
        headers: {'content-type': 'application/json; charset=UTF-8'}
      }).then((response) =>{this.dialogFormVisible = false;console.log(response)})
    },
    SetKV(){
      //console.log(this.formKW.value)
      this.$axios({
        method: 'post',
        url: '/api/values/PutSnapshot',
        data:[{
          "TagName":"demo.demo7",
          "Time":"2020/06/24 19:34:00",
          "Value":this.formKV.value,
          "Quality":"0"
        }],
        headers: {'content-type': 'application/json; charset=UTF-8'}
      }).then((response) =>{this.dialogFormVisible1 = false;console.log(response)})
    }
  },
  props:['WTID','activepowerkw','reactivepowerkv','activepowerdemand','reactivepowerdemand','Windspeed']
}
</script>

<style scoped>
.lds-hourglass {
	display:inline-block;
	position:relative;
	width:90px;
	height:90px
}
.lds-hourglass:after {
	content:"";
	display:block;
	border-radius:50%;
	width:90px;
	height:90px;
	margin:1px;
	box-sizing:content-box;
	animation:rotating 2s linear infinite;
 background-image: url(../assets/feng.jpg);
 background-size: cover;
}
@keyframes lds-hourglass {
 -webkit-transform: rotate(180deg);  /* Safari 和 Chrome */
 -webkit-transform-origin:50% 50%;
}
.v-contextmenu{
    padding: 18px 0 5px 0;
}
.v-contextmenu .flag{
    widtQ_set_pointh: 31px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
}
.v-contextmenu .flag span{
    width: 65px;
    height: 24px;
    line-height: 33px;
    display: inline-block;
    text-align: center;
    transform: rotate(-40deg);
    background: #007fff;
    color: #fff;
    padding-right: 17px;
    position: relative;
    left: -20px;
    top: -14px;
}
.v-contextmenu .flag span i{
    color: #fff;
}
.v-contextmenu .v-contextmenu-item{
    width: 90px;
    height: 24px;
}
.v-contextmenu .v-contextmenu-item:hover{
    background: #f4f5f6;
    border-left: 3px solid #007FFF;
    color: #65778b;
    font-weight: 600;
}
.v-contextmenu .v-contextmenu-item:hover i{
    color: #65778b;
}
.v-contextmenu .v-contextmenu-item i{
    padding-right: 10px;
}
</style>
