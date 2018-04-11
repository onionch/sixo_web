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
                    <Col span="3" offset="15">
                    <Button type="info" long icon="plus-round" @click="showCreateFrom" size="large">添加员工</Button>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <Row>
                    <Col span="24">
                    <Table height="400" :columns="userCols" :data="userData"></Table>
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
        <Modal v-model="showCreateForm" :title="modalTitle" :styles="{top: '20px'}" width="350" @on-ok="ok" @on-cancel="cancel">
            <Form :model="formItem">
                <Row>
                    <Col>
                    <FormItem label="姓名:" :label-width="70">
                        <Input v-model="formItem.name" placeholder="姓名" clearable></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormItem label="身份证号:" :label-width="70">
                        <Input v-model="formItem.idcard" placeholder="身份证号" clearable></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>
</template>

<script>
import util from "../../../libs/util.js";
import staffInfo from "./info.vue";
export default {
    name: "staff",
    components: {
        staffInfo
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
            userCols: [
                {
                    type: "index",
                    width: 60,
                    align: "center"
                },
                {
                    title: "员工编号",
                    key: "serial"
                },
                {
                    title: "姓名",
                    key: "name"
                },
                {
                    title: "身份证号",
                    key: "idcard"
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
            userData: [],
            formItem: {},
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
            this.modalTitle = "添加员工信息";
            this.showCreateForm = true;
        },
        showUpdateFrom(row) {
            this.modalTitle = "修改员工信息";
            this.formItem = row;
            this.showCreateForm = true;
        },
        delete(id) {
            this.userData.splice(id,1);
            this.$Message.info("删除成功");
        },
        ok() {
            this.formItem["serial"] = "1222111122";
            this.userData.push(this.formItem);
            this.formItem = {};
            this.$Message.info("添加员工成功");
        },
        cancel() {
            this.$Message.info("Clicked cancel");
        }
    },
    mounted() {
        for (var i = 0; i < 10; i++) {
            var params = {};
            params["serial"] = "0000921" + i;
            params["name"] = "王晓宇" + i;
            params["idcard"] = "51130491992019292" + i;
            this.userData.push(params);
        }
    }
};
</script>
