/**
 * Created by Kingo on 2017/3/3 0003.
 */


var infoStatistics = $("#infoStatistics");
infoStatistics.click(function () {

});

//分级统计
// $("#cs").click(function () {
//     var c1 = '100';
//     var c2 = '200';
//     var c3 = '300';
//     var c4 = '400';
//
//     var cArr = ['0'];
//     cArr.push(c1);
//     cArr.push(c2);
//     // cArr.push(c3);
//     // cArr.push(c4);
//     cArr.push('最大值');
//     var allinfo = [];
//     var legenddata = [];
//     var namedata = [];
//     var xzF = xiangzhenSource.getFeatures();
//     for (var j = 0; j < cArr.length - 1; j++) {
//         var k = j + 1;
//         var c = cArr[j] + "-" + cArr[k];
//         legenddata.push(c);
//     }
//     for (var i = 0; i < xzF.length; i++) {
//         var name = xzF[i].get("xiangzhen");
//         var xzinfo = [name]
//         for (var j = 0; j < cArr.length - 1; j++) {
//             var k = j + 1;
//             var c1 = cArr[j];
//             var c2 = cArr[k];
//             var mj = getAreaByNameType(name, "all", c1, c2);
//             // console.log(name + "的" + c1 + "到" + c2 + "的面积为" + mj);
//             xzinfo.push(mj);
//         }
//         namedata.push(name);
//         //二维数组
//         allinfo.push(xzinfo);
//     }
//     //创建画板
//     var oDiv = document.createElement("div");
//     oDiv.id = "classGraph";
//     oDiv.style.backgroundColor = "black";
//     // oDiv.style.opacity = "0";
//     oDiv.style.position = "absolute";
//     oDiv.style.width = "1000px";
//     oDiv.style.height = "400px";
//     oDiv.style.top = "50%";
//     oDiv.style.left = "50%";
//     oDiv.style.marginLeft = "-500px";
//     oDiv.style.marginTop = "-200px";
//     oDiv.style.zIndex = "1003";
//     document.body.appendChild(oDiv);
//     //绘制图表
//     createClassGraph("classGraph", legenddata, namedata, allinfo);
// })
//区域统计
$("#xzds").click(function () {
        var namearr = ["姚庄镇", "陶庄镇", "罗星街道", "西塘镇", "惠民街道", "大云镇", "天凝镇", "干窑镇", "魏塘街道"]
        var s = getAreaByName("test").substring(1);
        var mjarrstr = s.substring(0, s.length - 1);
        // console.log(mjarrstr);
        var arr = mjarrstr.split("],");
        // console.log(arr);
        var allinfo = [];
        for (var i = 0; i < arr.length; i++) {
            if (i != 8) {
                arr[i] = arr[i] + "]";
            }
            var arrInfo = arr[i].split(",");
            arrInfo[0] = arrInfo[0].replace("[", "");
            arrInfo[4] = arrInfo[4].replace("]", "");
            arrInfo.push(namearr[i]);
            allinfo.push(arrInfo);
        }
        var xzF = xiangzhenSource.getFeatures();
        for (var i = 0; i < xzF.length; i++) {
            var name = xzF[i].get("xiangzhen");
            // console.log(name);
            var xzG = xzF[i].getGeometry();
            //获取各镇区域中心点
            var point = getCentralPoint(xzG.getExtent());
            //创建画板
            creatDiv(point, i);
            for (var j = 0; j < xzF.length; j++) {
                if (name == allinfo[j][5]) {
                    createGraph(name, i, allinfo[j][0], allinfo[j][2], allinfo[j][1], allinfo[j][3]);
                }
            }
        }
        map.getView().on('change:center', function () {
            //重新获取中心点
            for (var i = 0; i < xzF.length; i++) {
                var exent = xzF[i].getGeometry().getExtent();
                var center = getCentralPoint(exent);
                var div = document.getElementById(i);
                div.style.left = center[0] - 35 + "px";
                div.style.top = center[1] + 40 + "px";
            }
        });
    }
);
$("#qxds").click(function () {
    var allarrstr = getAllArea();
    var allarr = allarrstr.split(",");
    //创建画板
    var oDiv = document.createElement("div");
    oDiv.id = "qxyytj";
    oDiv.style.backgroundColor = "black";
    // oDiv.style.opacity = "0";
    oDiv.style.position = "absolute";
    oDiv.style.width = "600px";
    oDiv.style.height = "300px";
    oDiv.style.top = "50%";
    oDiv.style.left = "50%";
    oDiv.style.marginLeft = "-300px";
    oDiv.style.marginTop = "-150px";
    oDiv.style.zIndex = "1003";
    document.body.appendChild(oDiv);
    createGraph2("全县渔业统计", "qxyytj", allarr[0].substring(1), allarr[1], allarr[2], allarr[3]);
})
//面积统计
// $("#as").click(function () {
//     var min = "30";
//     var max = "200";
//     var xzF = xiangzhenSource.getFeatures();
//     for (var i = 0; i < xzF.length; i++) {
//         var name = xzF[i].get("xiangzhen");
//         var xzG = xzF[i].getGeometry();
//         //获取各镇区域中心点
//         var point = getCentralPoint(xzG.getExtent());
//         //创建画板
//         creatDiv(point, i);
//         //根据乡镇名称获取各类资源面积
//         var zmj = getAreaByNameType(name, "all", min, max);
//         console.log(name + "的" + min + "到" + max + "的总面积是" + zmj);
//         var wy = getAreaByNameType(name, "围养", min, max);
//         console.log(name + "的" + min + "到" + max + "的围养是" + wy);
//         var wd = getAreaByNameType(name, "外荡", min, max);
//         console.log(name + "的" + min + "到" + max + "的外荡是" + wd);
//         var yt = getAreaByNameType(name, "鱼塘", min, max);
//         console.log(name + "的" + min + "到" + max + "的鱼塘是" + yt);
//         createGraph(name, i, zmj, yt, wy, wd);
//     }
//     map.getView().on('change:center', function () {
//         //重新获取中心点
//         for (var i = 0; i < xzF.length; i++) {
//             var exent = xzF[i].getGeometry().getExtent();
//             var center = getCentralPoint(exent);
//             var div = document.getElementById(i);
//             div.style.left = center[0] - 35 + "px";
//             div.style.top = center[1] + 40 + "px";
//         }
//     });
// });

