<style lang="less">
.content {
    height: 400px;
}
.top .title {
    font-size: 24px;
    font-weight: bold;
    color: #505050;
    line-height: 70px;
}
em {
    font-style: normal;
    width: 98px;
    text-align: right;
    font-size: 14px;
    font-weight: bold;
    color: #585858;
}
.item {
    font-size: 14px;
    color: #1d1d1d;
    line-height: 30px;
}
.cert-info {
    margin-top: 25px;
}
.base-info {
}

.info-h {
    color: rgb(102, 102, 102);
    padding: 0px 0px 17px;
    font: bold 24px/26px;
}
</style>

<template>
    <div>
        <Form :model="formItem">
            <Row>
                <Col span="8">
                <Row>
                    <Col>
                    <FormItem label="持证人:" :label-width="80">
                        <Select v-model="formItem.ownerName" placeholder="持证人" clearable filterable>
                            <Option v-for="item in userList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormItem label="证书类型:" :label-width="80">
                        <Select v-model="formItem.category" clearable>
                            <Option v-for="item in categoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormItem label="证书编号:" :label-width="80">
                        <Input v-model="formItem.serial" placeholder="证书编号" clearable></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormItem label="获证日期:" :label-width="80">
                        <DatePicker type="date" placeholder="获证日期" v-model="formItem.obtainDate"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormItem label="备注:" :label-width="80">
                        <Input v-model="formItem.remark" placeholder="备注" clearable></Input>
                    </FormItem>
                    </Col>
                </Row>
                </Col>
                <Col span="10" offset="2">
                <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 100px 0px">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击上传附件</p>
                    </div>
                </Upload>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
export default {
    name: "createForm",
    components: {},
    props: {
        formItem: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            categoryList: [
                { label: "井控证", value: "井控证" },
                { label: "硫化氢证", value: "井控证" }
            ],
            userList:[
                 { label: "张三", value: "张三" },
                 { label: "王晓飞", value: "王晓飞" },
                 { label: "陈天乐", value: "陈天乐" },
                 { label: "李思思", value: "李思思" },
            ],
            defaultList: [
                {
                    name: "a42bdcc1178e62b4694c830f028db5c0",
                    url:
                        "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
                },
                {
                    name: "bc7521e033abdd1e92222d733590f104",
                    url:
                        "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
                }
            ],
            imgName: "",
            visible: false,
            uploadList: []
        };
    },
    watch: {},
    methods: {
        rowClick(row, index) {},
        rowClassName(row, index) {},
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            file.url =
                "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
            file.name = "7eb99afb9d5f317c912f08b5212fd69a";
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: "The file format is incorrect",
                desc:
                    "File format of " +
                    file.name +
                    " is incorrect, please select jpg or png."
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: "Exceeding file size limit",
                desc: "File  " + file.name + " is too large, no more than 2M."
            });
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: "Up to five pictures can be uploaded."
                });
            }
            return check;
        }
    },
    mounted() {},
    activated() {}
};
</script>
