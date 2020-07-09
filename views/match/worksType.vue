<template>
    <div class="app-container">
        <el-form :inline="true" ref="form" size="mini">
            <el-form-item label="赛事名称">
                <el-select @change="matchChange" v-loading="loading" v-model="match" placeholder="请选择" size="small">
                    <el-option v-for="(item,i) in matchTable" :key="i" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="赛事项">
                <el-select @change="itemChange" v-model="item" placeholder="请选择" size="small">
                    <el-option v-for="(item,i) in matchItem" :key="i" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="赛事分组">
                <el-select v-model="group" placeholder="请选择" size="small">
                    <el-option v-for="(item,i) in matchGroup" :key="i" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="state" placeholder="请选择" size="small">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="审核中" value="0"></el-option>
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="拒绝" value="-1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="参赛编号">
                <el-input v-model="num" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="phone" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="list"
            element-loading-text="Loading"
            fit
            v-loading="loading"
            highlight-current-row
            border>
            <el-table-column
                width="150px"
                align="center"
                label="赛事名称"
                prop="matchName">
            </el-table-column>
            <el-table-column
                width="150px"
                align="center"
                label="赛事项"
                prop="matchProjectName">
            </el-table-column>
            <el-table-column
                width="150px"
                align="center"
                label="赛事分组"
                prop="matchProjectPriceName">
            </el-table-column>
            <el-table-column
                width="100px"
                align="center"
                label="用户姓名"
                prop="name">
            </el-table-column>
            <el-table-column
                width="100px"
                align="center"
                label="参赛人手机号"
                prop="phone">
            </el-table-column>
            <el-table-column
                width="100px"
                align="center"
                label="参赛编号"
                prop="ssNo">
            </el-table-column>
            <el-table-column
                width="100px"
                align="center"
                label="用户昵称"
                prop="nickname">
            </el-table-column>
            <el-table-column
                width="160px"
                align="center"
                label="上传时间"
                prop="createat">
            </el-table-column>
            <el-table-column
                width="180px"
                align="center"
                label="视频">
                <template slot-scope="scope" >
                    <el-link type="primary" @click="Toview(scope.row.links)" style="margin-left:5px">查看视频</el-link>
                    <!-- <video style="width:160px;height:160px" :src="videoUrl+scope.row.links"></video> -->
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="作品简介"
                prop="introduce">
            </el-table-column>
            <el-table-column
                align="center"
                label="审核状态">
                <template slot-scope="scope" >
                    <span>{{scope.row.state==0?'未审核':scope.row.state==1?'通过':'拒绝'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                width="210"
                align="center"
                label="操作">
                <template slot-scope="scope" >
                    <div class="btn-link">
                        <el-link type="primary" @click="agree(scope.row.id)" style="margin-left:5px">审核通过</el-link>
                        <el-link type="primary" @click="DontAgree(scope.row.id)" style="margin-left:5px">审核拒绝</el-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
        :close-on-click-modal="closeOnClickModal"
        :visible.sync="VideoVisible"
        :append-to-body="appendToBody"
        :before-close="beforeClose"
        width="800px">
            <video style="width:770px;height:500px" controls="controls" :src="links"></video>
        </el-dialog>

        <el-pagination
            style="margin-top:5px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import { getmatchWorkes , getGtMatchTable , matchWorkesaudit , matchprojectXlk , matchProjectPriceXlk } from '../../api/match'
import {IMG_URL} from '../../utils/const'
export default {
    data() {
        return {
            match:'',
            item:'',
            group:'',
            state:'',
            num:'',
            phone:'',
            matchTable:[],
            matchItem:[],
            matchGroup:[],
            list:[],
            loading:true,
             //分页
            total:0,
            currentPage:1,
            pageSize:10,
            videoUrl:IMG_URL,
            closeOnClickModal:false,
            appendToBody:true,
            VideoVisible:false,
            links:''
        };
    },
    methods: {
        matchChange(e){
            console.log(e)
            this.matchItem=[];
            this.matchGroup=[];
            this.item='';
            this.group=''
            const data={
                matchId:e
            }
            matchprojectXlk(data).then(res=>{
                console.log(res)
                this.matchItem=res.data
            })
        },
        itemChange(e){
            console.log(e)
            this.matchGroup=[];
            this.group=''
            const data=e
            matchProjectPriceXlk(data).then(res=>{
                console.log(res)
                this.matchGroup=res.data
            })
        },
        getGtMatchTable(){
            getGtMatchTable().then(res=>{
                let matchTable=res.data;
                matchTable=matchTable.filter(item => item.kind==1 )
                this.matchTable=matchTable;
                this.loading=!this.loading
            })
        },
        getmatchWorkes(){
            if(this.match==''){
                this.$message.error('请选择赛事');
                return false
            }
            const data={
                "matchId": this.match,
                "matchProjectId":this.item,
                "matchProjectPriceId":this.group,
                "phone":this.phone,
                "ssNo":this.num,
                "state":this.state,
                "pageNumber": this.currentPage,
                "pageSize": this.pageSize,
            }
            getmatchWorkes(data).then(res=>{
                console.log(res)
                this.list=res.data.records;
                this.total=res.data.totalRecord
            })
        },
        search(){
            this.getmatchWorkes()
        },
        agree(id){
            console.log(id)
            const data={
                id,
                state:1
            }
            this.$confirm('此操作将通过该作品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                matchWorkesaudit(data).then(res=>{
                    this.getmatchWorkes()
                    console.log(res)
                        this.$message({
                        message: '通过成功',
                        type: 'success'
                    });
                })
            })
            
            
        },
        DontAgree(id){
            console.log(id)
            const data={
                id,
                state:-1
            }
            this.$confirm('此操作将拒绝该作品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                matchWorkesaudit(data).then(res=>{
                    this.getmatchWorkes()
                    console.log(res)
                        this.$message({
                        message: '拒绝成功',
                        type: 'success'
                    });
                })
            })
        },
        Toview(links){
            this.links=this.videoUrl+links;
            this.VideoVisible=true
        },
        //分页
        handleSizeChange(val) {
            this.pageSize=val;
            this.getmatchWorkes()
        },
        handleCurrentChange(val) {
            this.currentPage=val;
            this.getmatchWorkes()
        },
        beforeClose(){
            console.log('关闭')
            this.VideoVisible=false;
            this.links=''
        }
    },
    mounted() {
        this.getGtMatchTable()
    },
}
</script>
<style lang='scss' scoped>

</style>