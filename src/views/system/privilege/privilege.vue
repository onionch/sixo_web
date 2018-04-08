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
                    <Button type="info" long icon="plus-round" @click="showCreateFrom" size="large">配置权限</Button>
                    </Col>
                </Row>
            </Card>
        </Row>

        <Row class="margin-top-10">
            <Card>
                <Row>
                    <Col span="24">
                    <Table :row-class-name="rowClassName" height="400" :columns="columns1" :data="tableData"></Table>
                    </Col>
                </Row>
            </Card>
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
    name: "resource",
    components: {
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
                    title: "角色",
                    key: "roleName"
                },
                {
                    title: "资源",
                    key: "resName"
                },
                {
                    title: "资源描述",
                    key: "resDesc"
                },
                {
                    title: "允许的操作",
                    key: "operator"
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
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.deletePrivilege(params.row.id);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            formItem: {
                resName: "",
                resDesc: "",
                resId:null,
                roleId:null,
                operator:[]
            },
            modalType: "",
            tableData: []
        };
    },
    methods: {
        showCreateFrom() {
            this.modalTitle = "配置权限";
            this.modalType = "create";
            this.showCreateForm = true;
        },
        showUpdateFrom(row) {
            this.modalTitle = "修改权限";
            this.modalType = "update";
            for(var key in row){
                this.formItem[key]=row[key]
            }
            this.formItem['operator']=this.formItem['operator'].split(",")
            this.showCreateForm = true;
        },
        rowClassName(row, index) {
            return "table-info-pointer";
        },
        ok() {
            if(this.formItem['operator']!=null){
                this.formItem['operator']=this.formItem['operator'].join(",")
            }
            if (this.modalType == "create") {
                this.createPrivilege(this.formItem);
            } else if (this.modalType == "update") {
                this.updatePrivilege(this.formItem);
            }
        },
        cancel() {
            this.showCreateForm = false;
        },
        createPrivilege(params) {
            util.ajax.post("/privilege", params).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.info("权限创建成功!");
                } else {
                    this.$Message.info("权限创建失败!");
                }
                this.privilegeList();
            });
        },
        updatePrivilege(params) {
            util.ajax.put("/privilege", params).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.info("权限更新成功!");
                } else {
                    this.$Message.info("权限更新失败!");
                }
                this.privilegeList();
            });
        },
        deletePrivilege(id) {
            util.ajax.delete("/privilege/" + id).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.info("权限删除成功!");
                } else {
                    this.$Message.info("权限删除失败!");
                }
                this.privilegeList();
            });
        },
        privilegeList() {
            util.ajax
                .get("/privilege")
                .then(res => {
                    if (res.data.code == 200) {
                        var data = res.data.data;
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
                    }else{
                        this.$Message.error("权限拉取失败");
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.privilegeList();
    }
};
</script>
