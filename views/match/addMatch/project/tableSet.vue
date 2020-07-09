<template>
  <div>
    <div style="padding-bottom:20px;">
      <el-button style="margin-left:10px" type="info" @click="Back" size="mini">返回</el-button>
      <el-button type="primary" @click="addNews" icon="el-icon-plus" size="mini">新增</el-button>
      <el-button style="margin-left:10px" type="success" icon='el-icon-edit' @click="updSort" size="mini">修改排序</el-button>
    </div>

    <el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column
        align="center"
        width="80"
        label="排序字段"
        >
        <template slot-scope="scope" >
          <el-input
            size="mini"
            v-model="scope.row.listIndex"
            :disabled="false">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="属性名称"
        prop="fieldName">
      </el-table-column>
      <!-- <el-table-column
        width="200px"
        align="center"
        label="系统预置属性"
        prop="title">
      </el-table-column> -->
      <!-- <el-table-column
        width="200px"
        align="center"
        label="复制预置属性"
        prop="title">
      </el-table-column> -->
      <!-- <el-table-column
        width="200px"
        align="center"
        label="是否自定义字段"
        prop="title">
      </el-table-column> -->
      <el-table-column
        width="200px"
        align="center"
        label="是否必填"
        prop="must">
          <!-- <template slot-scope="scope" >
            <span>{{scope.row.must==1?'必填':'非必填'}}</span>
          </template> -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.must"
              :active-value='1'
							:inactive-value='0'
							@change="updMust(scope.row)"
							>
            </el-switch>
            <span v-if='scope.row.must==1'>必填</span>
            <span v-else>非必填</span>
          </template>
      </el-table-column>
      <el-table-column
        width="60px"
        align="center"
        label="状态"
        prop="state">
        <template slot-scope="scope" >
          <span>{{scope.row.state==1?'正常':'停用'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="可选值"
        prop="optValue">
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="操作">
          <template slot-scope="scope" >
            <div class="btn-link">
              <!-- <el-link type="primary" @click="" style="margin-left:5px">复制</el-link> -->
              <!-- <el-link type="primary" @click="updMust(scope.row.id)" style="margin-left:5px">取消必填</el-link> -->
              <el-link type="primary" v-if="scope.row.sysField!='card_no' && scope.row.sysField!='name' && scope.row.sysField!='phone'" @click="del(scope.row.id)" style="margin-left:5px">删除</el-link>
            </div>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="新增"
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible"
      :append-to-body="appendToBody"
      width="60%">
      <el-form  ref="form" :model="form" label-width="90px">
          <!-- <el-form-item label="字段类型" required>
              <el-input v-model="form.title"></el-input>
          </el-form-item> -->
          <el-form-item label="选择属性" required>
            <el-select style="width:100%" v-model="form.name" placeholder="请选择">
              <el-option v-for="(item,i) in ditList" :key="i" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="属性名称" required>
              <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="表单类型" required>
              <el-radio v-model="form.radio" label="1">文本框</el-radio>
              <el-radio v-model="form.radio" label="2">选择框</el-radio>
          </el-form-item>
          <!-- <el-form-item label="可选值" v-if="form.radio==2" required> -->
          <el-form-item
            v-if="form.radio==2"
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'可选值' + index"
            :key="domain.key"
          >
            <el-input v-model="domain.value" style="width:250px;margin-right:10px"></el-input>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form-item>
          <el-form-item v-if="form.radio==2">
            <el-button size="mini" @click="addDomain">新增可选值</el-button>
          </el-form-item>
          <!-- </el-form-item> -->
          <el-form-item label="是否必填">
              <el-select style="width:100%" v-model="form.must" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
            <el-button style="" @click="onSubmit">确定</el-button>
          </el-form-item>
      </el-form>
  </el-dialog>
  </div>
</template>

<script>
import { gtEntrantsTmpSort,listEntrantsTmp,dictionaryList,insertEntrantsTmp,deleteEntrantsTmp,updateEntrantsTmp } from '../../../../api/match'
export default {
  data(){
    return{
      list:[],

      //可选值数量
      dynamicValidateForm: {
        domains: [{
          value: ''
        }]
      },
      form:{
        name:'',
        // title:'',
        must:'1',
        radio:'1'
      },
      //dialog
      appendToBody:true,
      closeOnClickModal:false,
      dialogVisible:false,

      ditList:[]
    }
  },
  mounted(){
    this.listEntrantsTmp()
    this.dictionaryList()
  },
  methods:{
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    listEntrantsTmp(){
      const data={
        matchId:this.$route.query["id"],
        matchProjectId:this.$route.query["projectId"],
        pageNumber:1,
        pageSize:20,
      }
      listEntrantsTmp(data).then(res=>{
        console.log(res);
        this.list=res.data.records;
      })
    },
    dictionaryList(){
      const data={

      }
      dictionaryList(data).then(res=>{
        console.log(res,'字典表')
        this.ditList=res.data
      })
    },
    Back(){
      this.$router.push({
        path:'list',
        query:{
          id:this.$route.query["id"],
          upd:this.$route.query["upd"],
        }
      })
    },
    addNews(){
      this.dialogVisible=true
    },
    onSubmit(){
      console.log(this.dynamicValidateForm.domains)
      let arr=[];
      for(let i=0;i<this.dynamicValidateForm.domains.length;i++){
        arr.push(this.dynamicValidateForm.domains[i].value)
      }
      let sysField=''
      for(let i=0;i<this.ditList.length;i++){
        if(this.form.name==this.ditList[i].name){
          sysField=this.ditList[i].value
        }
      }
      console.log(arr.join(','))
      const data={
        matchId:this.$route.query["id"],
        matchProjectId:this.$route.query["projectId"],
        sysField,
        must:this.form.must,
        fieldType:this.form.radio,
        optValue:this.form.radio==1?'':arr.join(','),
        state:1,
        fieldName:this.form.name,
        releaseState:1
      }
      insertEntrantsTmp(data).then(res=>{
        console.log(res)
        this.dialogVisible=false;
        this.listEntrantsTmp()
      })
    },
    del(id){
      const data={
        id
      };
      this.$confirm('此操作将删除该属性, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        deleteEntrantsTmp(data).then(res=>{
          console.log(res);
          this.listEntrantsTmp()
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        })
      })
    },
    updMust(row){
      const data={
        id:row.id,
        must:row.must
      }
      updateEntrantsTmp(data).then(res=>{
        if(res.code==200){
          this.$message.success("修改成功");
        }
        // this.listEntrantsTmp()
      })
    },
    updSort(){
      let records=[]
      for(let i=0;i<this.list.length;i++){
        records.push(
          {
            'id':this.list[i].id,
            'listIndex':this.list[i].listIndex
          }
        )
			}
			console.log(records)
      const data={
        records
      }
      gtEntrantsTmpSort(data).then(res => {
				console.log(res)
				this.$message.success('修改排序成功')
        this.listEntrantsTmp()
      })
    },
  }
}
</script>
