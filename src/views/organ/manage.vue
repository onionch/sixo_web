<style lang="less">
@import "../../styles/common.less";
.box_head {
    background-color: #fff;
    height: 80px;
    overflow: hidden;
    position: relative;
    z-index: 3;
}
.ivu-tree-title {
    font-size: 15px;
}
.example-split {
    display: block;
    border: 1px dashed #eee;
    height: 400px;
    width: 2px;
}
</style>
<template>
    <div>
        <Row>
            <Card>
                <Row :gutter="24">
                    <Col span="4">
                    <Button type="error" long icon="code-download" size="large">人员导入</Button>
                    </Col>
                    <Col span="4">
                    <Button type="success" long icon="more" size="large">新增部门</Button>
                    </Col>
                    <Col span="4">
                    <Button type="info" long icon="plus-round" size="large">编辑部门信息</Button>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <Row>
                    <Col span="5">
                    <div style="height:400px;overflow: auto;">
                        <Tree :data="organ" @on-select-change="treeSelect"></Tree>
                    </div>
                    </Col>
                    <Col span="1">
                        <div class="example-split">
                        </div>
                    </Col>
                    <Col span="18">
                        <div class="box_head">
                            <div style="height:80px;">
                                <Menu mode="horizontal" :theme="theme1" active-name="activeName" @on-select="menuChange">
                                    <MenuItem name="1">
                                    <Icon type="ios-paper"></Icon>
                                    部门信息
                                    </MenuItem>
                                    <MenuItem name="3">
                                    <Icon type="ios-people"></Icon>
                                    人力资源
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div>
                            <Table v-show="activeName=='1'" stripe :show-header=false :columns="detailCol" :data="detailData"></Table>
                            <div v-show="activeName=='3'" >
                                <Table stripe :columns="detailCol1" :data="detailData1"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                    <Row>
                                        <Col span="10">
                                        <span>当前第{{currentPage}}页(总共{{totalPage}}页)，每页显示20条记录</span>
                                        </Col>
                                        <Col span="6" offset="8">
                                            <ButtonGroup shape="circle">
                                                <Button type="ghost" @click="lastPage">
                                                    <Icon type="chevron-left"></Icon>
                                                    上一页
                                                </Button>
                                                <Button type="ghost" @click="nextPage">
                                                    下一页
                                                    <Icon type="chevron-right"></Icon>
                                                </Button>
                                            </ButtonGroup>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import util from "../../libs/util.js";
export default {
    name: "role",
    components: {},
    data() {
        return {
            likeInput: "",
            theme1: "light",
            detailCol: [
                {
                    title: "名",
                    key: "name",
                    width: 100
                },
                {
                    title: "值",
                    key: "value"
                }
            ],
            activeName: "1",
            detailCol1: [
                {
                    type: "index",
                    width: 60,
                    align: "center"
                },
                {
                    title: "人员编号",
                    key: "serial"
                },
                {
                    title: "人员姓名",
                    key: "name"
                },
                {
                    title: "身份证号",
                    key: "idCard"
                },
                {
                    title: "岗位",
                    key: "position"
                }
            ],
            detailData: [
                {
                    name: "简称",
                    value: "第一大区"
                },
                {
                    name: "部门编号",
                    value: "00928182"
                },
                {
                    name: "上级部门",
                    value: "大马科技有限公司"
                }
            ],
            detailData1: [
                {
                    serial: "100001",
                    name: "张三",
                    idCard: "511304199109283718",
                    position: "JAVA开发工程师"
                },
                {
                    serial: "100002",
                    name: "李四",
                    idCard: "511304199109283718",
                    position: "前端开发工程师"
                },
                {
                    serial: "100002",
                    name: "第一大区",
                    idCard: "511304199109283718",
                    position: "C#开发工程师"
                }
            ],
            organ: [
                {
                    title: "大马科技有限公司",
                    expand: true,
                    children: [
                        {
                            title: "第一大区",
                            expand: true,
                            selected:true,
                            children: [
                                {
                                    title: "广汽项目组"
                                },
                                {
                                    title: "一汽项目组"
                                }
                            ]
                        },
                        {
                            title: "第二大区",
                            expand: true,
                            children: [
                                {
                                    title: "奥迪项目组"
                                },
                                {
                                    title: "奔驰项目组"
                                }
                            ]
                        }
                    ]
                }
            ],
            currentPage: 1,
            totalPage: 1
        };
    },
    methods: {
        lastPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            } else {
                this.$Message.info("当前已经是第一页。");
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
            } else {
                this.$Message.info("没有更多的数据了。");
            }
        },
        treeSelect(e) {
            console.log(e[0].title);
        },
        menuChange(e) {
            this.activeName = e;
        }
    },
    mounted() {}
};
</script>
