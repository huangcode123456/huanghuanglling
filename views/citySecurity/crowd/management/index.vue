<style scoped>
   .yauto{
       overflow-y: auto;
   }
</style>

<template>
    <div class="jm-main-inner p10">
        <div class="jm-card yauto">
            <div class="jm-card-center">
                <el-table
                    :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
                    class="jm-table"
                    style="width: 100%;"
                    pagesize='3'
                    >
                        <el-table-column
                            prop="num"
                            label="序号"
                            width="50"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            align="center"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="img"
                            align="center"
                            width="180"
                            label="照片">
                            <template scope="scope">
                                <img  :src="scope.row.img" alt="" style="width: 100px;height: 100px">
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="age"
                            align="center"
                            width="50"
                            label="年龄">
                        </el-table-column>
                        <el-table-column
                            prop="birthday"
                            align="center"
                            width="140"
                            label="出生年月">
                        </el-table-column>
                        <el-table-column
                            prop="sex"
                            align="center"
                            width="50"
                            label="性别">
                        </el-table-column>
                        <el-table-column
                            prop="place"
                            align="center"
                            width="140"
                            label="籍贯信息">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            align="center"
                            width="180"
                            label="居住地址">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            align="center"
                            width="180"
                            label="近期异常行为">
                        </el-table-column>
                        <el-table-column
                            prop="note"
                            align="center"
                            width="180"
                            label="备注">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            align="center"
                            width="180"
                            label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                </el-table>
                <div class="p10">
                    <el-pagination
                    class="jm-pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[4, 10, 20, 30]"
                    :page-size='4'
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pagesize:4,
            currpage:1,
            tableData:[
                {
                    num:1,
                    name:'张三',
                    img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584524478878&di=ae805b92c5f8758f257aec53115d32b2&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
                    age:'10',
                    birthday:'1997.04.03',
                    sex:'男',
                    place:'湖北武汉',
                    address:'某某市某某区某某县',
                    status:'昼夜付出',
                    note:'刑满释放人员',
                },
                {
                    num:2,
                    name:'张三',
                    img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584524478878&di=ae805b92c5f8758f257aec53115d32b2&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
                    age:'10',
                    birthday:'1997.04.03',
                    sex:'男',
                    place:'湖北武汉',
                    address:'某某市某某区某某县',
                    status:'昼夜付出',
                    note:'刑满释放人员',
                },
                {
                    num:3,
                    name:'张三',
                    img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584524478878&di=ae805b92c5f8758f257aec53115d32b2&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
                    age:'10',
                    birthday:'1997.04.03',
                    sex:'男',
                    place:'湖北武汉',
                    address:'某某市某某区某某县',
                    status:'昼夜付出',
                    note:'刑满释放人员',
                },
                {
                    num:4,
                    name:'张三',
                    img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584524478878&di=ae805b92c5f8758f257aec53115d32b2&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
                    age:'10',
                    birthday:'1997.04.03',
                    sex:'男',
                    place:'湖北武汉',
                    address:'某某市某某区某某县',
                    status:'昼夜付出',
                    note:'刑满释放人员',
                },
                {
                    num:5,
                    name:'张三',
                    img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584524478878&di=ae805b92c5f8758f257aec53115d32b2&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
                    age:'10',
                    birthday:'1997.04.03',
                    sex:'男',
                    place:'湖北武汉',
                    address:'某某市某某区某某县',
                    status:'昼夜付出',
                    note:'刑满释放人员',
                },
                {
                    num:6,
                    name:'张三',
                    img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584524478878&di=ae805b92c5f8758f257aec53115d32b2&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
                    age:'10',
                    birthday:'1997.04.03',
                    sex:'男',
                    place:'湖北武汉',
                    address:'某某市某某区某某县',
                    status:'昼夜付出',
                    note:'刑满释放人员',
                },
                {
                    num:7,
                    name:'张三',
                    img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584524478878&di=ae805b92c5f8758f257aec53115d32b2&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
                    age:'10',
                    birthday:'1997.04.03',
                    sex:'男',
                    place:'湖北武汉',
                    address:'某某市某某区某某县',
                    status:'昼夜付出',
                    note:'刑满释放人员',
                },
            ]
        }
    },
    mounted(){

    },
    methods:{
        //选择每页显示条数时触发
        handleSizeChange(val){
            console.log(val)
            this.pagesize=val
        },
        handleCurrentChange(val){
            this.currpage=val
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    }
}
</script>