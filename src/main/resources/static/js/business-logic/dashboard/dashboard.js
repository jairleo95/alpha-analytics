/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
pageSetUp();
function loadMetrics() {
    $.ajax({
        url: "dashboard/metrics", data: "opc=totalScopeSM", type: 'GET', success: function (objJson, textStatus, jqXHR) {
            //objJson = JSON.parse(objJson);
            if(objJson.status){
                var fbMetrics = JSON.parse(objJson.facebook);
                var twMetrics = JSON.parse(objJson.twitter);
                $(".fbPageName").text(fbMetrics.name);
                $(".fbLikes").text(fbMetrics.fan_count);
                $(".picturePageFaceBook").attr("src", fbMetrics.picture.data.url);

                $(".twPageName").text(twMetrics.name);
                $(".twitterFollowers").text(twMetrics.followers_count);
                $(".twPictureProfile").attr("src", twMetrics.profile_image_url_https);

                var ytMetrics = objJson.youtube;
                $(".ytSuscriptors").text(ytMetrics.map.rows.myArrayList[0].myArrayList[0]);
                $(".ytChanelName").text(ytMetrics.map.channelName);
                $(".ytPictureProfile").attr("src", ytMetrics.map.urlPictureProfile);
            }else{
                $.smallBox({
                    title: "Error - paso algo inesperado al obtener la información.",
                    /*  content: data.error.message,*/
                    color: "#c26565",
                    sound_file: 'voice_off',
                    timeout: 6000,
                    icon: "fa fa-warning"
                });
            }
        }
    });
}
var pagefunction = function () {
    loadMetrics();
    $(".js-status-update a").click(function () {
        var selText = $(this).text();
        var $this = $(this);
        $this.parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
        $this.parents('.dropdown-menu').find('li').removeClass('active');
        $this.parent().addClass('active');
    });
    /*
     * TODO: add a way to add more todo's to list
     */

    // initialize sortable
    $(function () {
        $("#sortable1, #sortable2").sortable({
            handle: '.handle',
            connectWith: ".todo",
            update: countTasks
        }).disableSelection();
    });

    // check and uncheck
    $('.todo .checkbox > input[type="checkbox"]').click(function () {
        var $this = $(this).parent().parent().parent();

        if ($(this).prop('checked')) {
            $this.addClass("complete");

            // remove this if you want to undo a check list once checked
            //$(this).attr("disabled", true);
            $(this).parent().hide();

            // once clicked - add class, copy to memory then remove and add to sortable3
            $this.slideUp(500, function () {
                $this.clone().prependTo("#sortable3").effect("highlight", {}, 800);
                $this.remove();
                countTasks();
            });
        } else {
            // insert undo code here...
        }

    });
    // count tasks
    function countTasks() {
        $('.todo-group-title').each(function () {
            var $this = $(this);
            $this.find(".num-of-tasks").text($this.next().find("li").size());
        });
    }

    /*
     * RUN PAGE GRAPHS
     */

    /* TAB 1: UPDATING CHART */
    // For the demo we use generated data, but normally it would be coming from the server

    var data = [], totalPoints = 200, $UpdatingChartColors = $("#updating-chart").css('color');

    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);

        // do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i)
            res.push([i, data[i]])
        return res;
    }

    // setup control widget
    var updateInterval = 1500;
    $("#updating-chart").val(updateInterval).change(function () {

        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            $(this).val("" + updateInterval);
        }

    });

    // setup plot
    var options = {
        yaxis: {
            min: 0,
            max: 100
        },
        xaxis: {
            min: 0,
            max: 100
        },
        colors: [$UpdatingChartColors],
        series: {
            lines: {
                lineWidth: 1,
                fill: true,
                fillColor: {
                    colors: [{
                            opacity: 0.4
                        }, {
                            opacity: 0
                        }]
                },
                steps: false

            }
        }
    };

    var plot = $.plot($("#updating-chart"), [getRandomData()], options);

    /* live switch */
    $('input[type="checkbox"]#start_interval').click(function () {
        if ($(this).prop('checked')) {
            $on = true;
            updateInterval = 1500;
            update();
        } else {
            clearInterval(updateInterval);
            $on = false;
        }
    });

    function update() {
        if ($on == true) {
            plot.setData([getRandomData()]);
            plot.draw();
            setTimeout(update, updateInterval);

        } else {
            clearInterval(updateInterval);
        }

    }

    var $on = false;

    /*end updating chart*/

    /* TAB 2: Social Network  */

    $(function () {
        // jQuery Flot Chart
        var twitter = [[1, 100], [2, 34], [3, 51], [4, 48], [5, 55], [6, 65], [7, 61], [8, 70], [9, 65], [10, 75], [11, 57], [12, 59], [13, 62]],
                facebook = [[1, 80], [2, 31], [3, 45], [4, 37], [5, 38], [6, 40], [7, 47], [8, 55], [9, 43], [10, 50], [11, 47], [12, 39], [13, 47]],
                data = [{
                        label: "Twitter",
                        data: twitter,
                        lines: {
                            show: true,
                            lineWidth: 1,
                            fill: true,
                            fillColor: {
                                colors: [{
                                        opacity: 0.1
                                    }, {
                                        opacity: 0.13
                                    }]
                            }
                        },
                        points: {
                            show: true
                        }
                    }, {
                        label: "Facebook",
                        data: facebook,
                        lines: {
                            show: true,
                            lineWidth: 1,
                            fill: true,
                            fillColor: {
                                colors: [{
                                        opacity: 0.1
                                    }, {
                                        opacity: 0.13
                                    }]
                            }
                        },
                        points: {
                            show: true
                        }
                    }];

        var options = {
            grid: {
                hoverable: true
            },
            colors: ["#568A89", "#3276B1"],
            tooltip: true,
            tooltipOpts: {
                //content : "Value <b>$x</b> Value <span>$y</span>",
                defaultTheme: false
            },
            xaxis: {
                ticks: [[1, "JAN"], [2, "FEB"], [3, "MAR"], [4, "APR"], [5, "MAY"], [6, "JUN"], [7, "JUL"], [8, "AUG"], [9, "SEP"], [10, "OCT"], [11, "NOV"], [12, "DEC"], [13, "JAN+1"]]
            },
            yaxes: {
            }
        };

        var plot3 = $.plot($("#statsChart"), data, options);
    });

    // END TAB 2

    // Fans Insights //
    //todo: fix it
    //getDataSocialScope(modifyDateByDays(-50), modifyDateByDays(-1));

    $(".dpDesde").datepicker({
        changeMonth: true,
        numberOfMonths: 1,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            if ($(".dpHasta").val() !== "") {
                getDataSocialScope(selectedDate, $(".dpHasta").val());
            }
            $(".dpHasta").datepicker("option", "minDate", selectedDate);
        }

    });
    $(".dpDesde").datepicker('setDate', modifyDateByDays(-50));
    $(".dpHasta").datepicker({
        changeMonth: true,
        numberOfMonths: 1,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            if ($(".dpDesde").val() !== "") {
                getDataSocialScope($(".dpDesde").val(), selectedDate);
            }
            $(".dpDesde").datepicker("option", "maxDate", selectedDate);
        }

    });
    $(".dpHasta").datepicker('setDate', modifyDateByDays(-1));

    function getDataSocialScope(since, until) {
        $.ajax({
            url: "dashboard/metrics",
            data: "opc=fanInsights&until=" + parseInt(toUnixDate(until)) + "&since=" + parseInt(toUnixDate(since))
            , type: 'GET'
            , success: function (objJson, textStatus, jqXHR) {
                if(objJson.status){
                    var fbMetrics = JSON.parse(objJson.fbMetrics);
                    var facebookFans = jsonListToNx2Array(fbMetrics.data["0"], "values", "end_time", "value", function (item) {
                        /*do any operation*/
                        item[0, 0] = item[0, 0] * 1000;
                        return item;
                    });
                    drawSocialScope(facebookFans);
                } else{
                    console.log(objJson);
                    showError();
                }

            }, error: function (data) {
                var message = data.error.message;
                if (typeof  message ==='undefined') message='';
                console.log(data);
                $.smallBox({
                    title: "Error - paso algo inesperado al obtener la información.",
                    content: message,
                    color: "#c26565",
                    sound_file: 'voice_off',
                    timeout: 6000,
                    icon: "fa fa-warning"
                });
            }
        });
    }
    function drawSocialScope(facebookFans, twitterFans) {
        twitterFans = [[1354586000000, 153], [1364587000000, 658], [1374588000000, 198], [1384589000000, 663], [1394590000000, 801],
            [1404591000000, 1080], [1414592000000, 353], [1424593000000, 749], [1434594000000, 523], [1444595000000, 258], [1454596000000, 688],
            [1464597000000, 364]];
        // prft = [[1354586000000, 53], [1364587000000, 65], [1374588000000, 98], [1384589000000, 83], [1394590000000, 980], [1404591000000, 808], [1414592000000, 720], [1424593000000, 674], [1434594000000, 23], [1444595000000, 79], [1454596000000, 88], [1464597000000, 36]];
        var sgnups = [[1354586000000, 647], [1364587000000, 435], [1374588000000, 784], [1384589000000, 346], [1394590000000, 487],
            [1404591000000, 463], [1414592000000, 479], [1424593000000, 236], [1434594000000, 843], [1444595000000, 657], [1454596000000, 241],
            [1464597000000, 341]];
        var toggles = $("#rev-toggles");
        var target = $("#flotcontainer");

        var data = [
            {
                label: "Meta",
                data: twitterFans,
                bars: {
                    show: true,
                    align: "center",
                    barWidth: 30 * 30 * 60 * 1000 * 80
                }
            },
            {
                label: "Facebook",
                data: facebookFans,
                color: '#3276B1',
                lines: {
                    show: true,
                    lineWidth: 3
                },
                points: {
                    show: true
                }
            },
            {
                label: "Actual Signups",
                data: sgnups,
                color: '#71843F',
                lines: {
                    show: true,
                    lineWidth: 1
                },
                points: {
                    show: true
                }
            }];

        var options = {
            grid: {
                hoverable: true
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s | fecha: %x | likes: %y",
                dateFormat: '%d %b',
                defaultTheme: false
            },
            xaxis: {
                mode: "time"
                        // ,timeformat: "%Y/%m/%d"
            },
            yaxes: {
                tickFormatter: function (val, axis) {
                    return "$" + val;
                },
                max: 1200
            }
        };

        plot2 = null;
        toggles.find(':checkbox').on('change', function () {
            plotNow(toggles, target, data, options);
        });
        plotNow(toggles, target, data, options);

    }
    // getSocialScope();
    function plotNow(toggles, target, data, options) {
        var d = [];
        toggles.find(':checkbox').each(function () {
            if ($(this).is(':checked')) {
                d.push(data[$(this).attr("name").substr(4, 1)]);
            }
        });
        if (d.length > 0) {
            if (plot2) {
                plot2.setData(d);
                plot2.draw();
            } else {
                plot2 = $.plot(target, d, options);
            }
        }
    }
    /*
     * VECTOR MAP
     */

    data_array = {
        "PE": 6695,
        //   "US": 4977,
        "AU": 4873,
        "IN": 3671,
        "BR": 2476,
        "TR": 1476,
        "CN": 146,
        "CA": 134,
        "BD": 100
    };

    $('#vector-map-fake').vectorMap({
        map: 'world_mill_en',
        backgroundColor: '#fff',
        regionStyle: {
            initial: {
                fill: '#c4c4c4'
            },
            hover: {
                "fill-opacity": 1
            }
        },
        series: {
            regions: [{
                    values: data_array,
                    scale: ['#85a8b6', '#4d7686'],
                    normalizeFunction: 'polynomial'
                }]
        },
        onRegionLabelShow: function (e, el, code) {
            if (typeof data_array[code] == 'undefined') {
                e.preventDefault();
            } else {
                var countrylbl = data_array[code];
                el.html(el.html() + ': ' + countrylbl + ' visits');
            }
        }
    });

};
var pagedestroy = function(){

    /*
     Example below:

     $("#calednar").fullCalendar( 'destroy' );
     if (debugState){
     root.console.log("✔ Calendar destroyed");
     }

     For common instances, such as Jarviswidgets, Google maps, and Datatables, are automatically destroyed through the app.js loadURL mechanic

     */
    // destroy vector map objects
    $('#vector-map').find('*').addBack().off().remove();

    // destroy pie chart
    myPie.destroy();
    PieConfig=null;


}