//-----------------------方法------------------------
//创建容器
function creatDiv(xy, id) {
    var oDiv = document.createElement("div");
    oDiv.id = id;
    oDiv.style.backgroundColor = "transpart";
    // oDiv.style.opacity = "0.5";
    oDiv.style.position = "absolute";
    oDiv.style.width = "70px";
    oDiv.style.height = "80px";
    oDiv.style.left = xy[0] - 35 + "px";
    oDiv.style.top = xy[1] + 40 + "px";
    oDiv.style.zIndex = "999";
    document.body.appendChild(oDiv);
}
//获取屏幕中心点
function getCentralPoint(extent) {
    var lon = (extent[0] + extent[2]) / 2;
    var lat = (extent[1] + extent[3]) / 2;
    var screenpos = map.getPixelFromCoordinate([lon, lat]);
    return screenpos;
}
//根据乡镇名称和资源类型获取面积
function getAreaByNameType(name, type, min, max) {
    var mdata = {
        data: JSON.stringify({
            "ssxz": name,
            "lxhf": type,
            "min": min,
            "max": max,
        })
    }
    var result;
    $.ajax({
        type: 'post',
        url: './api/getAreaInfo',
        data: mdata,
        async: false,
        success: function (data) {
            console.log('成功:' + data);
            result = data;
        },
        error: function (data) {
            console.log("错误:" + data);
            // console.log(data);
        }
    });
    return result;
}
//创建柱状图
function createGraph(name, id, all, yt, wy, wd) {
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        backgroundColor: 'rgba(0,0,0,0.3)',
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            x: '-1',
            y: '0',
            x2: '0',
            y2: '0'
        },
        calculable: false,
        xAxis: [
            {
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                type: 'category',
                data: [name]
            }
        ],
        yAxis: [
            {
                splitLine: {
                    show: false
                },
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                min: 0,
                max: 10000
            }
        ],
        series: [
            {
                name: '资源总量(亩)',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: false, position: 'top', textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data: [all]
            },
            {
                name: '标准鱼塘(亩)',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: false, position: 'top', textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data: [yt]
            },
            {
                name: '围养鱼塘(亩)',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: false, position: 'top', textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data: [wy]
            },
            {
                name: '外荡鱼塘(亩)',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: false, position: 'top', textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data: [wd]
            }
        ]
    };
    myChart.setOption(option);
}
//分级图表
function createClassGraph(id, legenddata, namedata, allinfo) {
    //series
    var series = [];
    var seriesdatas = [];
    for (var i = 0; i < legenddata.length; i++) {
        var seriesdata = [];
        for (var j = 0; j < allinfo.length; j++) {
            seriesdata.push(allinfo[j][i + 1]);
        }
        seriesdatas.push(seriesdata);
        var s = {
            name: legenddata[i],
            type: 'bar',
            stack: '总量',
            // itemStyle: {normal: {label: {show: true, position: 'insideRight'}}},
            data: seriesdatas[i]
        }
        series.push(s);
    }
    var myChart = echarts.init(document.getElementById(id));
    option = {
        backgroundColor: 'rgba(0,0,0,0.7)',
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: legenddata,
            textStyle: {
                color: '#D3D3D3'
            },
            padding: 10,
            itemGap: 15
        },
        textStyle: {
            color: '#D3D3D3'
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: namedata
            }
        ],
        grid: {
            // x:
            y: 30,
            x2: 30,
            y2: 30
        },
        series: series
    };
    myChart.setOption(option);
}
//-----------------------方法------------------------
//根据乡镇名称获取各类型资源面积[总面积，围养，鱼塘，外荡]
function getAreaByName(name) {
    var mdata = {
        data: JSON.stringify({
            "ssxz": name,
        })
    }
    //var result;
    $.ajax({
        type: 'post',
        url: './api/getAreaByName',
        data: mdata,
        async: true,
        success: function (data) {
            console.log('成功:' + data);
            result = data;

            var namearr = ["姚庄镇", "陶庄镇", "罗星街道", "西塘镇", "惠民街道", "大云镇", "天凝镇", "干窑镇", "魏塘街道"]
    var s = result.substring(1);
    var mjarrstr = s.substring(0, s.length - 1);
    // console.log(mjarrstr);
    var arr = mjarrstr.split("],");
    // console.log(arr);
    var allinfo = [];
    for (var i = 0; i < arr.length; i++) {
        if (i != 8) {
            arr[i] = arr[i] + "]";
        }
        var arrInfo = arr[i].split(",");
        arrInfo[0] = arrInfo[0].replace("[", "");
        arrInfo[4] = arrInfo[4].replace("]", "");
        arrInfo.push(namearr[i]);
        allinfo.push(arrInfo);
    }
    var xzF = xiangzhenSource.getFeatures();
    for (var i = 0; i < xzF.length; i++) {
        var name = xzF[i].get("xiangzhen");
        // console.log(name);
        var xzG = xzF[i].getGeometry();
        //获取各镇区域中心点
        var point = getCentralPoint(xzG.getExtent());
        //创建画板
        creatDiv(point, i);
        for (var j = 0; j < xzF.length; j++) {
            if (name == allinfo[j][5]) {
                createGraph(name, i, allinfo[j][0], allinfo[j][2], allinfo[j][1], allinfo[j][3]);
            }
        }
    }
    map.getView().on('change:center', function () {
        //重新获取中心点
        for (var i = 0; i < xzF.length; i++) {
            var exent = xzF[i].getGeometry().getExtent();
            var center = getCentralPoint(exent);
            var div = document.getElementById(i);
            div.style.left = center[0] - 35 + "px";
            div.style.top = center[1] + 40 + "px";
        }
    });
     map.getView().on('propertychange', function(e) {
   switch (e.key) {
      case 'resolution':
        //重新获取中心点

        for (var i = 0; i < xzF.length; i++) {
            var exent = xzF[i].getGeometry().getExtent();
            var center = getCentralPoint(exent);
            var div = document.getElementById(i);
            div.style.left = center[0] - 35 + "px";
            div.style.top = center[1] + 40 + "px";
            console.log(i+"---left"+(center[0] - 35)+",top"+(center[1] + 40));
        }
        break;
   }
});
    hideModal();
        },
        error: function (data) {
            console.log("错误:" + data);
            // console.log(data);
        }
    });
    //return result;
}
//获取全县各类型资源面积
function getAllArea() {
    var mdata = {
        data: JSON.stringify({
            "ssxz": name,
        })
    }
    $.ajax({
        type: 'post',
        url: './api/getAllArea',
        data: mdata,
        async: true,
        success: function (data) {
            console.log('成功:' + data);
            result = data;
             var allarr = result.split(",");
    //创建画板
             /*
    var oDiv = document.createElement("div");
    oDiv.id = "qxyytj";
    oDiv.style.backgroundColor = "black";
    // oDiv.style.opacity = "0";
    oDiv.style.position = "absolute";
    oDiv.style.width = "600px";
    oDiv.style.height = "300px";
    oDiv.style.top = "50%";
    oDiv.style.left = "50%";
    oDiv.style.marginLeft = "-300px";
    oDiv.style.marginTop = "-150px";
    oDiv.style.zIndex = "1003";
            */
             var oDiv = document.createElement("div");
    oDiv.id = "qxyytj";
    oDiv.style.backgroundColor = "black";
    // oDiv.style.opacity = "0";
    //oDiv.style.position = "absolute";
    oDiv.style.width = "600px";
    oDiv.style.height = "300px";
    //oDiv.style.top = "50%";
    //oDiv.style.left = "50%";
    //oDiv.style.marginLeft = "-300px";
    //oDiv.style.marginTop = "-150px";
    //oDiv.style.zIndex = "1003";

     var root = document.createElement("div");
    root.id = "qxyytjContainer";
     root.style.position = "absolute";
    root.style.width = "600px";
    root.style.height = "350px";
     root.style.top = "50%";
    root.style.left = "50%";
    root.style.marginLeft = "-300px";
    root.style.marginTop = "-150px";
    root.style.zIndex = "1003";

    var closer = document.createElement("div");
            closer.id = "closer";
            closer.style.width = "50px";
            closer.style.height = "0px";
            closer.style.backgroundColor = "#ffffff";
            root.appendChild(closer);
            root.appendChild(oDiv);

    document.body.appendChild(root);
    createGraph2("全县渔业统计(单位:亩)", "qxyytj", allarr[0].substring(1), allarr[1], allarr[2], allarr[3]);
            hideModal()
        },
        error: function (data) {
            console.log("错误:" + data);
            // console.log(data);
        }
    });
}
//全县柱状图
function createGraph2(name, id, all, yt, wy, wd) {
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        backgroundColor: 'rgba(0,0,0,0.7)',
        legend: {
            data: ['资源总量', '标准鱼塘', '围养鱼塘', "外荡鱼塘"],
            textStyle: {
                color: '#D3D3D3'
            },
            padding: 10,
            itemGap: 15
        },
        textStyle: {
            color: '#D3D3D3'
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            x: '60',
            y: '50',
            x2: '25',
            y2: '25'
        },
        // toolbox: {
        //     show: true,
        //     feature: {
        //         mark: {show: true},
        //         dataView: {show: true, readOnly: false},
        //         magicType: {show: true, type: ['line', 'bar']},
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
        // },
        calculable: false,
        xAxis: [
            {
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                type: 'category',
                data: [name]
            }
        ],
        yAxis: [
            {
                splitLine: {
                    show: false
                },
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                min: 0,
                max: 37000
            }
        ],
        series: [
            {
                name: '资源总量',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: true, position: 'top', textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data: [all]
            },
            {
                name: '标准鱼塘',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: true, position: 'top', textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data: [yt]
            },
            {
                name: '围养鱼塘',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: true, position: 'top', textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data: [wy]
            },
            {
                name: '外荡鱼塘',
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: true, position: 'top', textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data: [wd]
            }
        ]
    };
    myChart.setOption(option);
}
