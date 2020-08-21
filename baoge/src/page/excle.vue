<template>
  <div id="driver-list-main" style="padding-top: 70px;">
    <div align="left">
      <table border="0">
        <tr>
          <td>
            <el-date-picker
                  v-model="value1"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间">
            </el-date-picker>
          </td>
          <td>
            <el-select v-model="value" placeholder="时间间隔" style="padding-left: 10px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
            <el-button type="primary" round @click="Search">查询</el-button>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
            <el-button type="success" round @click="export2Excel">导出</el-button>
          </td>
        </tr>
      </table>
    </div>
    <el-dialog width="250px" title="风机ID" :visible.sync="dialogFormVisible">
      <el-form :model="form" :label-position="labelPosition" label-width="80px">
        <el-form-item label="ID: " :label-width="formLabelWidth">
          <el-input v-model="form.valueWT" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="SetWT">确 定</el-button>
      </div>
    </el-dialog>
    <template>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="padding-top: 20px;">
        <el-tab-pane label="全场" name="first"></el-tab-pane>
        <el-tab-pane label="单机" name="second"></el-tab-pane>
      </el-tabs>
    </template>
        <el-table
          id="out-table"
          ref="multipleTable"
          :data="tableData"
          :header-cell-style="{background:'#ccc',color: ' #333'}"
          :show-header="true"
          style="width: 100%;text-align: center;"
          :highlightCurrentRow="true"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="DateTime" label="日期" width="180" align="center"></el-table-column>
          <el-table-column prop="Totalactivepower" label="有功功率" align="center"></el-table-column>
          <el-table-column prop="p_set_adjust_help" label="有功设定值" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="IsParkControlIntoService" label="有功投入状态" align="center"></el-table-column>
          <el-table-column prop="IsAGCRemote" label="有功远程控制" align="center"></el-table-column>
          <el-table-column prop="avr_windspeed" label="平均风速" align="center"></el-table-column>
          <el-table-column prop="NumWT_in_Power_production" label="并网台数" align="center"></el-table-column>
          <el-table-column prop="NumWT_comfail" label="通讯故障" align="center"></el-table-column>
          <el-table-column prop="Q_total" label="无功功率" align="center"></el-table-column>
          <el-table-column prop="Q_set_point" label="无功设定值" align="center"></el-table-column>
          <el-table-column prop="Is_Q_ParkControlIntoService" label="无功投入状态" align="center"></el-table-column>
          <el-table-column prop="IsAVCRemote" label="无功远程控制" align="center"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
  </div>
</template>

<script>
export default{
  name: "driver-list-main",
    data() {
      return {
  　　 tableData: [],
        activeName: 'first',
        min:0,
        value1: [],
        options: [{
                  value: '1',
                  label: '1秒'
                }, {
                  value: '3',
                  label: '3秒'
                }, {
                  value: '5',
                  label: '5秒'
                }, {
                  value: '10',
                  label: '10秒'
                }, {
                  value: '60',
                  label: '1分钟'
                }, {
                  value: '600',
                  label: '10分钟'
                }, {
                  value: '3600',
                  label: '1小时'
                }],
          value:'',
          dialogFormVisible:false,
          form: {
            valueWT: ''
          },
          total:1000,
          Station:"LUA.Totalactivepower,LUA.p_set_adjust_help,LUA.IsParkControlIntoService,LUA.IsAGCRemote,LUA.avr_windspeed,LUA.NumWT_in_Power_production,LUA.NumWT_comfail,LUA.Q_total,LUA.Q_set_point,LUA.Is_Q_ParkControlIntoService,LUA.IsAVCRemote"
        }
  　　},
  methods: {
      export2Excel: function() {
        let tables = document.getElementById("out-table");
        let table_book = this.$XLSX.utils.table_to_book(tables);
        var table_write = this.$XLSX.write(table_book, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          this.$FileSaver.saveAs(
            new Blob([table_write], { type: "application/octet-stream" }),
            "sheetjs.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, table_write);
        }
         return table_write;
     },
     // get:function(){
     //   this.$axios.get('http:localhost:8080/ping').then((res)=>{
     //     console.log(res);
     //   })
     // },
     handleClick(tab, event) {
        console.log(tab.name);
        if(tab.name=="second")
        {
          this.dialogFormVisible = true;
        }
     },
     SetWT(){

       this.dialogFormVisible = false;
     },
     Search(){
       console.log(this.value1[0].toLocaleString('chinese',{hour12:false}))
       console.log(this.value1[1].toLocaleString('chinese',{hour12:false}))
       console.log(this.value)
       console.log(this.Station)
       this.$axios.get("/api/ExcelLUA/GetExcelStation",{
         params: {
           StartTime:this.value1[0].toLocaleString('chinese',{hour12:false}),
           EndTime:this.value1[1].toLocaleString('chinese',{hour12:false}),
           Interval:this.value,
           count:10,
           tagName: this.Station
         }
       }).then((response) =>{
          console.log(response.data)
          for(var i=0;i<response.data.length;i++){
            let Excel = {
              DateTime:response.data[i].DateTime,
              Totalactivepower:parseFloat(response.data[i].Totalactivepower).toFixed(0),
              p_set_adjust_help:parseFloat(response.data[i].p_set_adjust_help).toFixed(0),
              IsParkControlIntoService:parseFloat(response.data[i].IsParkControlIntoService).toFixed(0),
              IsAGCRemote:parseFloat(response.data[i].IsAGCRemote).toFixed(0),
              avr_windspeed:parseFloat(response.data[i].avr_windspeed).toFixed(0),
              NumWT_in_Power_production:parseFloat(response.data[i].NumWT_in_Power_production).toFixed(0),
              NumWT_comfail:parseFloat(response.data[i].NumWT_comfail).toFixed(0),
              Q_total:parseFloat(response.data[i].Q_total).toFixed(0),
              Q_set_point:parseFloat(response.data[i].Q_set_point).toFixed(0),
              Is_Q_ParkControlIntoService:parseFloat(response.data[i].Is_Q_ParkControlIntoService).toFixed(0),
              IsAVCRemote:parseFloat(response.data[i].IsAVCRemote).toFixed(0)};
              console.log(parseInt(response.data[i].Total))
              if((parseInt(response.data[i].Total)%10) > 0){
                this.total = ((parseInt(response.data[i].Total)/10)+1)*10
              }else{
                this.total = parseInt(response.data[i].Total)
              }
              console.log(this.total)
              this.$set(this.tableData,i,Excel)
          }
       })
     }
   },
   mounted() {
     //console.log(this.min)
     const end = new Date();
     const start = new Date();
     start.setTime(start.getTime() - 3600 * 1000);
     this.value1 = [start,end]
     this.value = this.options[0].value
     this.Search();
   }
}
</script>

<style scoped>
</style>
