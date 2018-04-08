<style lang="less">
@import "../../../styles/common.less";

.amap-wrapper {
    //   width: 100%;
    height: 500px;
}
.tip {
    // background-color: #fff;
    padding: 0 10px;
    // border: 1px solid silver;
    // box-shadow: 3px 4px 3px 0px silver;
    position: absolute;
    font-size: 12px;
    right: 10px;
    top: 5px;
    border-radius: 3px;
    line-height: 36px;
}
</style>

<template>
    <div>
        <Row>
            <Card>
                <Row :gutter="24">
                    <Col span="6">
                    <Input v-model="selectPoint" placeholder="selectPoint" clearable></Input>
                    </Col>
                    <Col span="2">
                    <Button type="primary" @click="btnClick">检测地址</Button>
                    </Col>
                    <Col span="2">
                    <Button type="info" @click="getClickPoint">点选地址</Button>
                    </Col>
                    <Col span="2">
                    <Button type="error" @click="clearMap">清除覆盖物</Button>
                    </Col>
                    <Col span="11" offset="1">
                    <Input v-model="selectPath" placeholder="selectPath" clearable></Input>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Col span="24">
            <div class="amap-wrapper" id="bmap_id">
            </div>
            <div class="tip">
                <!-- <Button type="info" @click="drawCircle">配置圆形围栏</Button> -->
                <!-- <Button type="success" @click="drawPolygon">配置多边形围栏</Button> -->
                <!-- <Button type="error" @click="clearMap">清除覆盖物</Button> -->
            </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import util from "../../../libs/util.js";
import BMap from "BMap";

export default {
    name: "bmap",
    components: {},
    data() {
        return {
            searchForm: {
                path: "",
                point: "",
                center:"",
                radius:"",
                type:"",
            },
            path: [],
            selectPath:"",
            selectPoint:"",
        };
    },
    methods: {
        clearMap() {
            this.searchForm={
                path: "",
                point: "",
                center:"",
                radius:"",
                type:"",
            };
            this.selectPath="";
            this.map.clearOverlays();
        },
        getClickPoint() {
            this.map.addEventListener("click", this.showInfo);
        },
        showInfo(e) {
            this.selectPoint = e.point.lng + ", " + e.point.lat;
        },
        removeClick() {
            this.map.removeEventListener("click", showInfo);
        },
        btnClick() {
            if (
                this.selectPoint != null &&
                this.selectPoint != "" &&
                this.selectPath != null &&
                this.selectPath != ""
            ) {
                this.searchForm["point"] =  this.selectPoint;
                util.ajax.post("/charge", this.searchForm).then(rsp => {
                    if (rsp.data.code == 200) {
                        this.$Message.info("检测结果："+rsp.data.data);
                    } else {
                        this.$Message.error("系统错误!");
                    }
                });
            } else {
                this.$Message.error("请先输入检测地址并且配置电子围栏。");
            }
        },
        initAmap() {
            this.map = new BMap.Map("bmap_id", { enableMapClick: false });
            // 创建地图实例
            var point = new BMap.Point(116.404, 39.915);
            // 创建点坐标
            this.map.centerAndZoom(point, 15);
            this.map.enableScrollWheelZoom(true);
            this.map.addControl(new BMap.NavigationControl());
            this.map.addControl(new BMap.ScaleControl());
            this.map.addControl(new BMap.OverviewMapControl());
            // this.map.addControl(new BMap.MapTypeControl());
            //初始鼠标画图
            this.initDrawController();
        },
        initDrawController() {
            var that = this;
            var styleOptions = {
                strokeColor: "red", //边线颜色。
                fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 3, //边线的宽度，以像素为单位。
                strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
                fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
                strokeStyle: "solid" //边线的样式，solid或dashed。
            };
            //实例化鼠标绘制工具
            var drawingManager = new BMapLib.DrawingManager(this.map, {
                isOpen: false, //是否开启绘制模式
                enableDrawingTool: true, //是否显示工具栏
                drawingToolOptions: {
                    anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                    offset: new BMap.Size(5, 5), //偏离值
                    drawingModes: [
                        BMAP_DRAWING_CIRCLE,
                        BMAP_DRAWING_POLYGON,
                        BMAP_DRAWING_RECTANGLE
                    ],
                    drawingTypes: [
                        BMAP_DRAWING_CIRCLE,
                        BMAP_DRAWING_POLYGON,
                        BMAP_DRAWING_RECTANGLE
                    ]
                },
                circleOptions: styleOptions, //圆的样式
                polygonOptions: styleOptions, //多边形的样式
                rectangleOptions: styleOptions //矩形的样式
            });
            drawingManager.addEventListener("circlecomplete", function(
                overlay
            ) {
                var str = "";
                var center=overlay.getCenter().lng + ","+ overlay.getCenter().lat;
                var radius=overlay.getRadius();
                str += center+";";
                str += " "+radius;
                that.selectPath = str;
                that.searchForm["center"] = center;
                that.searchForm["radius"] = radius;
                that.searchForm["type"] = "circle";
                drawingManager.close();
            });
            drawingManager.addEventListener("polygoncomplete", function(
                overlay
            ) {
                var points = overlay.getPath();
                var str = "";
                for (var index in points) {
                    str +=
                        points[index]["lng"] + "," + points[index]["lat"] + ";";
                }
                that.selectPath = str;
                that.searchForm["path"] = str;
                that.searchForm["type"] = "polygon";
                drawingManager.close();
            });
            drawingManager.addEventListener("rectanglecomplete", function(
                overlay
            ) {
                var points = overlay.getPath();
                var str = "";
                for (var index in points) {
                    str +=
                        points[index]["lng"] + "," + points[index]["lat"] + ";";
                }
                that.selectPath = str;
                that.searchForm["path"] = str;
                that.searchForm["type"] = "rectangle";
                drawingManager.close();
            });
        }
    },
    mounted() {
        this.initAmap();
    }
};
</script>
