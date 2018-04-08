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
                    <Input v-model="searchForm.roleName" placeholder="角色名查询" size="large">
                    <Button slot="append" type="primary" icon="ios-search" @click="btnClick"></Button>
                    </Input>
                    </Col>
                    <Col span="3" offset="15">
                    <Button type="info" long icon="plus-round" @click="showCreateFrom" size="large">添加角色</Button>
                    </Col>
                </Row>
            </Card>
        </Row>

        <Row class="margin-top-10">
            <Col span="24">
                <Table :row-class-name="rowClassName" border height="400" :columns="columns1" :data="tableData"></Table>
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

        <Modal v-model="showCreateForm" width="888" :styles="{top: '20px'}" @on-ok="ok" @on-cancel="cancel">
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
    name: "role",
    components: {
        createForm
    },
    data() {
        return {
            searchForm: {},
            model1: "",
            showDetail: false,
            showCreateForm: false,
            showIdDetail: "",
            cityList: [],
            modalTitle: "",
            columns1: [
                {
                    title: "角色名",
                    key: "roleName"
                },
                {
                    title: "角色描述",
                    key: "roleDesc"
                },
                {
                    title: "角色权值",
                    key: "access"
                },
                {
                    title: "创建日期",
                    key: "created_date"
                },
                {
                    title: "更新日期",
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
                                        'on-ok': () => {
                                            this.deleteRole(
                                                params.row.serialNum
                                            );
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
            formItem: {},
            modalType: "",
            tableData: [],
            currentPage: 1,
            totalPage: 1,
            pageSize: 20
        };
    },
    methods: {
        lastPage() {
            if(this.currentPage>1){
                this.currentPage--;
                this.roleList();
            }else{
                this.$Message.info("当前已经是第一页。")
            }
        },
        nextPage() {
            if(this.currentPage<this.totalPage){
                this.currentPage++;
                this.roleList();
            }else{
                this.$Message.info("没有更多的数据了。")
            }
        },
        showCreateFrom() {
            this.modalTitle = "添加角色";
            this.modalType = "create";
            this.formItem={};
            this.showCreateForm = true;
        },
        showUpdateFrom(row) {
            this.modalTitle = "修改角色";
            this.modalType = "update";
            this.formItem = row;
            this.showCreateForm = true;
        },
        rowClassName(row, index) {
            return "table-info-pointer";
        },
        ok() {
            if (this.modalType == "create") {
                this.createRole(this.formItem);
            } else if (this.modalType == "update") {
                this.updateRole(this.formItem);
            }
        },
        cancel() {
            this.showCreateForm = false;
        },
        createRole(params) {
            util.ajax.post("/roles", params).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.info("角色创建成功!");
                } else {
                    this.$Message.info("角色创建失败!");
                }
                this.roleList();
            });
        },
        updateRole(params) {
            util.ajax.put("/roles/" + params.serialNum, params).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.info("角色更新成功!");
                } else {
                    this.$Message.info("角色更新失败!");
                }
                this.roleList();
            });
        },
        deleteRole(id) {
            util.ajax.delete("/roles/" + id).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.info("角色删除成功!");
                } else {
                    this.$Message.info("角色删除失败!");
                }
                this.roleList();
            });
        },
        roleList() {
            var params = {};
            if (
                this.searchForm.roleName != null &&
                this.searchForm.roleName != ""
            ) {
                params["roleName"] = this.searchForm.roleName;
            }
            params["page_index"] = this.currentPage;
            params["pageSize"] = this.pageSize;
            var str = "";
            for (var key in params) {
                str += key + "=" + params[key] + "&";
            }
            util.ajax
                .get("/roles?"+str)
                .then(res => {
                    if (res.data.code == 200) {
                        var data = res.data.data.list;
                        this.totalPage=res.data.data.totalPage;
                        for (var index in data) {
                            data[index]["created_date"] = util.formatDate(
                                new Date(data[index]["created_date"]),
                                "yyyy-MM-dd hh:mm:ss"
                            );
                            data[index]["updated_date"] = util.formatDate(
                                new Date(data[index]["updated_date"]),
                                "yyyy-MM-dd hh:mm:ss"
                            );
                        }
                        this.tableData = data;
                    } else {
                        this.$Message.info("角色获取失败!");
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        btnClick(){
            this.currentPage=1;
            this.roleList();
        }
    },
    mounted() {
        this.roleList();
    }
};
</script>
