var firstLoad = true;
var isPropertyDivShow = false;
var functionDiv;
        var mapDiv;
        var propertyDiv;

        $(document).ready(function () {
            functionDiv = $("#functionArea");
            mapDiv = $("#mapArea");
            propertyDiv = $("#propertyArea");
            myLayout();
            console.log("pass");
            //$("#rootContainer").css("background", "#2788da");
            $("#functionArea").bind('click', fullVersion);

        });
        $(window).resize(myLayout);

        function myLayout() {
        console.log("in");
            bodyWidth = document.body.clientWidth;
            var visibleHeight = $(window).height();
            var headHeight = 100;
            var contentHeight = visibleHeight - headHeight;
            var functionWidth = Math.round(bodyWidth*0.15);
            functionWidth=0;
            var propertyWidth = Math.round(bodyWidth * 0.25);
            //alert(propertyWidth);
            if (!isPropertyDivShow){
                propertyWidth =0;
            }
            var mapWidth = bodyWidth-(functionWidth+propertyWidth);
            functionDiv.width(functionWidth).height(contentHeight);
            mapDiv.width(mapWidth).height(contentHeight);
            propertyDiv.width(propertyWidth).height(contentHeight);
            //
            if (firstLoad){
                mainLayout();
                firstLoad = false;
                console.log("first load")
            }

        }

        function fullVersion() {
            alert("here");
            functionDiv.css("display", "none");
            propertyDiv.css("display", "none");
            mapDiv.removeClass().addClass("col-md-12");
        }