/*
 * ALL PAGE RELATED SCRIPTS CAN GO BELOW HERE
 * eg alert("my home function");
 *
 * var pagefunction = function() {
 *   ...
 * }
 * loadScript("js/plugin/_PLUGIN_NAME_.js", pagefunction);
 *
 * TO LOAD A SCRIPT:
 * var pagefunction = function (){
 *  loadScript(".../plugin.js", run_after_loaded);
 * }
 *
 * OR you can load chain scripts by doing
 *
 * loadScript(".../plugin.js", function(){
 * 	 loadScript("../plugin.js", function(){
 * 	   ...
 *   })
 * });
 */

// pagefunction

var PieConfig;

/* flot chart colors default */
var $chrt_border_color = "#efefef";
var $chrt_grid_color = "#DDD"
var $chrt_main = "#E24913";			/* red       */
var $chrt_second = "#6595b4";		/* blue      */
var $chrt_third = "#FF9F01";		/* orange    */
var $chrt_fourth = "#7e9d3a";		/* green     */
var $chrt_fifth = "#BD362F";		/* dark red  */
var $chrt_mono = "#000";

var pagefunction2 = function() {
    // clears the variable if left blank
    /* sales chart */

    var myRandomNumber = function () {
        return ( Math.floor((Math.random() * 80) + 400) )
    }


    var saleschart = function() {

        if ($("#saleschart").length) {
            var d = [[1197068400000, 1086], [1197154800000, 676], [1197241200000, 1205], [1197327600000, 906], [1197414000000, 710], [1197500400000, 639], [1197586800000, 540], [1197673200000, 435], [1197759600000, 301], [1197846000000, 575], [1197932400000, 481], [1198018800000, 591], [1198105200000, 608], [1198191600000, 459], [1198450800000, 686], [1198537200000, 279], [1198623600000, 449], [1198710000000, 468], [1198796400000, 392], [1198882800000, 282], [1198969200000, 208], [1199055600000, 229], [1199142000000, 177], [1199228400000, 374], [1199314800000, 436], [1199401200000, 404], [1199487600000, 253], [1199574000000, 218], [1199660400000, 476], [1199746800000, 462], [1199833200000, 500], [1199919600000, 700], [1200006000000, 750], [1200092400000, 600], [1200178800000, 500], [1200265200000, 900], [1200351600000, 930], [1200438000000, 1200], [1200524400000, 980], [1200610800000, 950], [1200697200000, 900], [1200783600000, 1000], [1200870000000, 1050], [1200956400000, 1150], [1201042800000, 1100], [1201129200000, 1200], [1201215600000, 1300]];

            var e = [[1197068400000, 86], [1197154800000, 76], [1197241200000, 55], [1197327600000, 46], [1197414000000, 70], [1197500400000, 39], [1197586800000, 40], [1197673200000, 35], [1197759600000, 11], [1197846000000, 75], [1197932400000, 81], [1198018800000, 91], [1198105200000, 80], [1198191600000, 89], [1198450800000, 86], [1198537200000, 99], [1198623600000, 149], [1198710000000, 46], [1198796400000, 92], [1198882800000, 82], [1198969200000, 28], [1199055600000, 29], [1199142000000, 77], [1199228400000, 37], [1199314800000, 36], [1199401200000, 44], [1199487600000, 25], [1199574000000, 28], [1199660400000, 47], [1199746800000, 46], [1199833200000, 50], [1199919600000, 70], [1200006000000, 75], [1200092400000, 60], [1200178800000, 50], [1200265200000, 200], [1200351600000, 90], [1200438000000, 100], [1200524400000, 98], [1200610800000, 95], [1200697200000, 90], [1200783600000, 100], [1200870000000, 150], [1200956400000, 150], [1201042800000, 110], [1201129200000, 120], [1201215600000, 130]];

            var f = [[1197068400000, 16], [1197154800000, 71], [1197241200000, 51], [1197327600000, 41], [1197414000000, 70], [1197500400000, 39], [1197586800000, 10], [1197673200000, 31], [1197759600000, 11], [1197846000000, 71], [1197932400000, 81], [1198018800000, 91], [1198105200000, 81], [1198191600000, 18], [1198450800000, 86], [1198537200000, 199], [1198623600000, 119], [1198710000000, 11], [1198796400000, 91], [1198882800000, 81], [1198969200000, 21], [1199055600000, 129], [1199142000000, 77], [1199228400000, 37], [1199314800000, 16], [1199401200000, 104], [1199487600000, 121], [1199574000000, 21], [1199660400000, 47], [1199746800000, 46], [1199833200000, 51], [1199919600000, 100], [1200006000000, 71], [1200092400000, 16], [1200178800000, 50], [1200265200000, 100], [1200351600000, 91], [1200438000000, 100], [1200524400000, 91], [1200610800000, 19], [1200697200000, 90], [1200783600000, 100], [1200870000000, 115], [1200956400000, 110], [1201042800000, 110], [1201129200000, 120], [1201215600000, 110]];

            var g = [[1197068400000, 206], [1197154800000, 221], [1197241200000, 221], [1197327600000, 211], [1197414000000, 230], [1197500400000, 219], [1197586800000, 230], [1197673200000, 211], [1197759600000, 201], [1197846000000, 231], [1197932400000, 211], [1198018800000, 211], [1198105200000, 211], [1198191600000, 218], [1198450800000, 216], [1198537200000, 329], [1198623600000, 309], [1198710000000, 201], [1198796400000, 201], [1198882800000, 201], [1198969200000, 221], [1199055600000, 276], [1199142000000, 210], [1199228400000, 127], [1199314800000, 216], [1199401200000, 304], [1199487600000, 321], [1199574000000, 243], [1199660400000, 207], [1199746800000, 246], [1199833200000, 251], [1199919600000, 300], [1200006000000, 232], [1200092400000, 213], [1200178800000, 200], [1200265200000, 300], [1200351600000, 291], [1200438000000, 300], [1200524400000, 211], [1200610800000, 241], [1200697200000, 200], [1200783600000, 300], [1200870000000, 315], [1200956400000, 210], [1201042800000, 312], [1201129200000, 300], [1201215600000, 300]];

            for (var i = 0; i < d.length; ++i)
                d[i][0] += 60 * 60 * 1000;

            function weekendAreas(axes) {
                var markings = [];
                var d = new Date(axes.xaxis.min);
                // go to the first Saturday
                d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
                d.setUTCSeconds(0);
                d.setUTCMinutes(0);
                d.setUTCHours(0);
                var i = d.getTime();
                do {
                    // when we don't set yaxis, the rectangle automatically
                    // extends to infinity upwards and downwards
                    markings.push({
                        xaxis : {
                            from : i,
                            to : i + 2 * 24 * 60 * 60 * 1000
                        }
                    });
                    i += 7 * 24 * 60 * 60 * 1000;
                } while (i < axes.xaxis.max);

                return markings;
            }

            var options = {
                xaxis : {
                    mode : "time",
                    tickLength : 5
                },
                series : {
                    lines : {
                        show : true,
                        lineWidth : 1,
                        fill : true,
                        fillColor : {
                            colors : [{
                                opacity : 0.1
                            }, {
                                opacity : 0.15
                            }]
                        }
                    },
                    //points: { show: true },
                    shadowSize : 0
                },
                selection : {
                    mode : "x"
                },
                grid : {
                    hoverable : true,
                    clickable : true,
                    tickColor : $chrt_border_color,
                    borderWidth : 0,
                    borderColor : $chrt_border_color,
                },
                tooltip : false,
                colors : [$chrt_second, $chrt_third, $chrt_main, $chrt_fourth],

            };

            plot_1 = $.plot($("#saleschart"), [d,e,f,g], options);


        };

    }

    var linechart = function() {
        if ($("#linechart").length) {
            var d = [[1197068400000, myRandomNumber()], [1197154800000, myRandomNumber()], [1197241200000, myRandomNumber()], [1197327600000, myRandomNumber()], [1197414000000, myRandomNumber()], [1197500400000, myRandomNumber()], [1197586800000, myRandomNumber()], [1197673200000, myRandomNumber()], [1197759600000, myRandomNumber()], [1197846000000, myRandomNumber()], [1197932400000, myRandomNumber()], [1198018800000, myRandomNumber()], [1198105200000, myRandomNumber()], [1198191600000, myRandomNumber()], [1198450800000, myRandomNumber()], [1198537200000, myRandomNumber()], [1198623600000, myRandomNumber()], [1198710000000, myRandomNumber()], [1198796400000, myRandomNumber()], [1198882800000, myRandomNumber()], [1198969200000, myRandomNumber()], [1199055600000, myRandomNumber()], [1199142000000, myRandomNumber()], [1199228400000, myRandomNumber()], [1199314800000, myRandomNumber()], [1199401200000, myRandomNumber()], [1199487600000, myRandomNumber()], [1199574000000, myRandomNumber()], [1199660400000, myRandomNumber()], [1199746800000, myRandomNumber()], [1199833200000, myRandomNumber()], [1199919600000, myRandomNumber()], [1200006000000, myRandomNumber()], [1200092400000, myRandomNumber()], [1200178800000, myRandomNumber()], [1200265200000, myRandomNumber()], [1200351600000, myRandomNumber()], [1200438000000, myRandomNumber()], [1200524400000, myRandomNumber()], [1200610800000, myRandomNumber()], [1200697200000, myRandomNumber()], [1200783600000, myRandomNumber()], [1200870000000, myRandomNumber()], [1200956400000, myRandomNumber()], [1201042800000, myRandomNumber()], [1201129200000, myRandomNumber()], [1201215600000, 900]];

            var e = [[1197068400000, 400], [1197154800000, myRandomNumber()], [1197241200000, myRandomNumber()], [1197327600000, myRandomNumber()], [1197414000000, myRandomNumber()], [1197500400000, myRandomNumber()], [1197586800000, myRandomNumber()], [1197673200000, myRandomNumber()], [1197759600000, myRandomNumber()], [1197846000000, myRandomNumber()], [1197932400000, myRandomNumber()], [1198018800000, myRandomNumber()], [1198105200000, 400], [1198191600000, myRandomNumber()], [1198450800000, myRandomNumber()], [1198537200000, myRandomNumber()], [1198623600000, myRandomNumber()], [1198710000000, myRandomNumber()], [1198796400000, myRandomNumber()], [1198882800000, myRandomNumber()], [1198969200000, myRandomNumber()], [1199055600000, myRandomNumber()], [1199142000000, myRandomNumber()], [1199228400000, myRandomNumber()], [1199314800000, myRandomNumber()], [1199401200000, myRandomNumber()], [1199487600000, myRandomNumber()], [1199574000000, 400], [1199660400000, myRandomNumber()], [1199746800000, myRandomNumber()], [1199833200000, myRandomNumber()], [1199919600000, myRandomNumber()], [1200006000000, myRandomNumber()], [1200092400000, myRandomNumber()], [1200178800000, myRandomNumber()], [1200265200000, myRandomNumber()], [1200351600000, myRandomNumber()], [1200438000000, myRandomNumber()], [1200524400000, myRandomNumber()], [1200610800000, myRandomNumber()], [1200697200000, myRandomNumber()], [1200783600000, myRandomNumber()], [1200870000000, 400], [1200956400000, myRandomNumber()], [1201042800000, myRandomNumber()], [1201129200000, myRandomNumber()], [1201215600000, 500]];

            for (var i = 0; i < d.length; ++i)
                d[i][0] += 60 * 60 * 1000;

            function weekendAreas(axes) {
                var markings = [];
                var d = new Date(axes.xaxis.min);
                // go to the first Saturday
                d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
                d.setUTCSeconds(0);
                d.setUTCMinutes(0);
                d.setUTCHours(0);
                var i = d.getTime();
                do {
                    // when we don't set yaxis, the rectangle automatically
                    // extends to infinity upwards and downwards
                    markings.push({
                        xaxis : {
                            from : i,
                            to : i + 2 * 24 * 60 * 60 * 1000
                        }
                    });
                    i += 7 * 24 * 60 * 60 * 1000;
                } while (i < axes.xaxis.max);

                return markings;
            }

            var options = {
                xaxis : {
                    mode : "time",
                    tickLength : 5
                },
                series : {
                    lines : {
                        show : true,
                        lineWidth : 2,
                        fill : false,
                        fillColor : {
                            colors : [{
                                opacity : 0.1
                            }, {
                                opacity : 0.15
                            }]
                        }
                    },
                    //points: { show: true },
                    shadowSize : 0
                },
                selection : {
                    mode : "x"
                },
                grid : {
                    hoverable : true,
                    clickable : true,
                    tickColor : $chrt_border_color,
                    borderWidth : 0,
                    borderColor : $chrt_border_color,
                },
                tooltip : false,
                colors : [$chrt_second, $chrt_third],

            };

            plot_1 = $.plot($("#linechart"), [d,e], options);


        };
    }

    /* end sales chart */

    var randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
        //return 0;
    };

    /*
     * VECTOR MAP
     */

    data_array = {
        "US": 4977,
        "AU": 4873,
        "IN": 3671,
        "BR": 2476,
        "TR": 1476,
        "CN": 146,
        "CA": 134,
        "BD": 100
    };

    function renderVectorMap() {
        $('#vector-map').vectorMap({
            map: 'world_mill_en',
            backgroundColor: '#fff',
            regionStyle: {
                initial: {
                    fill: '#c4c4c4'
                },
                hover: {
                    "fill-opacity": 1
                }
            },
            series: {
                regions: [{
                    values: data_array,
                    scale: ['#85a8b6', '#4d7686'],
                    normalizeFunction: 'polynomial'
                }]
            },
            onRegionLabelShow: function (e, el, code) {
                if (typeof data_array[code] == 'undefined') {
                    e.preventDefault();
                } else {
                    var countrylbl = data_array[code];
                    el.html(el.html() + ': ' + countrylbl + ' visits');
                }
            }
        });
    }

    function renderPie(){
        // pie chart example
        PieConfig = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                    ],
                    backgroundColor: [
                        "#3b5998",
                        "#8b9dc3",
                        "#dfe3ee",
                        "#b0bcd5",
                        "#293e6a",
                    ],
                }],
                labels: [
                    "(14-17)",
                    "(18-23)",
                    "(24-30)",
                    "(31-37)",
                    "(38-55)"
                ]
            },
            options: {
                responsive: true
            }
        };
        myPie = new Chart(document.getElementById("pieChart"), PieConfig);
    }

    // Load Map dependency 1 then call for dependency 2 and then run renderVectorMap function
    loadScript("js/plugin/vectormap/jquery-jvectormap-1.2.2.min.js", function(){
        loadScript("js/plugin/vectormap/jquery-jvectormap-world-mill-en.js", renderVectorMap);
    });

    // pie chart
    loadScript("js/plugin/moment/moment.min.js", function(){
        loadScript("js/plugin/chartjs/chart.min.js", renderPie)});

    //flot chart
    // load all flot plugins
    loadScript("js/plugin/flot/jquery.flot.cust.min.js", function(){
        loadScript("js/plugin/flot/jquery.flot.resize.min.js", function(){
            loadScript("js/plugin/flot/jquery.flot.fillbetween.min.js", function(){
                loadScript("js/plugin/flot/jquery.flot.orderBar.min.js", function(){
                    loadScript("js/plugin/flot/jquery.flot.pie.min.js", function(){
                        loadScript("js/plugin/flot/jquery.flot.time.min.js", function(){
                            loadScript("js/plugin/flot/jquery.flot.tooltip.min.js", [saleschart(), linechart()]);
                        });
                    });
                });
            });
        });
    });
    loadScript("js/plugin/bootstrap-timepicker/bootstrap-timepicker.min.js",
        function () {
            loadScript("js/date/date.js",
                function () {
                    loadScript("js/jsForm/jsForm.js", pagefunction);
                });
        });
};
// run pagefunction
pagefunction2();
// load related plugins
