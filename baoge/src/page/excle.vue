<template>
  <div id="driver-list-main" style="padding-top: 100px;">
    <el-button @click="export2Excel">导出</el-button>
        <el-table
          id="out-table"
          ref="multipleTable"
          :data="tableData"
          :header-cell-style="{background:'#ccc',color: ' #333'}"
          :show-header="true"
          style="width: 100%"
          :highlightCurrentRow="true"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        </el-table>
  </div>
</template>

<script>
export default{
  name: "driver-list-main",
    data() {
      return {
  　　 tableData: [
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-08",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-06",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-07",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          }
        ]}
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
     get:function(){
       this.$axios.get('http:localhost:8080/ping').then((res)=>{
         console.log(res);
       })
     }

   }
}
</script>

<style scoped>
</style>
