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
          <td style="width: 185px;"><p style="float: left;">有功功率:{{Tatalactivepower}}KW</p></td>
        </tr>
        <tr>
          <td style="width: 185px;"><p style="float: left;">无功功率:{{Q_total}}KV</p></td>
        </tr>
        <tr>
          <td style="width: 185px;"><p style="float: left;">有功设定值:{{P_set_adjust_help}}KW</p></td>
        </tr>
        <tr>
          <td style="width: 185px;"><p style="float: left;">有功设定值:{{Q_set_point}}KV</p></td>
        </tr>
      </table>
      <v-contextmenu ref="contextmenu">
          <v-contextmenu-item @click="handleClick">取消</v-contextmenu-item>
          <v-contextmenu-item @click="dialogFormVisible = true">菜单2</v-contextmenu-item>
          <v-contextmenu-item>菜单3</v-contextmenu-item>
      </v-contextmenu>
      <!-- Form -->

      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods:{
    handleClick(){
      this.$refs.contextmenu.hide()
    }
  },
  props:['WTID','Tatalactivepower','P_set_adjust_help','Q_total','Q_set_point','Windspeed']
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
