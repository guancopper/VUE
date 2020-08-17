<template>
  <div>
    <el-button @click="get">get</el-button>
    <el-button @click="post">post</el-button>
    <p>{{vl}}</p>
    <section>
    </section>
  </div>
</template>

<script>
export default{
  data(){
    return {
      vl: 100,
      timer: '',
      data: {TagName:'demo.demo1',Time:'2020/06/24 14:35:00',Value:'3000',Quality:0}
    }
  },
  methods: {
    get(){
      this.$axios.get("/api/values/GetSnapshot",{
    params: {
      tagName: 'demo.demo1'
    }
  }).then((response) =>{
        console.log("getget")
        this.vl = response.data[0].Value;
      })
    },
    post(){
      this.$axios({
        method: 'post',
        url: '/api/Snapshot',
        data:[{
          "TagName":"demo.demo1",
          "Time":"2020/06/24 19:34:00",
          "Value":"4000",
          "Quality":"0"
        }],
        headers: {'content-type': 'application/json; charset=UTF-8'}
      });
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

<style>
</style>
