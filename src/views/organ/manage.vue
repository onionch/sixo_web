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
                                <MenuItem name="2">
                                <Icon type="ribbon-a"></Icon>
                                岗位配置
                                </MenuItem>
                                <MenuItem name="3">
                                <Icon type="ios-people"></Icon>
                                人力资源
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <div>
                        <div v-show="activeName=='1'">
                            <Row>
                                <Col span="4">
                                <Button type="info" icon="plus-round" @click="showCreateFrom" size="large">编辑部门信息</Button>
                                </Col>
                                <Col span="4" offset="1">
                                <Button type="error" icon="plus-round" @click="showCreateFrom" size="large">删除部门</Button>
                                </Col>
                            </Row>
                            <Row class="margin-top-10">
                                <Table stripe :show-header="false" :columns="detailCol" :data="detailData"></Table>
                            </Row>
                        </div>
                        <div v-show="activeName=='2'">
                            <Row>
                                <Col span="6">
                                <Input v-model="likeInput" placeholder="岗位查询" size="large">
                                <Button slot="append" type="primary" @click="search" icon="ios-search"></Button>
                                </Input>
                                </Col>
                                <Col span="4" offset="14">
                                <Button type="info" icon="plus-round" @click="showCreateFrom" size="large">添加岗位</Button>
                                </Col>
                            </Row>
                            <Row class="margin-top-10">
                                <Table stripe :columns="detailCol2" :data="detailData2"></Table>
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
                            </Row>
                        </div>
                        <div v-show="activeName=='3'">
                            <Row>
                                <Col span="6">
                                <Input v-model="likeInput" placeholder="员工查询" size="large">
                                <Button slot="append" @click="search" type="primary" icon="ios-search"></Button>
                                </Input>
                                </Col>
                                <Col span="4" offset="14">
                                <Button type="info" icon="plus-round" @click="showCreateFrom" size="large">员工导入</Button>
                                </Col>
                            </Row>
                            <Row class="margin-top-10">
                                <Table stripe :columns="detailCol1" :data="detailData1"></Table>
                            </Row>
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
                    value: "川西钻探有限公司"
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
                },
                {
                    title: " ",
                    key: "action",
                    width: 150,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Poptip",
                                {
                                    props: {
                                        confirm: true,
                                        title: "您确定要移除这名员工吗?",
                                        transfer: true
                                    },
                                    on: {
                                        "on-ok": () => {
                                            this.$Message.info("功能待开发。");
                                            // this.release(params.index);
                                        }
                                    }
                                },
                                [
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "error",
                                                size: "small"
                                            },
                                            style: {
                                                marginRight: "5px"
                                            }
                                        },
                                        "移除"
                                    )
                                ]
                            )
                        ]);
                    }
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
            detailCol2: [
                {
                    type: "index",
                    width: 60,
                    align: "center"
                },
                {
                    title: "岗位编号",
                    key: "serial"
                },
                {
                    title: "岗位名称",
                    key: "name"
                },
                {
                    title: "编制数量",
                    key: "number"
                },
                {
                    title: "持证要求",
                    key: "requirement",
                    render: (h, params) => {
                        var that = this;
                        if (
                            params.row.requirement != null &&
                            params.row.requirement.length > 0
                        ) {
                            console.log(params);
                            // var ids = params.row.requirement.split(",");
                            var ids = params.row.requirement;
                            return h(
                                "Poptip",
                                {
                                    props: {
                                        trigger: "hover",
                                        title: "证书要求",
                                        placement: "bottom"
                                    }
                                },
                                [
                                    h("Tag", ids[0] + "."),
                                    h(
                                        "div",
                                        {
                                            slot: "content"
                                        },
                                        [
                                            h(
                                                "ul",
                                                (function() {
                                                    var liList = [];
                                                    for (var id in ids) {
                                                        liList.push(
                                                            h(
                                                                "li",
                                                                {
                                                                    style: {
                                                                        textAlign:
                                                                            "left",
                                                                        padding:
                                                                            "4px"
                                                                    }
                                                                },
                                                                ids[id]
                                                            )
                                                        );
                                                    }
                                                    return liList;
                                                })()
                                            )
                                        ]
                                    )
                                ]
                            );
                        }
                    }
                },
                {
                    title: " ",
                    key: "action",
                    width: 150,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$Message.info("功能待开发。");
                                            // this.showUpdateFrom(params.row);
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            h(
                                "Poptip",
                                {
                                    props: {
                                        confirm: true,
                                        title: "您确定要删除这条数据吗?",
                                        transfer: true
                                    },
                                    on: {
                                        "on-ok": () => {
                                            this.$Message.info("功能待开发。");
                                            // this.delete(params.index);
                                        }
                                    }
                                },
                                [
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "error",
                                                size: "small"
                                            },
                                            style: {
                                                marginRight: "5px"
                                            }
                                        },
                                        "删除"
                                    )
                                ]
                            )
                        ]);
                    }
                }
            ],
            detailData2: [],
            organ: [
                {
                    title: "川西钻探有限公司",
                    expand: true,
                    children: [
                        {
                            title: "第一大区",
                            expand: true,
                            children: [
                                {
                                    selected: true,
                                    title: "XX项目组"
                                },
                                {
                                    title: "XXX项目组"
                                }
                            ]
                        },
                        {
                            title: "第二大区",
                            expand: true,
                            children: [
                                {
                                    title: "XXS项目组"
                                },
                                {
                                    title: "XXE项目组"
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
        showCreateFrom(){
            this.$Message.info("功能待开发。");
        },
        search(){
            this.$Message.info("功能待开发。");
        },
        menuChange(e) {
            this.activeName = e;
            if (e == "2") {
                this.detailData2=[];
                this.detailData2.push({
                    serial: "00001",
                    name: "钻井工",
                    number: 15,
                    requirement: ["井控证", "硫化氢证"]
                });
                this.detailData2.push({
                    serial: "00002",
                    name: "搬运工",
                    number: 10,
                    requirement: []
                });
                this.detailData2.push({
                    serial: "00003",
                    name: "石油工",
                    number: 5,
                    requirement: []
                });
            }
        }
    },
    mounted() {}
};
</script>
