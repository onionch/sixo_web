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
                        <em>姓名 : </em>王帅</span>
                    </Col>
                    <Col span="6">
                    <span class="item">
                        <em>证书编号 : </em>0283928182</span>
                    </Col>
                    <Col span="6">
                    <span class="item">
                        <em>证书类型 : </em>井控证</span>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <span class="item">
                        <em>获证时间 : </em>20180404</span>
                    </Col>
                    <Col span="6">
                    <span class="item">
                        <em>过期时间 : </em>20200404</span>
                    </Col>
                </Row>
            </div>
            <div style="height:1px;border:none;border-top:1px solid grey;margin-top:25px;"></div>
            <div class="cert-info">
                <Row>
                    <Col span="6">
                    <h1 class="info-h">证书扫描件</h1>
                    </Col>
                    <Col span="4" offset="14">
                    <Button type="info" long icon="android-download" size="large">下载</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <img :src="'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/large'" style="width: 100%">
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
            imgName:'',
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
