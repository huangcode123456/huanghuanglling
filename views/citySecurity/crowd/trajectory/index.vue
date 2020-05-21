<style lang="less" scoped>
    .jm-card-center-form{
        padding-top: 10px;
    }
</style>

<template>
    <div class="jm-main-inner p10">
        <div class="jm-card">
            <div class="jm-card-header">
                  <div class="jm-card-center-form">
                    <el-form :inline="true" size="small" class="demo-form-inline">
                        <el-form-item label="搜索内容：">
                            <el-input v-model="input" placeholder="搜索内容"></el-input>
                        </el-form-item>
                        <el-form-item label="搜索时间：">
                            <el-date-picker
                                v-model="value2"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                            </el-date-picker>
                        </el-form-item>
                        <el-button type="primary" @click="search" size="small">查询</el-button>
                        <el-button type="primary" @click="clean" size="small">清除</el-button>
                    </el-form>
                </div>
            </div>
            <div class="jm-card-center " style="postion:relative">
                <txMap ref="mychild" :qp="true" :isLngLat="false"></txMap>
            </div>
        </div>
    </div>    
</template>

<script>
import txMap from '../../../../components/txMap/txMap'
export default {
    components:{
        txMap
    },
    data(){
        return{
            input:'',
            value2:'',
            pickerOptions: {
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
                    }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },
    methods:{
        search(){
            console.log('搜索')
            var from=[22.629955329658163,113.11011672019958];
            var to=[22.62706367752099,113.1170904636383];
            var isClean=false;
            this.$refs.mychild.TrackPlayback(from,to,isClean);
        },
        clean(){
            var isClean=true;
            this.$refs.mychild.TrackPlayback(1,1,isClean);
        }
    }    
}
</script>