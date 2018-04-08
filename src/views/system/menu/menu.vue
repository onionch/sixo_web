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
                    <Button type="info" long icon="plus-round" @click="showCreateFrom" size="large">添加菜单</Button>
                    </Col>
                </Row>
            </Card>
        </Row>

        <Row class="margin-top-10">
            <Card>
                <Row>
                    <Col span="24">
                    <Table :row-class-name="rowClassName" border height="400" :columns="columns1" :data="tableData"></Table>
                    </Col>
                </Row>
            </Card>
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
    name: "menuMangement",
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
                    title: "菜单名",
                    key: "menuName"
                },
                {
                    title: "访问地址",
                    key: "url"
                },
                {
                    title: "菜单权值",
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
                                            this.deleteMenu(params.row.serialNum);
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
            formItem: {
                menuName: "",
                url: ""
            },
            modalType: "",
            tableData: []
        };
    },
    methods: {
        showCreateFrom() {
            this.modalTitle = "添加菜单";
            this.modalType = "create";

            this.showCreateForm = true;
        },
        showUpdateFrom(row) {
            this.modalTitle = "修改菜单";
            this.modalType = "update";
            this.formItem = row;
            this.showCreateForm = true;
        },
        rowClassName(row, index) {
            return "table-info-pointer";
        },
        ok() {
            if (this.modalType == "create") {
                this.createMenu(this.formItem);
            } else if (this.modalType == "update") {
                this.updateMenu(this.formItem);
            }
        },
        cancel() {
            this.showCreateForm = false;
        },
        createMenu(params) {
            util.ajax.post("/menus", params).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.info("菜单创建成功!");
                } else {
                    this.$Message.info("菜单创建失败!");
                }
                this.menuList();
            });
        },
        updateMenu(params) {
            util.ajax.put("/menus/"+params.serialNum, params).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.info("菜单更新成功!");
                } else {
                    this.$Message.info("菜单更新失败!");
                }
                this.menuList();
            });
        },
        deleteMenu(id) {
            util.ajax.delete("/menus/" + id).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.info("菜单删除成功!");
                } else {
                    this.$Message.info("菜单删除失败!");
                }
                this.menuList();
            });
        },
        menuList() {
            util.ajax
                .get("/menus")
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
                        this.$Message.error("菜单拉取失败");
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    },
    mounted() {
        this.menuList();
    }
};
</script>
