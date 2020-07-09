<template>
    <div class="app-container">
        <el-steps :space="200" :active="3" simple finish-status="success" style="margin-bottom:15px;">
          <el-step :title="step1"></el-step>
          <el-step :title="step2"></el-step>
          <el-step :title="step3"></el-step>
          <el-step :title="step4"></el-step>
        </el-steps>
        <el-form  ref="form" :model="form" label-width="100px">
            <el-form-item label="证书模板" v-if="btnStatus!=1">
                <el-upload
                class="upload-demo"
                :headers="headers"
                :action="uploadAction"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :file-list="fileList"
                :limit="1"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">支持png\jpg\jpeg常用图片格式</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="预览设置" v-if="currentImage!=''">
                <div style="width: 100%;height: 500px; border: 1px solid #e5e6e7;background-color: #e5e6e7;" id="map"></div>
            </el-form-item>
            <el-form-item label="设置标注" v-if="currentImage!=''">
              <el-input type="textarea" v-model="settingValue" readonly></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" style="margin-top:10px" @click="zsBaocun(false)" v-if="btnStatus!=1">保存</el-button>
            </el-form-item>

            <el-form-item label="报名短信模板" v-if="this.$route.query['zssc']!=true && this.$route.query['zssc']!='true'">
                <el-select v-model="form.Sms" placeholder="请选择" style="width: 100%;" size="small" @change="SmsChange">
                    <el-option v-for="(item,i) in listSms" :key="i" :label="item.name" :value="item.tmpCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模板内容" v-if="this.$route.query['zssc']!=true &&this.$route.query['zssc']!='true'">
                <span>{{content}}</span>
            </el-form-item>
            <el-form-item>
                <el-button size="small" style="margin-top:10px" @click="dxmbBaocun(false)" v-if="btnStatus!=1">保存</el-button>
            </el-form-item>

            <el-form-item>
                <el-button size="small" v-if="this.$route.query['zssc']!=true &&this.$route.query['zssc']!='true'" style="margin-top:10px" @click="Back">上一步</el-button>
                <el-button size="small" style="margin-top:10px" @click="tishen" v-if="btnStatus!=1">提审</el-button>
            </el-form-item>
        </el-form>

        <el-dialog
            title="标注设置"
            :close-on-click-modal="closeOnClickModal"
            :visible.sync="dialogVisible"
            :append-to-body="appendToBody"
            width="60%">
            <el-form  ref="form" :model="setForm" label-width="100px">
                <el-form-item label="变量名称" required>
                    <el-input v-model="setForm.field" size='small'></el-input>
                </el-form-item>
                <el-form-item label="字体" required>
                    <el-input v-model="setForm.fontName" size='small'></el-input>
                </el-form-item>
                <el-form-item label="字体大小" required>
                    <el-input v-model="setForm.fontSize" size='small' type="number"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="setDelete">删除</el-button>
                    <el-button @click="setClose">关闭</el-button>
                    <el-button type="primary" @click="setSubmit">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-form  v-if="this.$route.query['zssc']==true || this.$route.query['zssc']=='true'" ref="form" :model="formZs" label-width="100px">
            <el-form-item label="证书名称">
                <el-input v-model="formZs.title" size='small'></el-input>
            </el-form-item>
            <el-form-item label="操作类型">
                <el-select v-model="formZs.type" placeholder="请选择" style="width: 100%;" size="small" @change="SmsChange">
                    <el-option label="追加生成" value="1"></el-option>
                    <el-option label="清空生成" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="批量上传">
                <el-upload
                    class="upload-demo"
                    :headers="headers"
                    :action="uploadAction"
                    :on-preview="handlePreview1"
                    :on-remove="handleRemove1"
                    :on-success="handleSuccess1"
                    :file-list="fileListWenjian">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <a slot="tip" @click="upload" class="el-upload__tip">下载模板,请保持列头顺序</a>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button size="small" style="margin-top:10px" @click="certificateGenerate">生成证书</el-button>
            </el-form-item>
        </el-form>

        <el-table
            v-if="this.$route.query['zssc']==true || this.$route.query['zssc']=='true'"
            :data="Zslist"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row>
            <el-table-column
                align="center"
                label="生成时间"
                prop="createTime">
            </el-table-column>
            <el-table-column
                align="center"
                label="证书名称"
                prop="certificateName">
            </el-table-column>
            <el-table-column
                align="center"
                label="手机号码"
                prop="phone">
            </el-table-column>

            <el-table-column
                fixed="right"
                width="150"
                align="center"
                label="操作">
                <template slot-scope="scope" >
                    <a :href="scope.row.fileUrl">点击预览</a>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            v-if="this.$route.query['zssc']==true || this.$route.query['zssc']=='true'"
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
import {AIMarker} from '../../../../node_modules/vue-picture-bd-marker'
import { getTemplateList } from '../../../api/sms'
import { search,certificateGenerate,certificate,UpdMatchSet,zsSave,exportCertificateDataTemplate,queryMatchBaseInfo } from '../../../api/match'
import {UPLOAD_ACTION,IMG_URL} from '@/utils/const.js'

