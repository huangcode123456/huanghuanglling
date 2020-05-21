<template>
  <div class="jm-main-inner p10">
    <el-container>
      <!-- 左侧 -->
      <el-aside width="25%" class="jm-aside">
        <div class="jm-ruleBase-menu">
          <el-input placeholder="输入关键字搜索" v-model="filterText"></el-input>
          <el-tree
            class="mt10"
            v-if="menuList.length>0"
            :data="menuList"
            :props="defaultProps"
            :highlight-current="true"
            :current-node-key="currentNodekey"
            :default-expanded-keys="expandedkeys"
            node-key="code"
            ref="tree"
            :filter-node-method="filterNode"
            @node-click="getNode"
          ></el-tree>
        </div>
      </el-aside>

      <!-- 右侧 -->
      <el-container class="jm-main-outer">
        <div class="p10" style="overflow-y:auto" v-if="base.name">
          <el-alert title="上次更新时间为：2020-04-19 12:30:10" type="warning" :closable="false"></el-alert>
          <el-form class="mt20" label-width="80px">
            <el-form-item label="名称">
              <p>
                {{base.name}}
                <span class="ml10 btn-edit-base" @click="showEditBase()">
                  <i class="el-icon-edit"></i>
                </span>
              </p>
            </el-form-item>
            <el-form-item label="描述">
              <p>{{base.desc}}</p>
            </el-form-item>
            <el-form-item label="规则组">
              <div>
                <el-button size="mini" type>条件库配置</el-button>
                <el-button size="mini" type>动作库配置</el-button>
                <el-button size="mini" type="primary" @click="showModifyRule(-1)">新增规则</el-button>
              </div>

              <table v-if="ruleGroups.length>0" class="jm-tb-list mt10">
                <thead>
                  <tr>
                    <th>优先级</th>
                    <th>规则名称</th>
                    <th>触发条件</th>
                    <th>触发动作</th>
                    <th width="120">操作</th>
                  </tr>
                </thead>
                <draggable
                  v-model="ruleGroups"
                  element="tbody"
                  :ghostClass="ghostClass"
                  @update="ruleGroupsdragEnd"
                  :options="{animation: 500}"
                >
                  <tr v-for="(item,index) in ruleGroups" :key="index">
                    <td>{{item.priority}}</td>
                    <td>{{item.base.name}}</td>
                    <td>{{item.conditionalRule.name}}</td>
                    <td class="btn-action-list">
                      <span
                        class="btn-action-item"
                        v-for="(actional,code) in item.actionalRules"
                        :key="code"
                      >
                        <span class="btn">{{actional.name}}</span>
                        <i class="icon-arrow el-icon-right"></i>
                      </span>
                    </td>
                    <td>
                      <el-button size="mini" @click="showModifyRule(index)" icon="el-icon-edit"></el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="removeRuleGroup(index)"
                        icon="el-icon-delete"
                      ></el-button>
                    </td>
                  </tr>
                </draggable>
              </table>
              <p v-if="ruleGroups.length>0" style="color:#999">提示：拖动列表可对规则进行排序</p>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="onSubmit">校 验</el-button>
              <el-button type="primary">保 存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-container>
    </el-container>

    <!-- 基本信息修改 -->
    <el-dialog
      title="基本信息修改"
      :visible.sync="editBaseShow"
      :append-to-body="true"
      width="500px"
      center
    >
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="ruleSetBaseForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="ruleSetBaseForm.desc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="adjustRuleSetInfo()">确 定</el-button>
        <el-button @click="editBaseShow = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 修改、新增规则弹窗 -->
    <el-dialog
      :title="modifyRuleTitle"
      :visible.sync="modifyRuleShow"
      :append-to-body="true"
      width="500px"
      center
    >
      <el-form label-width="80px" v-if="modifyRuleForm!={}">
        <el-form-item label="规则名">
          <div style="padding-right:50px" v-if="modifyRuleForm.base">
            <el-input v-model="modifyRuleForm.base.name"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="描述">
          <div style="padding-right:50px" v-if="modifyRuleForm.base">
            <el-input v-model="modifyRuleForm.base.desc"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="触发条件">
          <el-select
            v-if="conditioanlOptions"
            v-model="conditionalRuleCode"
            @change="conditionalRuleCodeSel"
            placeholder="请选择触发条件"
          >
            <el-option-group
              v-for="group in conditioanlOptions"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.base.code"
                :label="item.base.name"
                :value="item.base.code"
              ></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="执行动作">
          <draggable
            v-model="currActionList"
            v-if="currActionList"
            :move="getActionData"
            :ghostClass="ghostAcitonClass"
            @update="actionDatadragEnd"
            :options="{animation: 500}"
          >
            <span class="btn-action-item" v-for="item  in currActionList" :key="item.code">
              <span class="btn">{{item.name}}</span>
              <i class="icon-arrow el-icon-right"></i>
            </span>
          </draggable>
          <p class="link-add-action" @click="actionDlgShow = true">
            <i class="el-icon-setting"></i>设置
            <span v-if="currActionList.length>1">(拖动可进行动作排序)</span>
          </p>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifyRuleGroup()">确 定</el-button>
        <el-button @click="modifyRuleShow = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 选择动作弹窗 -->
    <el-drawer
      title="执行动作"
      :visible.sync="actionDlgShow"
      direction="rtl"
      custom-class="jm-action-drawer"
      :append-to-body="true"
    >
      <div class="action-drawer__content">
        <div class="action-list">
          <el-checkbox-group v-if="actionalRules" v-model="actionalRuleCodes">
            <el-checkbox
              @change="checked=>checkRow(checked, item)"
              v-for="item in actionalRules"
              :label="item.base.code"
              :key="item.base.code"
            >{{item.base.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-button type="primary" class="mt20" @click="actionDlgShow = false">确 定</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "configRuleBase",
  components: {
    draggable
  },
  data() {
    return {
      // 树形结构
      filterText: "",
      menuList: [],
      defaultProps: {
        children: "records",
        label: "name"
      },
      currentNodekey: "", //默认选中的节点树
      expandedkeys: [], //默认展开的节点树

      // 规则集信息
      ruleSetCode: "",
      sessionCode: "",
      base: {}, //基本信息
      conditioanlRules: {}, //条件库库配置
      actionalRules: {}, //动作库配置
      ruleGroups: [], //规则组

      //规则组优先级排序
      ghostClass: "ghost",
      ruleGroupsPriorityRecords: [],

      // 规则集基本信息修改
      editBaseShow: false,
      ruleSetBaseForm: {},

      // 修改、新增规则弹窗
      modifyRuleShow: false,
      modifyRuleTitle: "新增规则",
      modifyRuleForm: {},
      //条件选择
      conditioanlOptions: [],
      conditionalRuleCode: "",

      // 选择执行动作相关
      actionDlgShow: false,
      actionalRuleCodes: [], //已选动作库code
      currActionList: [], //已选动作库列表
      ghostAcitonClass: "ghostAciton"
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getRuleSet(); // 查询规则集
  },
  methods: {
    // 删除规则组
    removeRuleGroup(index) {
      let that = this;
      let ruleGroupCode = that.ruleGroups[index].base.code;
      console.log(ruleGroupCode);
      that
        .$confirm("是否删除该规则?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          const res = await that.http.get(
            this.api.admin.removeRuleGroup +
              that.ruleSetCode +
              "/" +
              that.sessionCode +
              "/" +
              ruleGroupCode
          );
          console.log(res);
          if (res.data.code == 200) {
            that.$message.success("删除成功！");
            that.ruleGroups.splice(
              that.ruleGroups.findIndex(
                item => item.base.code === ruleGroupCode
              ),
              1
            ); //删除
          } else {
            that.$message.error(res.data.message);
          }
        })
        .catch(() => {});
    },

    // 调整规则组到缓存(新增/修改)
    async modifyRuleGroup() {
      const that = this;
      if (!that.modifyRuleForm.base.name) {
        that.$message.error("请输入规则名！");
        return false;
      }
      if (!that.conditionalRuleCode) {
        that.$message.error("请选择触发条件！");
        return false;
      }
      if (that.actionalRuleCodes.length == 0) {
        that.$message.error("请选择执行动作！");
        return false;
      }
      let params = {
        actionalRuleCodes: that.actionalRuleCodes,
        code: that.modifyRuleForm.base.code,
        conditionalRuleCode: that.conditionalRuleCode,
        desc: that.modifyRuleForm.base.desc,
        name: that.modifyRuleForm.base.name,
        priority: that.modifyRuleForm.priority,
        ruleManageSessionCode: that.sessionCode,
        ruleSetCode: that.ruleSetCode
      };
      console.log(params);
      const res = await that.http.post(that.api.admin.modifyRuleGroup, params);
      console.log(params.code, res.data.data);
      if (res.data.code == 200) {
        if (params.code == res.data.data) {
          that.$message.success("修改成功！");
        } else {
          that.$message.success("新增成功！");
        }
        that.modifyRuleShow = false;
        that.queryRuleSetGroupInfo();
      } else {
        that.$message.error(res.data.message);
      }
    },
    showModifyRule(index) {
      console.log(index);
      // 首先清空需重新加载的字段
      this.conditioanlOptions = [];
      this.conditionalRuleCode = "";
      this.actionalRuleCodes = [];
      this.currActionList = [];

      if (index < 0) {
        this.modifyRuleTitle = "新增规则";
        this.modifyRuleForm = {
          base: {
            code: "",
            name: "",
            desc: ""
          },
          priority: "",
          conditionalRule: {
            code: ""
          }
        };
        // 新增规则优先级设置
        if (this.ruleGroups.length > 0) {
          this.modifyRuleForm.priority =
            this.ruleGroups[this.ruleGroups.length - 1].priority + 1;
        } else {
          this.modifyRuleForm.priority = 1;
        }
        console.log(this.modifyRuleForm.priority);
      } else {
        this.modifyRuleTitle = "编辑规则";
        this.modifyRuleForm = this.ruleGroups[index];
        this.conditionalRuleCode = this.modifyRuleForm.conditionalRule.code;
        // 可选动作库组装
        this.modifyRuleForm.actionalRules.map(item => {
          this.actionalRuleCodes.push(item.code);
          return item;
        });
        this.currActionList = this.modifyRuleForm.actionalRules;
        console.log(this.modifyRuleForm);
      }
      // 已选动作库

      // 可选规则条件列表组装
      if (this.conditioanlRules.elements.length > 0) {
        let elements = {
          label: "元条件",
          options: this.conditioanlRules.elements
        };
        // console.log(elements)
        this.conditioanlOptions.push(elements);
      }
      if (this.conditioanlRules.unions.length > 0) {
        let unions = {
          label: "组合条件",
          options: this.conditioanlRules.unions
        };
        // console.log(unions)
        this.conditioanlOptions.push(unions);
      }
      if (this.conditioanlRules.nots.length > 0) {
        let nots = {
          label: "非条件",
          options: this.conditioanlRules.nots
        };
        // console.log(nots)
        this.conditioanlOptions.push(nots);
      }
      console.log(this.conditioanlOptions);
      this.modifyRuleShow = true;
    },
    // 选择条件库
    conditionalRuleCodeSel() {
      console.log(this.conditionalRuleCode);
    },
    // 选择执行动作库
    checkRow(checked, item) {
      console.log(checked);
      console.log(item);
      let arr = [];
      this.actionalRuleCodes.map(id => {
        for (var item of this.actionalRules) {
          if (id == item.base.code) {
            arr.push({
              code: item.base.code,
              name: item.base.name,
              desc: item.base.desc
            });
          }
        }
      });
      this.currActionList = arr;
      console.log(this.currActionList);
    },

    // 执行动作排序
    getActionData(evt) {
      // console.log(evt.draggedContext)
      // console.log(evt.relatedContext)
    },
    actionDatadragEnd(evt) {
      // console.log("拖动前的索引 :" + evt.oldIndex);
      // console.log("拖动后的索引 :" + evt.newIndex);
      // 序号重置
      this.actionalRuleCodes = [];
      this.currActionList = this.currActionList.map((item, index) => {
        this.actionalRuleCodes.push(item.code);
        return item;
      });
      console.log(this.actionalRuleCodes);
    },

    // 修改基本信息
    showEditBase() {
      // this.ruleSetBaseForm=JSON.parse(JSON.stringify(this.ruleSessionInfo.base))
      this.ruleSetBaseForm = Object.assign({}, this.base);
      this.editBaseShow = true;
    },
    async adjustRuleSetInfo() {
      const that = this;
      if (that.ruleSetBaseForm.name == "") {
        that.$message.error("规则集名称不能为空");
        return;
      }
      if (that.ruleSetBaseForm.name == "") {
        that.$message.error("规则集描述不能为空");
        return;
      }
      let params = {
        desc: that.ruleSetBaseForm.desc,
        exceptionBreak: that.ruleSetBaseForm.exceptionBreak,
        matchBreak: that.ruleSetBaseForm.matchBreak,
        name: that.ruleSetBaseForm.name,
        ruleManageSessionCode: that.sessionCode,
        ruleSetCode: that.ruleSetCode
      };
      console.log(params);
      const res = await that.http.post(
        that.api.admin.adjustRuleSetInfo,
        params
      );
      console.log(res);
      if (res.data.code == 200) {
        that.$message.success("基本信息更新成功！");
        that.editBaseShow = false;
        that.base = that.ruleSetBaseForm; //不刷新接口更新页面数据
      } else {
        that.$message.error(res.data.message);
      }
    },

    // 调整规则组优先级
    async adjustRuleGroupPriority() {
      const that = this;
      let params = {
        records: that.ruleGroupsPriorityRecords,
        ruleManageSessionCode: that.sessionCode,
        ruleSetCode: that.ruleSetCode
      };
      console.log(params);
      const res = await that.http.post(
        that.api.admin.adjustRuleGroupPriority,
        params
      );
      console.log(res);
      if (res.data.code == 200) {
        this.queryRuleSetGroupInfo();
      } else {
        this.$message.error(res.data.message);
      }
    },
    ruleGroupsdragEnd(evt) {
      // 优先级重置
      this.ruleGroupsPriorityRecords = [];
      this.ruleGroups = this.ruleGroups.map((item, index) => {
        item.priority = index + 1;
        this.ruleGroupsPriorityRecords.push({
          priority: item.priority,
          groupCode: item.base.code
        });
        return item;
      });
      this.adjustRuleGroupPriority(); //更新优先级接口
    },
    // 查询组信息
    async queryRuleSetGroupInfo() {
      const res = await this.http.get(
        this.api.admin.queryRuleSetGroupInfo +
          this.ruleSetCode +
          "/" +
          this.sessionCode
      );
      console.log(res);
      if (res.data.code == 200) {
        this.ruleGroups = res.data.data;
      } else {
        this.$message.error(res.data.message);
      }
    },

    // 查询规则集信息
    async querySessionInfo() {
      // 首先查询或者新增会话编码
      const res = await this.http.get(
        this.api.admin.queryOrCreateSessionCode + this.ruleSetCode
      );
      console.log(res);
      if (res.data.code == 200) {
        this.sessionCode = res.data.data;
      } else {
        this.$message.error(res.data.message);
      }
      // 再根据规则集id和回话编码查询规则集会话信息
      const resInfo = await this.http.get(
        this.api.admin.querySessionInfo +
          this.ruleSetCode +
          "/" +
          this.sessionCode
      );
      if (resInfo.data.code == 200) {
        // console.log(resInfo);
        this.base = resInfo.data.data.base;
        this.conditioanlRules = resInfo.data.data.conditioanlRules;
        this.actionalRules = resInfo.data.data.actionalRules;
        this.ruleGroups = resInfo.data.data.ruleGroups;
        console.log("ruleGroups", this.ruleGroups);
      } else {
        this.$message.error(res.data.message);
      }
    },

    // 获取选中规则集信息
    getNode(node) {
      if (node.code) {
        // 重置默认数据
        this.base = {};
        this.conditioanlRules = {};
        this.actionalRules = {};
        this.ruleGroups = [];
        console.log(node.code);
        this.ruleSetCode = node.code;
        this.querySessionInfo();
      }
    },

    // 查询规则集列表
    async getRuleSet() {
      const that = this;
      const res = await that.http.get(that.api.admin.queryRuleSet);
      // console.log(res)
      if (res.data.code == 200) {
        let list = res.data.data.modules;
        console.log(list);
        if (list.length > 0) {
          that.currentNodekey = list[0].records[0].code;
          that.expandedkeys.push(list[0].records[0].code);
          that.menuList = list;
          setTimeout(function() {
            that.$refs.tree.setCurrentKey(that.currentNodekey); //一定要加这个选中了否则样式没有出来
          }, 100);
          console.log(that.currentNodekey);

          // 默认查询第一个规则集信息
          that.ruleSetCode = list[0].records[0].code;
          that.querySessionInfo();
        }
      } else {
        that.$message.error(res.data.message);
      }
    },

    // 删除规则
    handleDelete(item) {
      console.log(item);
    },
    filterNode(value, data) {
      console.log(data);
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="less" scoped>
.jm-aside {
  background: #fff;
}
.jm-main-outer {
  background: #fafafa;
}
.jm-ruleBase-menu {
  padding: 10px;
}
.jm-tb-list {
  width: 100%;
  background: #fff;
  // border: 1px solid #DCDFE6;
  th {
    padding: 12px 10px;
    color: #909399;
  }
  td {
    padding: 0 10px;
    color: #606266;
    border-top: 1px solid #ebeef5;
    line-height: 23px;
  }
  tr {
    transition: background-color 0.25s ease;
    &:hover {
      background: #f6f7fa;
    }
  }

  td,
  th {
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
  }
  td.btn-action-list {
    padding: 8px 10px;
    .btn-action-item {
      padding: 4px 0;
    }
  }
}
.ghost {
  background-color: #fdf6ec;
  td {
    color: #e6a23c;
  }
}
.link-add-action {
  color: #409eff;
  cursor: pointer;
  font-size: 12px;
  i {
    font-size: 14px;
    vertical-align: -1px;
  }
}
.jm-action-drawer {
  .action-drawer__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
    .action-list {
      flex: 1;
      overflow-y: auto;
    }
  }
}
/deep/ .el-drawer__header {
  margin-bottom: 0;
}
/deep/ .el-drawer__body {
  height: calc(100% - 40px);
}

.btn-edit-base {
  cursor: pointer;
  color: #666;
}
.btn-action-item {
  display: inline-block;
  position: relative;
  .btn {
    padding: 7px 15px;
    border-radius: 20px;
    font-size: 12px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    // cursor: pointer;
  }
  .icon-arrow {
    margin: 0 5px;
    color: #aaa;
  }
  &:last-child .icon-arrow {
    display: none;
  }
}

.ghostAciton.btn-action-item {
  .btn {
    background-color: #fdf6ec;
    border-color: #e6a23c;
    color: #e6a23c;
  }
}
</style>