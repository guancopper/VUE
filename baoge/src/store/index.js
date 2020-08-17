import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        vl: true,
        flash:1,
        radio1:1,
        radio2:2,
        rows:[],
        rows1:[]
    },
    mutations:{
        savePath(state,pathName){
            state.pathName = pathName;
        },
        saveCurrDbSource(state,currDbSource){
            state.currDbSource = currDbSource;
        },
        saveCurrJobData(state,currJobData){
            state.currJobData = currJobData;
        },
        saveDbSource(state,DbSource){
            state.vl = DbSource;
        },
        saveflash(state,DbSource){
            state.flash = new Date().getTime();
        },
        saveRadio1(state,radio){
            state.radio1 = radio
        },
        saveRadio2(state,radio){
            state.radio2 = radio
        },
        saveRows(state,row){
          // this.rows.push(date:row[0].date,row[0].date)
        }
    }
})