import "ol/ol.css";
import { Map, View } from "ol";
import OSM from 'ol/source/OSM';
import FullScreen from 'ol/control/FullScreen';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import Select from 'ol/interaction/Select.js';
import {Tile as TileLayer,Vector as VectorLayer} from 'ol/layer.js';
import Stamen from 'ol/source/Stamen.js';
import VectorSource from 'ol/source/Vector.js';
import {Icon,Style} from 'ol/style.js';
import { Projection, Transform,} from 'ol/proj';
import { getCenter } from "ol/extent";
import ImageLayer from "ol/layer/Image";
import ImageStatic from "ol/source/ImageStatic";
import markerBg from "@/assets/images/marker.png";

export default {
  name: "stagePicPage",
  components: { 'ui-marker':AIMarker },
  data(){
    return{
      map: null, // 模板对象
      vector:null,
      pointList:[],//标志缓存
      layerList:[],//marker图层缓存
      curMarker:null,//当前marker点
      curMarkerIndex:0,//当前marker点标
      tagIndex:0,//tag下标
      imgx: 0, // 图片宽
      imgy: 0,  // 图片高

      iconVector:null,
      setForm:{
        pixel0:null,
        pixel1:null,
        coordinate0:null,
        coordinate1:null,
        field:'',
        fontName:'微软雅黑',
        fontSize:16
      },

      status:true,//是否可埋点
      uuid:'',
      currentImage:"",//当前证书模板底图

      //dialog
      appendToBody:true,
      closeOnClickModal:false,
      dialogVisible:false,

      uploadAction:UPLOAD_ACTION,
      settingValue:'',
      settingJsonRecords:[],
      step1:'基本信息',
      step2:'赛事项设置',
      step3:'报名分组设置',
      step4:'模板设置',
      form:{
          title:'',
          fontSize:'',
          Sms:''
      },

      headers:{"token": ''},

      fileList:[],

      //短信模板
      listSms:[],

      content:'',
      bgUrl:'',

      btnStatus:'',

      formZs:{
          title:'',
          type:''
      },

      fileListWenjian:[],
      Zslist:[],

      //分页
      total:0,
      currentPage:1,
      pageSize:10,
    }
  },
  created(){
  },
  mounted(){

    if(this.$route.query["upd"]==false || this.$route.query["upd"]=='false'){
      this.btnStatus=1;
      this.step1='基本信息';
      this.step2='赛事项信息';
      this.step3='报名分组信息';
      this.step4='模板信息';
    }
    this.headers.token=sessionStorage.getItem("token")


    if(this.$route.query["id"]!=undefined){
      const data=this.$route.query["id"]
      certificate(data).then(async res=>{
        if(res.code==200&&res.data!=null){
          this.fileList=[{url:res.data.bgFullUrl,path:res.data.bgUrl}];
          this.bgUrl=res.data.bgUrl;
          this.currentImage=await res.data.bgFullUrl;
          this.settingJsonRecords=res.data.settingJsonRecords;
          if(this.currentImage!=''){
            var img = new Image();
            img.src = this.currentImage;
            var that = this;
            img.onload = function(res) {
              // 初始化获取底图的宽高
              that.imgx = res.target.width;
              that.imgy = res.target.height;
              that.initMap();
              if(that.settingJsonRecords.length>0){
                var settingVal = '';

                for(var i=0;i<that.settingJsonRecords.length;i++){
                  var setting = that.settingJsonRecords[i];
                  setting.name = that.tagIndex+'';
                  settingVal += JSON.stringify(setting) + ',';
                  that.createMarker([setting.coordinate0,setting.coordinate1],setting);
                  that.curMarkerIndex++;
                  that.tagIndex++;
                }
                if(settingVal.length > 0 ){
                  settingVal = settingVal.substring(0,settingVal.length -1 );
                  settingVal = '['+ settingVal + ']';
                }
                that.settingValue = settingVal;
              }

            };
          }
        }
      });
      queryMatchBaseInfo({id:data}).then(res=>{
        console.log(res,'赛事基本信息')
        this.form.Sms = res.data.smsTmpCode==null?'':`${res.data.smsTmpCode}`;
        this.getTemplateList();
      });
    }else{
      this.getTemplateList();
    }

    if(this.$route.query["zssc"]==true || this.$route.query["zssc"]=='true'){
        this.zsSearch()
    }
  },
  methods:{
    // 初始化模板
    initMap() {
      // 计算静态地图映射到地图上的范围
      let extent = [0, 0, this.imgx, this.imgy];
      let projection = new Projection({ // 投影
        extent: extent
      });

      this.map = new Map({
        target: "map",
        layers: [
          new ImageLayer({
            source: new ImageStatic({
              url: this.currentImage, // 加载静态地图
              imageExtent: extent // 地图的位置
            })
          })
        ],
        view: new View({
          projection: projection,
          center: getCenter([0, 0, this.imgx, this.imgy]), // 获取范围的中心坐标。
          zoom: 1.0,
          maxZoom: 3.0,
          minZoom: 1.0
        })
      });

      //创建矢量容器，当点击时将图标feature放进去
      this.iconVector = new VectorSource({
        features:[]
      })

      //创建图层
      var iconLayer = new VectorLayer({
        source:this.iconVector
      })
      //将图层添加到地图上
      this.map.addLayer(iconLayer);

      this.map.on('singleclick',this.mapClick);

      this.tagIndex=0;
      this.curMarkerIndex=0;
      this.pointList=[];//标志缓存
      this.layerList=[];//marker图层缓存
    },
    mapClick(e){
      console.log(e,"mouse click");
      //点击的坐标
      var p = e.coordinate
      var pixel = e.pixel;

      var feature = this.map.forEachFeatureAtPixel(pixel,function(feature,layer){
        return feature;
      });
      if(feature){
        //老点
        var attr = feature.attr;
        this.curMarkerIndex = attr.name;
        this.setForm = {
          pixel0:attr.pixel0,
          pixel1:attr.pixel1,
          coordinate0:attr.coordinate0,
          coordinate1:attr.coordinate1,
          field:attr.field,
          fontName:attr.fontName==''?'微软雅黑':attr.fontName,
          fontSize:attr.fontSize
        }

      }else{
        //新点
        if(this.status){
          this.curMarkerIndex = this.tagIndex;
          this.createMarker(p,{name:''})
          this.setForm = {
            pixel0:pixel[0],
            pixel1:pixel[1],
            coordinate0:p[0],
            coordinate1:p[1],
            field:'',
            fontName:'微软雅黑',
            fontSize:16
          }
        }
      }
      this.dialogVisible=true
    },
    createMarker(p,obj){
      this.curMarkerIndex = this.tagIndex;
      if(!obj.name){
        obj.name = this.tagIndex+'';
      }
      this.tagIndex++;
      //添加地图点击标记,创建标记feature
      var iconFeature = new Feature({
        geometry: new Point(p),
        name: obj.name,
        attr:obj
      });
      //标记样式
      var iconStyle = new Style({
        image: new Icon({
          src:markerBg
        })
      });
      //设置标记样式
      iconFeature.setStyle(iconStyle);
      // this.iconVector.clear()//每次先清空容器
      iconFeature.attr = obj;
      this.iconVector.addFeature(iconFeature)//将创建好的feature放入到容器中

      //创建图层
      // var iconLayer = new VectorLayer({
      //   source:this.iconVector,
      //   name:obj.name
      // })
      // //将图层添加到地图上
      // this.map.addLayer(iconLayer);

      this.pointList.push(iconFeature);//标志缓存
      // this.layerList.push(iconLayer);//marker图层缓存
    },

    setDelete(){
      var point = this.map.forEachFeatureAtPixel([this.setForm.pixel0,this.setForm.pixel1],function(feature,layer){
        return feature;
      });
      if(point==undefined){
        for(var i=0;i<this.pointList.length;i++){
          var attr = this.pointList[i].attr;
          if(attr.pixel0==this.setForm.pixel0&&attr.pixel1==this.setForm.pixel1){
            point=this.pointList[i];
            break;
          }
        }
      }
      var pindex = this.pointList.indexOf(point);
      if(point){
        this.iconVector.removeFeature(point);
        this.pointList.splice(pindex,1);
      }

      var settingVal = '';

      for(var i=0;i<this.pointList.length;i++){
        settingVal += JSON.stringify(this.pointList[i].attr) + ',';
      }
      if(settingVal.length > 0 ){
        settingVal = settingVal.substring(0,settingVal.length -1 );
        settingVal = '['+ settingVal + ']';
      }
      this.settingValue = settingVal;
      this.dialogVisible = false;
    },
    setClose(){
      var point = this.map.forEachFeatureAtPixel([this.setForm.pixel0,this.setForm.pixel1],function(feature,layer){
        return feature;
      });
      if(point==undefined){
        for(var i=0;i<this.pointList.length;i++){
          var attr = this.pointList[i].attr;
          if(attr.pixel0==this.setForm.pixel0&&attr.pixel1==this.setForm.pixel1){
            point=this.pointList[i];
            break;
          }
        }
      }
      var pindex = this.pointList.indexOf(point);

      if(point&&(!point.attr||!point.attr.field)){
        this.iconVector.removeFeature(point);
        this.pointList.splice(pindex,1);
      }
      this.dialogVisible = false;
    },
    setSubmit(){
      if(this.setForm.field==''){
        this.$message.warning("变量名称必填");
      }else if(this.setForm.fontName==''){
        this.$message.warning("字体必填");
      }else if(this.setForm.fontSize==''){
        this.$message.warning("字体大小必填");
      }else{
        var point = this.map.forEachFeatureAtPixel([this.setForm.pixel0,this.setForm.pixel1],function(feature,layer){
          return feature;
        });
        if(point==undefined){
          for(var i=0;i<this.pointList.length;i++){
            var attr = this.pointList[i].attr;
            if(attr.pixel0==this.setForm.pixel0&&attr.pixel1==this.setForm.pixel1){
              point=this.pointList[i];
              break;
            }
          }
        }
        var index = this.pointList.indexOf(point);
        point.attr = {};
        point.attr.field = this.setForm.field;
        point.attr.fontName = this.setForm.fontName;
        point.attr.fontSize = this.setForm.fontSize;
        point.attr.coordinate0 = this.setForm.coordinate0;
        point.attr.coordinate1 = this.setForm.coordinate1;
        point.attr.pixel0 = this.setForm.pixel0;
        point.attr.pixel1 = this.setForm.pixel1;
        this.pointList.splice(index,1,point);
        var settingVal = '';

        for(var i=0;i<this.pointList.length;i++){
            settingVal += JSON.stringify(this.pointList[i].attr) + ',';
        }
        if(settingVal.length > 0 ){
            settingVal = settingVal.substring(0,settingVal.length -1 );
            settingVal = '['+ settingVal + ']';
        }
        this.settingValue = settingVal;
        this.dialogVisible = false;
      }
    },

    upload(){
      const data=this.$route.query["id"]
      exportCertificateDataTemplate(data).then(res=>{
        console.log(res)
        var iframe = document.createElement("iframe")
        iframe.style.display = "none";
        iframe.src =res.data;
        document.body.appendChild(iframe);
      })
    },

    //图片上传
    handleRemove(file, fileList) {
        // console.log(file, fileList);
      this.fileList=[];
      this.bgUrl="";
      this.currentImage="";
      this.settingValue="";
    },
    handlePreview(file) {

        // console.log(file);
    },
    handleSuccess(response, file, fileList) {
      this.bgUrl=fileList[0].response.data.filepath
      this.currentImage=fileList[0].response.data.fileurl;
      this.fileList=[{url:fileList[0].response.data.fileurl,path:fileList[0].response.data.filepath}];
      var img = new Image();
      img.src = this.currentImage;
      var that = this;
      img.onload = function(res) {
        // 初始化获取底图的宽高
        that.imgx = res.target.width;
        that.imgy = res.target.height;
        that.initMap();
      };
    },

    // onSubmit(){
    //     this.$refs['aiPanel-editor'].getMarker().setTag({
    //         fontSize:this.form.fontSize,
    //         tagName: this.form.title
    //         // tag: "0x0001"
    //     });
    //     this.dialogVisible=false
    // },
    zsBaocun(flag){
      //flag true:静默，不弹保存成功与否提示。
      // console.log(this.$refs['aiPanel-editor'].getMarker().getData())
      // let arr=this.$refs['aiPanel-editor'].getMarker().getData()
      if(this.currentImage==""){
        this.$message.warning("必须上传证书模板！");
        return;
      }
      // let settingJsonRecords=[]

      // for(let i=0;i<arr.length;i++){
      //   var str={
      //     "field": arr[i].tagName,
      //     "fontSize": arr[i].fontSize,
      //     "xpercent": arr[i].position.x.split('%')[0],
      //     "ypercent":arr[i].position.y.split('%')[0],
      //     "xpercent1":arr[i].position.x1.split('%')[0],
      //     "ypercent1":arr[i].position.y1.split('%')[0],
      //   }
      //   settingJsonRecords.push(str);
      // }
      const data={
        bgUrl:this.fileList[0].path,
        matchId:this.$route.query["id"],
        title:'模板',
        settingJson:this.settingValue
      }
      zsSave(data).then(res=>{
        if(res.code==200&&!flag){
          this.$message.success("保存成功！");
        }
      })
    },
    // onImageLoad(){
    //   this.status=false;
    //   console.log(this.settingJsonRecords)
    //   for(let i=0;i<this.settingJsonRecords.length;i++){
    //     this.$refs['aiPanel-editor'].getMarker().renderData([{
    //       tag: "id04",
    //       tagName: this.settingJsonRecords[i].field,
    //       position: {
    //         x: `${this.settingJsonRecords[i].xpercent}%`,
    //         y: `${this.settingJsonRecords[i].ypercent}%`,
    //         x1:`${this.settingJsonRecords[i].xpercent1}%`,
    //         y1:`${this.settingJsonRecords[i].ypercent1}%`,
    //       },
    //     }]);
    //   }
    //   this.status=true
    // },

    //生成证书
    certificateGenerate(){
      console.log(this.fileListWenjian,"this.fileListWenjian");
      const data={
        certificateName:this.formZs.title,
        dataFilePath:this.fileListWenjian[0].url,
        generateType:this.formZs.type,
        matchId:this.$route.query["id"]
      }
      console.log(data)
      certificateGenerate(data).then(res=>{
        this.zsSearch()
        console.log(res)
      })
    },
    //证书搜索
    zsSearch(){
      const data={
        matchId:this.$route.query["id"],
        pageNumber:this.currentPage,
        pageSize:this.pageSize,
      }
      search(data).then(res=>{
        console.log(res,'证书搜索')
        this.total=res.data.totalRecord
        this.Zslist=res.data.records
      })
    },
    //分页
    handleSizeChange(val) {
      this.pageSize=val;
      this.zsSearch()
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.zsSearch()
    },
    //证书上传
    handleRemove1(file, fileList) {
        // console.log(file, fileList);
      this.fileListWenjian=[];
    },
    handlePreview1(file) {

      // console.log(file);
    },
    handleSuccess1(response, file, fileList) {
      let arr=[{
        name:fileList[0].name,
        url:fileList[0].response.data.filepath
      }]
      this.fileListWenjian=arr
    },
    // 短信切换
    SmsChange(){
      for(let i=0;i<this.listSms.length;i++){
        if(this.form.Sms==this.listSms[i].tmpCode){
          this.content=this.listSms[i].content
        }
      }
    },
    // 短信模板保存
    dxmbBaocun(flag){
      const data={
        id:this.$route.query["id"],
        smsTmpCode:this.form.Sms,
        smsTmpSetting:"[]",
        state:1
      }
      UpdMatchSet(data).then(res=>{
        if(res.code==200&&!flag){
          this.$message.success("保存成功");
        }
      })
    },

    //获取短信模板
    getTemplateList(){
      const data={
        pageNumber:1,
        pageSize:100,
      }
      getTemplateList(data).then(res => {
        console.log(res,'短信模板列表')
        this.listSms=res.data.smsTmpsList;
        if(this.form.Sms!=''){
          for(var i=0;i<this.listSms.length;i++){
            if(this.listSms[i].tmpCode==this.form.Sms){
              this.content = this.listSms[i].content;
              break;
            }
          }
        // }else{
        //   this.content=res.data.smsTmpsList[0].content;
        //   this.form.Sms=res.data.smsTmpsList[0].tmpCode
        }
      })
    },
    // 返回
    Back(){
      this.$router.push({
        path:'group',
        query:{
          id:this.$route.query["id"],
          upd:this.$route.query["upd"],
        }
      })
    },
    // 提审
    tishen(){
      // if(this.fileList.length==0){
      //     this.$message.error('请先设置证书模板，并保存');
      // }else{
      if(this.currentImage!=""&&this.settingValue!=""){
        this.zsBaocun(true);
      }
      this.dxmbBaocun(true);
      const data={
          id:this.$route.query["id"],
          releaseState:-1,
          smsTmpCode:this.form.Sms,
          smsTmpSetting:"[]"
      }
      UpdMatchSet(data).then(res=>{
          this.$router.push({
              path:'../list',
          })
      })
      // }
    },
  }
}
</script>

<style scoped>
    .el-upload__tip{
        margin-left: 10px;
        cursor: default;
        color: blue;
        text-decoration:underline
    }
    .el-form-item__content{
      height: auto;
    }
    #map {
      height: 500px;
      margin-top: 20px;
    }
    /*隐藏ol的一些自带元素*/
    .ol-attribution,
    .ol-zoom {
      display: none;
    }
</style>
<style>
  .upload-demo .el-upload-list--picture .el-upload-list__item-thumbnail {
    height: 70px; width: auto;
  }
</style>
