<style lang="less">
@import "../../../styles/common.less";
.span-label {
    padding-top: 10px;
    float: right;
}
.ivu-table .table-info-pointer {
    cursor: pointer;
}
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
        top: 0;
    }
}
</style>
<template>
  <div>
    <Row>
      <Card>
        <Row :gutter="24">
          <Col span="6">
          <Input v-model="likeInput" placeholder="关键字查询" size="large">
          <Button slot="append" type="primary" icon="ios-search"></Button>
          </Input>
          </Col>
          <Col span="3">
          <Button type="error" long icon="code-download" size="large">下载模板</Button>
          </Col>
          <Col span="3">
          <Button type="success" long icon="more" size="large">导入EXCEL</Button>
          </Col>
          <Col span="3">
          <Button type="warning" long icon="code-download" size="large">导出EXCEL</Button>
          </Col>
          <Col span="3" offset="6">
          <Button type="info" long icon="plus-round" @click="showCreateFrom" size="large">添加信息</Button>
          </Col>
        </Row>
      </Card>
    </Row>
    <Row class="margin-top-10">
      <Card>
        <Row :gutter="10" class="margin-top-10">
          <Col span="2">
          <span class="span-label">人员筛选:</span>
          </Col>
          <Col span="4">
          <Select v-model="model1" size="large" placeholder="请选择部门">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="4">
          <Select v-model="model1" size="large" placeholder="请选择岗位">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="2">
          <Button type="info" long size="large">筛选</Button>
          </Col>
        </Row>
        <!-- <Row :gutter="10" class="margin-top-10">
          <Col span="2">
          <span class="span-label">姓名:</span>
          </Col>
          <Col span="4">
          <Input placeholder="关键字查询" size="large"></Input>
          </Col>
          <Col span="2">
          <Button type="info" long size="large">搜索</Button>
          </Col>
        </Row> -->
        <!-- <Row :gutter="10" class="margin-top-10">
          <Col span="2">
          <span class="span-label">预警:</span>
          </Col>
          <Col span="2">
          <Button type="warning" long size="large">全部</Button>
          </Col>
          <Col span="2">
          <Button long size="large">一周内</Button>
          </Col>
          <Col span="2">
          <Button long size="large">30天内</Button>
          </Col>
          <Col span="2">
          <Button long size="large">90天内</Button>
          </Col>
          <Col span="2">
          <Button long size="large">已过期</Button>
          </Col>
        </Row> -->
      </Card>
    </Row>
    <Row class="margin-top-10">
      <Card>
        <Row>
          <Col span="24">
          <Table :row-class-name="rowClassName" @on-row-click="rowClick" height="400" :columns="columns1" :data="data2"></Table>
          </Col>
        </Row>
      </Card>
    </Row>
    <Modal v-model="showDetail" :title="modalTitle" :styles="{top: '20px'}" width="888" @on-ok="ok" @on-cancel="cancel">
      <staff-info :staff_id="showIdDetail">

      </staff-info>
    </Modal>
    <Modal v-model="showCreateForm" :title="modalTitle" :styles="{top: '20px'}" width="888" @on-ok="ok" @on-cancel="cancel">
      <create-form>

      </create-form>
    </Modal>
  </div>
</template>

<script>
import util from "../../../libs/util.js";
import staffInfo from "./info.vue";
import createForm from "./createForm.vue";
export default {
    name: "staff",
    components: {
        staffInfo,
        createForm
    },
    data() {
        return {
            likeInput: "",
            model1: "",
            showDetail: false,
            showCreateForm: false,
            showIdDetail: "",
            cityList: [],
            modalTitle: "",
            columns1: [
                {
                    title: "姓名",
                    key: "name"
                },
                {
                    title: "性别",
                    key: "age"
                },
                {
                    title: "部门",
                    key: "part"
                },
                {
                    title: "联系电话",
                    key: "phoneNum"
                },
                {
                    title: "最高学历",
                    key: "xueli"
                },
                {
                    title: "职称",
                    key: "zhicheng"
                },
                {
                    title: "身份证号",
                    key: "idcard"
                }
            ],
            data2: []
        };
    },
    methods: {
        showCreateFrom() {
            this.modalTitle = "新增员工信息";
            this.showCreateForm = true;
        },
        rowClassName(row, index) {
            return "table-info-pointer";
        },
        rowClick(row, index) {
            this.showDetail = true;
            this.showIdDetail = index + "";
            this.modalTitle = "张三 女 项目部";
            console.log(index);
        },
        ok() {
            this.$Message.info("Clicked ok");
        },
        cancel() {
            this.$Message.info("Clicked cancel");
        }
    },
    mounted() {
        for (var i = 0; i < 10; i++) {
            var params = {};
            for (var index in this.columns1) {
                params[this.columns1[index].key] = "xxxx" + i;
            }
            this.data2.push(params);
        }
    }
};
</script>
