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
                    <Input v-model="searchForm.userName" placeholder="用户名查询" size="large">
                    <Button slot="append" type="primary" icon="ios-search" @click="btnClick"></Button>
                    </Input>
                    </Col>
                    <Col span="3" offset="15">
                    <Button type="info" long icon="plus-round" @click="showCreateFrom" size="large">添加用户</Button>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Col span="24">
                <Table highlight-row border :height=400 :columns="userCol" :data="userData"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <Row>
                        <Col span="6">
                            <span>当前第{{currentPage}}页(总共{{totalPage}}页)，每页显示20条记录</span>
                        </Col>
                        <Col span="4" offset="14">
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
        <Modal v-model="showCreateForm" width="400" :styles="{top: '20px'}" @on-ok="ok" @on-cancel="cancel">
            <p slot="header" style="color:#f60;text-align:left">
                <Icon type="information-circled"></Icon>
                <span>{{ modalTitle }}</span>
            </p>
            <create-form :formItem="formItem">
            </create-form>
        </Modal>
    </div>
</template>

<script>
import util from "../../../libs/util.js";
import createForm from "./createForm.vue";

export default {
    name: "user",
    components: {
        createForm
    },
    data() {
        return {
            searchForm: {},
            userCol: [
                {
                    type: "index",
                    width: 60,
                    align: "center"
                },
                {
                    title: "用户名",
                    key: "userName"
                },
                {
                    title: "角色",
                    key: "roleDesc"
                },
                {
                    title: "姓名",
                    key: "realName"
                },
                {
                    title: "用户编码",
                    key: "uId"
                },
                {
                    title: "创建时间",
                    key: "created_date"
                },
                {
                    title: "更新时间",
                    key: "updated_date"
                },
                {
                    title: "操作",
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
                                            this.user_delete(params.row.uId);
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
            formItem: {
                realName: "",
                mailAddr: "",
                phoneNum: "",
                userName: "",
                roleSerialNum: "",
                userPassword: ""
            },
            modalTitle: "",
            showCreateForm: false,
            roles: [],
            currentPage: 1,
            totalPage: 1,
            pageSize: 20
        };
    },
    methods: {
        lastPage() {
            if(this.currentPage>1){
                this.currentPage--;
                this.user_list();
            }else{
                this.$Message.info("当前已经是第一页。")
            }
        },
        nextPage() {
            if(this.currentPage<this.totalPage){
                this.currentPage++;
                this.user_list();
            }else{
                this.$Message.info("没有更多的数据了。")
            }
        },
        showCreateFrom() {
            this.modalTitle = "添加账户";
            this.modalType = "create";
            this.formItem={};
            this.showCreateForm = true;
        },
        showUpdateFrom(row) {
            this.modalTitle = "修改账户";
            this.modalType = "update";
            this.formItem = row;
            this.showCreateForm = true;
        },
        rowClassName(row, index) {
            return "table-info-pointer";
        },
        ok() {
            if (this.modalType == "create") {
                this.user_create(this.formItem);
            } else if (this.modalType == "update") {
                this.user_update(this.formItem);
            }
        },
        cancel() {
            this.showCreateForm = false;
        },
        user_list() {
            var params = {};
            if (
                this.searchForm.userName != null &&
                this.searchForm.userName != ""
            ) {
                params["userName"] = this.searchForm.userName;
            }
            params["page_index"] = this.currentPage;
            params["pageSize"] = this.pageSize;
            var str = "";
            for (var key in params) {
                str += key + "=" + params[key] + "&";
            }
            util.ajax.get("/users?"+str).then(rsp => {
                if (rsp.data.code == 200) {
                    var data = rsp.data.data.list;
                    this.totalPage=rsp.data.data.totalPage;
                    for (var index in data) {
                        data[index]["userPassword"] = "";
                        data[index]["created_date"] = util.formatDate(
                            new Date(data[index]["created_date"]),
                            "yyyy-MM-dd hh:mm:ss"
                        );
                        data[index]["updated_date"] = util.formatDate(
                            new Date(data[index]["updated_date"]),
                            "yyyy-MM-dd hh:mm:ss"
                        );
                        if (data[index]["userRole"] !== null) {
                            data[index]["roleDesc"] =
                                data[index]["userRole"]["roleDesc"];
                        }
                    }
                    this.userData = data;
                } else {
                    this.$Message.error("系统错误!");
                }
            });
        },
        user_create() {
            util.ajax.post("/users", this.formItem).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.success("创建用户成功");
                    this.user_list();
                } else {
                    this.$Message.error("系统错误!");
                }
            });
        },
        user_update(params) {
            util.ajax.put("/users/" + params.uId, this.formItem).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.success("更新用户成功");
                } else {
                    this.$Message.error("系统错误!");
                }
            });
        },
        user_delete(id) {
            util.ajax.delete("/users/" + id).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.success("删除用户成功");
                    this.user_list();
                } else {
                    this.$Message.error("系统错误!");
                }
            });
        },
        btnClick(){
            this.currentPage=1;
            this.user_list();
        }
    },
    mounted() {
        this.user_list();
    }
};
</script>
