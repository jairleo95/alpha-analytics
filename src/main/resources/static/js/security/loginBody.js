/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function soloLetrasNumeros(e) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if ((tecla > 47 && tecla < 58) || (tecla >= 97 && tecla <= 122)
            || (tecla >= 65 && tecla <= 90))
        return true;
    else
        return false;
}
function antiSqlInjection(txt) {
    //	var txt = elemento.val();
    var txt2 = txt.replace(/^\s*|\s*$/g, "");
    var txt3 = txt2.toUpperCase();
    if (txt3 === "INSERT" || txt3 === "INTO" || txt3 === "SELECT" || txt3 === "WHERE") {
        return false;
    }
    return true;
}
function initFormLogin() {
    var formLogin = $(".formLogin");
    formLogin[0].reset();
    $(".username").focus();
    $('input').keypress(function (e) {
        if (e.which === 13) {
            formLogin.submit();
            return false;
        }
    });
    $('.password').focus(function () {
        $(".lbPassword").show();
    });
    formLogin.on('change keyup', function () {
        if ($(".username").val() !== "" && $(".password").val() !== "") {
            $(".btnEnter").removeAttr("disabled");
        } else {
            $(".btnEnter").attr("disabled", "disabled");
        }
    });
    formLogin.validate({
        rules: {
            username: {
                required: true,
                val_injection: true
            },
            password: {
                required: true,
                val_injection: true
            }
        },
        messages: {
            username: {
                required: "Porfavor ingresar usuario."
            },
            password: {
                required: "Porfavor ingresar clave."
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            $(".error_message_div").empty();
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());

            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function () {
            validateLogin();
        }
    });
    jQuery.validator.addMethod("val_injection", function (value, element) {
        return this.optional(element) || antiSqlInjection(value);
    }, "Caracteres no permitidos.");

}
$(document).ready(function () {
    initFormLogin();
});
