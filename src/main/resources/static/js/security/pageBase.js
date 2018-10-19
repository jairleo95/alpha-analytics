(function ($) {
    $.fn.serializeFormJSON = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

var username = "";
function validateLogin() {
    var formLogin = $(".formLogin");
    var txtStatus = $(".texto_box_h");
    $(".password").addClass("ui-autocomplete-loading");
    $(".btnIngresar").hide();
    $(".box_cargando").hide();
    var data ={
        "username":$(".username").val(),"userPassword":$(".password").val()
    }
    $.ajax({
        type: 'POST',
        url: 'users/login',
        data: JSON.stringify(data),   contentType: "application/json",
        success: function (objJson) {
            if (objJson.status) {
                console.log("Usuario: " + objJson.username+" tiene acceso");
                showContentPageBase(false);
                configPageBase(true);
                username = objJson.username;
            } else {
                console.log("acceso denegado");
                txtStatus.text(objJson.message);
                $(".box_cargando").show();
                $(".password").removeClass("ui-autocomplete-loading");
                $(".btnIngresar").show();
            }
        }
    });
}
function showContentPageBase(condition) {
  /*  if (condition) {
         loadURL("loginBody", $(".mainLogin"));
    } else {
        loadURL("main", $(".mainLogin"));
    }
   */
}
function configPageBase(condition) {
   /* if (condition) {
        $("html").removeAttr("id");
        $(".mainLogin").addClass("smart-style-0");
        $(".mainLogin").addClass("fixed-page-footer");
    } else {
        $("html").attr("id", "extr-page");
        $(".mainLogin").removeClass("smart-style-0");
    }*/
}
function validateSession() {
    $.ajax({
        url: "users/session",
        type: 'POST',
        success: function (objJson, textStatus, jqXHR) {
            if (objJson.status) {
                console.log("Usuario: " + objJson.username);
                username = objJson.username;
                showContentPageBase(false);
                configPageBase(true);
            } else {
                showContentPageBase(true);
                configPageBase(false);
            }
        }
    });
}
$(document).ready(function () {
    pageSetUp();
    $.sound_path = "sound/", $.sound_on = !0, jQuery(document).ready(function () {
        $("body").append("<div id='divSmallBoxes'></div>"), $("body").append("<div id='divMiniIcons'></div><div id='divbigBoxes'></div>");
    });
    validateSession();
});

 