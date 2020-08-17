<template>
  <el-container>
    <el-header>
      <el-menu router
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        >
        <el-menu-item index="/chart">
          <i class="el-icon-location" ></i>
          <span slot="title">有功控制</span>
        </el-menu-item>
        <el-menu-item index="/chartNo">
          <i class="el-icon-menu"></i>
          <span slot="title">无功控制</span>
        </el-menu-item>
        <el-menu-item index="/fanGroup">
          <i class="el-icon-document"></i>
          <span slot="title">单机信息</span>
        </el-menu-item>
        <el-menu-item index="/excle">
          <i class="el-icon-setting"></i>
          <span slot="title">数据查询</span>
        </el-menu-item>
        <el-menu-item style="float: right;">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changevlaue"
            >
          </el-switch>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
    <el-main>
      <div>
        <router-view :key="activeDate"></router-view>
      </div>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default{
  data () {
    return {
      value: true,
      activeDate: 1,
      activeIndex:'/chart',
      timer: '',
      timer1:'',
      dateh1:'',
      dateh2:'',
      Tatalactivepower:'',
      P_set_adjust_help:'',
      Q_total:'',
      Q_set_point:''
    }
  },
  inject:['reload'],
  methods: {
    onSubmit(formName) {
      let str = '/'+formName;
      this.$router.push(str);
    },
    goTo(path) {
      this.$router.replace(path);
      console.log(this.$store.state.flash)
      this.reload()
    },
    changevlaue(){
      this.$store.commit('saveDbSource',this.value);
      this.activeDate = new Date().getTime();
    },
    get(){
      this.$axios.get("/api/values/GetSnapshot",{
        params: {
          tagName: 'LUA.TotalActivePower,LUA.P_set_adjust_help,LUA.Q_total,LUA.P_set_adjust_help'
        }
      }).then((response) =>{
          this.Tatalactivepower = parseFloat(response.data[0].Value).toFixed(0);
          this.P_set_adjust_help = parseFloat(response.data[1].Value).toFixed(0);
          this.Q_total = parseFloat(response.data[2].Value).toFixed(0);
          this.Q_set_point = parseFloat(response.data[3].Value).toFixed(0);
      })
      //有功功率
      this.$store.state.rows.push({ 'date': this.dateh1, 'Power': this.Tatalactivepower,'SetPower':this.P_set_adjust_help})
      //无功功率
      this.$store.state.rows1.push({ 'date': this.dateh1, 'NoPower': this.Q_total,'NoSetPower':this.Q_set_point})
      if(this.$store.state.rows.length > 300){
        this.$store.state.rows.shift()
        this.$store.state.rows1.shift()
      }
    },
    getTime(){
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      let mf2 = new Date().getMinutes()<10 ? '0'+new Date().getMinutes()-1 : new Date().getMinutes()-1;
      this.dateh1 = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
      this.dateh2 = yy+'-'+mm+'-'+dd+' '+hh+':'+mf2+':'+ss;
    }
  },
  mounted() {
    this.timer = setInterval(this.get, 1000);
    this.timer1 = setInterval(this.getTime, 500);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer1);
  }
}
</script>

<style scoped>
 .el-container{
   position: absolute;
   width: 100%;
   top: 0px ;
   left: 0 ;
   bottom: 0;
 }
 .el-header{
   padding: 0;
   z-index: 1000;
 }

 .el-header .fr{
   float: left;
 }
 .el-header .el-menu{
   border-bottom: none;
 }
 .el-aside, .el-main{
   padding-top: 10px;
   background-image: url(../assets/login.jpeg);
   background-size: cover;
 }
 .el-aside{
   background: #545c64;
 }
 .el-aside .el-menu{
   border-right: none;
 }
</style>
