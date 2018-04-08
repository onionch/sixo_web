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
        <div class="content">
            <div class="base-info">
                <Row>
                    <Col span="8">
                    <span class="item">
                        <em>身份证号码 : </em>511304199109286916</span>
                    </Col>
                    <Col span="6">
                    <span class="item">
                        <em>身份证有效期 : </em>2025/03/01</span>
                    </Col>
                    <Col span="6">
                    <span class="item">
                        <em>手机号码 : </em>13280896013</span>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <span class="item">
                        <em>最高学历 : </em>本科</span>
                    </Col>
                    <Col span="6">
                    <span class="item">
                        <em>职称 : </em>无</span>
                    </Col>
                    <Col span="6">
                    <span class="item">
                        <em>社保 : </em>未买</span>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <span class="item">
                        <em>合同期限 : </em>2017/01/05 至 2018/03/01 </span>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <span class="item">
                        <em>住址 : </em>四川省-成都市-武侯区-红牌楼小区</span>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <span class="item">
                        <em>紧急联系人 : </em>张望方 （028-88888888)</span>
                    </Col>
                </Row>
            </div>
            <div style="height:1px;border:none;border-top:1px solid grey;margin-top:25px;"></div>
            <div class="cert-info">
                <Row>
                    <Col span="6">
                    <h1 class="info-h">持证信息</h1>
                    </Col>
                    <Col span="4" offset="14">
                    <Button type="warning" icon="plus" long>添加证书</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <Table :row-class-name="rowClassName" @on-row-click="rowClick" height="300" :columns="certCol" :data="certData"></Table>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "staffInfo",
    components: {},
    props: {
        staff_id: {
            type: String,
            default: NaN
        }
    },
    data() {
        return {
            certCol: [],
            certData: [],
            show: false
        };
    },
    watch: {
        staff_id(id) {
            console.log("change_id:" + id);
        }
    },
    methods: {
        rowClick(row, index) {},
        rowClassName(row, index) {}
    },
    mounted() {},
    activated() {}
};
</script>
