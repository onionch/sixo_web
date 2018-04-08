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
                    <Input v-model="searchForm.creater" placeholder="通知查询" size="large">
                    <Button slot="append" type="primary" icon="ios-search" @click="btnClick"></Button>
                    </Input>
                    </Col>
                    <Col span="3" offset="15">
                    <Button type="info" long icon="plus-round" @click="showCreateFrom" size="large">添加通知</Button>
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
            <Form ref="formItem" :model="formItem" :label-width="50">
                <Row>
                    <Col span="24" >
                    <FormItem label="标题" prop="title">
                        <Input v-model="formItem.title"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="内容" prop="text">
                        <Input type="textarea" :rows="4" v-model="formItem.text"></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>
</template>

<script>
import util from "../../../libs/util.js";

export default {
    name: "message",
    components: {
        
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
                    title: "通知标题",
                    key: "title"
                },
                {
                    title: "通知内容",
                    key: "text"
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
                                            this.message_delete(params.row.text_id);
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
                this.message_list();
            }else{
                this.$Message.info("当前已经是第一页。")
            }
        },
        nextPage() {
            if(this.currentPage<this.totalPage){
                this.currentPage++;
                this.message_list();
            }else{
                this.$Message.info("没有更多的数据了。")
            }
        },
        showCreateFrom() {
            this.modalTitle = "添加通知";
            this.modalType = "create";
            this.formItem={};
            this.showCreateForm = true;
        },
        showUpdateFrom(row) {
            this.modalTitle = "修改通知";
            this.modalType = "update";
            this.formItem = row;
            this.showCreateForm = true;
        },
        rowClassName(row, index) {
            return "table-info-pointer";
        },
        ok() {
            if (this.modalType == "create") {
                this.message_create(this.formItem);
            } else if (this.modalType == "update") {
                this.message_update(this.formItem);
            }
        },
        cancel() {
            this.showCreateForm = false;
        },
        message_list() {
            var params = {};
            if (
                this.searchForm.creater != null &&
                this.searchForm.creater != ""
            ) {
                params["uid"] = this.searchForm.creater;
            }
            params["page_index"] = this.currentPage;
            params["pageSize"] = this.pageSize;
            var str = "";
            for (var key in params) {
                str += key + "=" + params[key] + "&";
            }
            util.ajax.get("/messages?"+str).then(rsp => {
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
                    }
                    this.userData = data;
                } else {
                    this.$Message.error("系统错误!");
                }
            });
        },
        message_create() {
            util.ajax.post("/messages", this.formItem).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.success("创建通知成功");
                    this.message_list();
                } else {
                    this.$Message.error("系统错误!");
                }
            });
        },
        message_update(params) {
            util.ajax.put("/messages/" + params.text_id, this.formItem).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.success("更新通知成功");
                } else {
                    this.$Message.error("系统错误!");
                }
            });
        },
        message_delete(id) {
            util.ajax.delete("/messages/" + id).then(rsp => {
                if (rsp.data.code == 200) {
                    this.$Message.success("删除通知成功");
                    this.message_list();
                } else {
                    this.$Message.error("系统错误!");
                }
            });
        },
        btnClick(){
            this.currentPage=1;
            this.message_list();
        }
    },
    mounted() {
        this.message_list();
    }
};
</script>
