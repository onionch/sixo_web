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
                    <Input v-model="likeInput" placeholder="证书名" size="large">
                    <Button slot="append" type="primary" icon="ios-search"></Button>
                    </Input>
                    </Col>
                    <Col span="4" offset="14">
                    <Button type="info" long icon="plus-round" @click="showCreateFrom" size="large">添加证书类型</Button>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <Row class="margin-top-10">
                    <Col span="24">
                    <Table :row-class-name="rowClassName" @on-row-click="rowClick" :columns="typeCol" :data="typeData"></Table>
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
        <Modal v-model="showCreateForm" :title="modalTitle" :styles="{top: '20px'}" width="300" @on-ok="ok" @on-cancel="cancel">
            <Form :model="formItem">
                <Row>
                    <Col span="24">
                    <FormItem label="类型名称:" :label-width="80">
                        <Input v-model="formItem.name" placeholder="类型名称" clearable></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="发证机关:" :label-width="80">
                        <Input v-model="formItem.authority" placeholder="发证机关" clearable></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="有效期(月):" :label-width="80">
                        <InputNumber :max="999999" :min="1" v-model="formItem.validity" placeholder="有效期"></InputNumber>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>
</template>

<script>
import util from "../../../../libs/util.js";
export default {
    name: "staff",
    components: {
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
            formItem: {},
            typeCol: [
                {
                    type: "index",
                    width: 60,
                    align: "center"
                },
                {
                    title: "类型名称",
                    key: "name"
                },
                {
                    title: "发证机关",
                    key: "authority"
                },
                {
                    title: "有效期(月)",
                    key: "validity"
                },
                {
                    title: "类型编号",
                    key: "serial"
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
            typeData: [],
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
            this.modalTitle = "添加证书类型";
            this.showCreateForm = true;
        },
        showUpdateFrom(row) {
            this.modalTitle = "修改信息";
            this.formItem = row;
            this.showCreateForm = true;
        },
        delete(id){
            this.typeData.splice(id,1);
            this.$Message.info("删除成功");
        },
        rowClick(row, index) {
            this.showDetail = true;
            this.showIdDetail = index + "";
            this.modalTitle = "钻井工程师";
        },
        ok() {
            this.typeData.push(this.formItem);
            this.formItem = {};
        },
        cancel() {}
    },
    mounted() {
        this.typeData.push({
            name: "井控证",
            authority: "石油培训中心",
            validity: 12,
            serial: "110291882716627"
        });
        this.typeData.push({
            name: "硫化氢证",
            authority: "石油培训中心",
            validity: 12,
            serial: "110291882716628"
        });
    }
};
</script>
