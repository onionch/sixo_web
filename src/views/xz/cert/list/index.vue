<style lang="less">
@import "../../../../styles/common.less";
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
                    <Input v-model="likeInput" placeholder="持证人" size="large">
                    <Button slot="append" type="primary" icon="ios-search"></Button>
                    </Input>
                    </Col>
                    <Col span="4" offset="14">
                    <Button type="info" long icon="plus-round" @click="showCreateFrom" size="large">添加证书</Button>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <Row :gutter="10" class="margin-top-10">
                    <Col span="2">
                    <span class="span-label">筛选:</span>
                    </Col>
                    <Col span="4">
                    <Select v-model="model1" size="large" placeholder="请选择证书类型" clearable>
                        <Option v-for="item in categoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    </Col>
                    <Col span="2">
                    <Button type="info" long size="large">筛选</Button>
                    </Col>
                </Row>
                <Row :gutter="10" class="margin-top-10">
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
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <Row>
                    <Col span="24">
                    <Table :columns="qualCol" :data="qualData"></Table>
                    <div style="margin: 10px;overflow: hidden">
                        <Row>
                            <Col span="10">
                            <span>当前第{{currentPage}}页(总共{{totalPage}}页)，每页显示20条记录</span>
                            </Col>
                            <Col span="4" offset="10">
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
                    </Col>
                </Row>
            </Card>
        </Row>
        <Modal v-model="showDetail" :title="modalTitle" :styles="{top: '20px'}" width="888" @on-ok="ok" @on-cancel="cancel">
            <staff-info :staff_id="showIdDetail">

            </staff-info>
        </Modal>
        <Modal v-model="showCreateForm" :title="modalTitle" :styles="{top: '20px'}" width="700" @on-ok="ok" @on-cancel="cancel">
            <create-form :formItem="formItem">

            </create-form>
        </Modal>
    </div>
</template>

<script>
import util from "../../../../libs/util.js";
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
            viewColor: "",
            formItem: {},
            likeInput: "",
            model1: "",
            showDetail: false,
            showCreateForm: false,
            showIdDetail: "",
            cityList: [],
            modalTitle: "",
            qualCol: [
                {
                    type: "index",
                    width: 60,
                    align: "center"
                },
                {
                    title: "证书编号",
                    key: "serial"
                },
                {
                    title: "持证人",
                    key: "ownerName"
                },
                {
                    title: "证书类型",
                    key: "category"
                },
                {
                    title: "获证日期",
                    key: "obtainDate"
                },
                {
                    title: "过期日期",
                    key: "expireDate"
                },
                {
                    title: "备注",
                    key: "remark"
                },
                {
                    title: "预览",
                    key: "views",
                    align: "center",
                    render: (h, params) => {
                        return h("span", [
                            h(
                                "Icon",
                                {
                                    props: {
                                        type: "eye",
                                        size: "30"
                                    },
                                    style: {
                                        marginRight: "5px",
                                        cursor: "pointer",
                                        color: "",
                                        alt:"预览"
                                    },
                                    // on: {
                                    //     click: () => {
                                    //         this.rowClick(params.row);
                                    //     }
                                    // },
                                    nativeOn: {
                                        click: () => {
                                            this.detail(params.row);
                                        },
                                        mouseover: (e) => {
                                            e.target.style.color="green"
                                        },
                                        mouseout: (e) => {
                                            e.target.style.color=""
                                        }
                                    }
                                },
                                "预览"
                            )
                        ]);
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
                                            this.showUpdateFrom(params.row);
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
                                            this.delete(params.index);
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
            categoryList: [
                { label: "井控证", value: 0 },
                { label: "硫化氢证", value: 1 }
            ],
            qualData: [],
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
        showCreateFrom() {
            this.modalTitle = "添加证书";
            this.showCreateForm = true;
        },
        showUpdateFrom(row) {
            this.modalTitle = "修改证书信息";
            this.formItem = row;
            this.showCreateForm = true;
        },
        delete(id){
            this.qualData.splice(id,1);
            this.$Message.info("删除成功");
        },
        detail(row) {
            this.showDetail = true;
            // this.showIdDetail = index + "";
            this.modalTitle = "证书详细信息";
        },
        ok() {
            this.qualData.push(this.formItem);
            this.formItem = {};
        },
        cancel() {
            this.$Message.info("Clicked cancel");
        }
    },
    mounted() {
        this.qualData.push({
            serial: "02818271",
            ownerName: "王帅",
            category: "钻井证",
            obtainDate: "20180328",
            expireDate: "20190328",
            remark: ""
        });
        this.qualData.push({
            serial: "02818272",
            ownerName: "王帅",
            category: "硫化氢证",
            obtainDate: "20180328",
            expireDate: "20190328",
            remark: ""
        });
    }
};
</script>
