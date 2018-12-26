function jsonSerialize( form ) {
        var obj = {};
        //var elements = form.querySelectorAll( "input, select, textarea" );
        var elements = form.find( "input, select, textarea" );
        for( var i = 0; i < elements.length; ++i ) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if( name ) {
                obj[ name ] = value;
            }
        }

        //return JSON.stringify( obj );
        return obj;
    }

loadScript("../js/jsForm/numberformat.js");

var usernameRegex = "^[a-z0-9_-]{3,16}$";
var emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
/*
 * Tener un mínimo de ocho (8) caracteres y un máximo de (15) caracteres.
 Contener al menos un carácter alfabético (a-z; A-Z).
 Contener al menos un carácter numérico (0-9).
 Contener al menos un carácter especial. Por ejemplo: @&%”.
 * */
var strongPasswordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})";
var mediumPasswordRegex = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})";
var passwordStrengthRegex = "((?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,15})";
var dateDDMMYYYRegex = '^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)dd$';
var floatRegex = '[-+]?([0-9]*.[0-9]+|[0-9]+)';
var onlyLettersRegex='^[a-zA-Z]*$';
var onlyLettersWithSpacesRegex='^[a-zA-Z ]*$';
var intRegex = '^[0-9 -()+]+$';
var cellphoneRegex='^(\+\d{1,3}[- ]?)?\d{10}$';
var reOnlyNumbers= new RegExp(/^\d+$/);
var reOnlyAlphaNumericsWithOutSpaces= new RegExp(/^[A-Za-z\d]+$/);
var regExpPasaport= new RegExp(/^([a-zA-Z\d]){8,10}$/);
var regExpDNI= new RegExp(/^([\d]){8}$/);

function initFormPluginsEvents() {
    $.datepicker.regional['es'] = {
        closeText: 'Mostrar',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);

    $(".frompicker").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 2,
        dateFormat: 'dd/mm/yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            $(".topicker").datepicker("option", "minDate", selectedDate);
        }

    });

    $(".topicker").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 2,
        dateFormat: 'dd/mm/yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            $(".frompicker").datepicker("option", "maxDate", selectedDate);
        }
    });
    $(".datePickerInput").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 2,
        dateFormat: 'dd/mm/yy',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onClose: function (selectedDate) {
            //$(".frompicker").datepicker("option", "maxDate", selectedDate);
        }
    });
}

function modifyDateByDays(days) {
    milisegundos = parseInt(35 * 24 * 60 * 60 * 1000);

    fecha = new Date();
    day = fecha.getDate();
    // el mes es devuelto entre 0 y 11
    month = fecha.getMonth() + 1;
    year = fecha.getFullYear();

    //  console.log("fecha: "+fecha)
    //  console.log("Fecha actual: " + day + "/" + month + "/" + year);

    //Obtenemos los milisegundos desde media noche del 1/1/1970
    tiempo = fecha.getTime();
    //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
    milisegundos = parseInt(days * 24 * 60 * 60 * 1000);
    //Modificamos la fecha actual
    total = fecha.setTime(tiempo + milisegundos);
    day = fecha.getDate();
    month = fecha.getMonth() + 1;
    year = fecha.getFullYear();
    //console.log("Fecha modificada  : " + day + "/" + month + "/" + year);
    // console.log("total:"+ total);
    // console.log("fecha2: "+fecha);
    //return day + "/" + month + "/" + year;
    return fecha;
}
function jsonListToNx2Array(jsonArr, arrayName, nameColumn1, nameColumn2, callback) {
    var tam = jsonArr[arrayName].length;
    var Nx2Array = [];
    for (var ff = 0; ff < tam; ff++) {
        var value1 = jsonArr[arrayName][ff][nameColumn1];
        var value2 = jsonArr[arrayName][ff][nameColumn2];
        /*make any operation*/
        if (typeof callback !== 'undefined') {
            Nx2Array[ff] = callback([value1, value2]);
        } else {
            Nx2Array[ff] = [value1, value2];
        }
        // console.log("item(" + ff + "):" + Nx2Array[ff]);
    }
    return Nx2Array;
}


function toUnixDate(inputDate) {
    // also "24/11/2009 17:57:35" 
    var unixtime = 0.0;
    if (typeof inputDate === "string") {
        unixtime = Date.parse(inputDate).getTime() / 1000;
    } else if (Object.prototype.toString.call(inputDate) === '[object Date]') {
        console.log("is date ")
        unixtime = inputDate.getTime() / 1000;
    }

    // console.log("Date: " + inputDate);
    console.log("Unix Date: " + unixtime);
    return unixtime;
}
function tryNumberFormat(obj) {
    var num = new NumberFormat();
    num.setInputDecimal('.');
    num.setNumber(obj.value); // obj.value is '1000'
    num.setPlaces('2', false);
    num.setCurrency(false);
    num.setCurrencyPosition(num.LEFT_OUTSIDE);
    num.setNegativeFormat(num.LEFT_DASH);
    num.setNegativeRed(false);
    num.setSeparators(false, ',', ',');
    obj.value = num.toFormatted();
}


function NumCheck(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8)
        return true
    // 0-9
    if (key > 47 && key < 58) {
        if (field.value == "")
            return true
        regexp = /^\d+(\.\d{0,2})?$/;
        return (regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "")
            return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }

    return false

}


Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function getCurrentDate() {

    var f = new Date();
    var mes = "";
    if ((f.getMonth() + 1) < 10)
        mes = "0" + (f.getMonth() + 1);
    else
        mes = (f.getMonth() + 1);
    return (f.getDate() + "/" + mes + "/" + f.getFullYear());
}
var cellphoneRegexCallback = function (value, validator, $field) {
    //  console.log(value + " value field")
    var re = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/gm);
    return re.test(value);
};
var fvValidatorInteger = {
    validators: {
        callback: {
            message: 'Ingrese numeros enteros',
            callback: function (value, validator, $field) {
                console.log(value + " value field")
                var re = new RegExp(intRegex);
                return re.test(value);
            }
        }, notEmpty: {
            message: 'Ingrese un valor'
        },
    }

};

var fvCallbackOnlyInteger = {
    message: 'Ingrese numeros enteros',
    callback: function (value, validator, $field) {
        console.log(value + " value field")
        var re = new RegExp(intRegex);
        return re.test(value);
    }

};
var fvCallbackOnlyNumber = {
    message: 'Ingrese solo numeros',
    callback: function (value, validator, $field) {
        console.log(value + " value field")
        var re = new RegExp(floatRegex);
        return re.test(value);
    }

};

function validateDocumentNumberByDocumentType (value,documentTypeValue){
    var x;
    var message ;
    if (documentTypeValue==='1'){
        x=   reOnlyNumbers.test(value);
        message='El DNI debe tener solo dígitos y sin espacios.';
    }else if  (documentTypeValue==='2'){
        x= reOnlyAlphaNumericsWithOutSpaces.test(value)
        message='El pasaporte debe tener caracteres alfanumericos y sin espacios.';
    }
    /*add more conditions*/
    return {
        valid: x,
        message: message
    }
}
var fvCallbackDocumentNumberByDocumentType={
    callback:function(value, validator, $field){
        var documentTypeValue=$(".documentType").val();
        return validateDocumentNumberByDocumentType(value,documentTypeValue);
    }
}
function validateFieldUnique(valueValidate, urlPost, opc, dataAdit) {
    var x = false;
    valueValidate = valueValidate.trim();
    $.ajax({
        async: false,
        url: urlPost,
        type: "POST",
        data: "opc=" + opc + "&fieldUnique=" + valueValidate + dataAdit,
        success: function (data) {
            if (data.status) {
                /*objJson = JSON.parse(objJson);*/
                var exists = data.exists;
                if (exists) {
                    x = false;
                } else {
                    x = true;
                }
            } else {
                console.log("ocurrio un error al validal el campo unico");
                console.log(data.message);
            }
        }
    });
    return x;
}

$(".btnClose").click(function () {
    formResetValues($(".formSubmit"));
});

function OnlyNumberRegex(value) {
    var reg = new RegExp(floatRegex);
    return reg.test(value);
}
function onlyInteger(value) {
    console.log(value)
    var r = new RegExp(intRegex);
    return r.test(value);
}

$(".onlyNumber").keyup(function (e) {
    // console.log($(this).val())
    // var value = String.fromCharCode(e.which);
    console.log(OnlyNumberRegex($(this).val()))
    if (!OnlyNumberRegex($(this).val())) {
        $(this).val("");
    }
});

function onlyAlphanumeric(e) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if ((tecla > 47 && tecla < 58) || (tecla >= 97 && tecla <= 122)
        || (tecla >= 65 && tecla <= 90))
        return true;
    else
        return false;
}
function antiSqlInjection(txt) {
    var txt2 = txt.replace(/^\s*|\s*$/g, "");
    var txt3 = txt2.toUpperCase();
    if (txt3 == "INSERT" || txt3 == "INTO" || txt3 == "SELECT"
        || txt3 == "WHERE" || txt3 == "UPDATE") {
        return false;
    }
    return true;
}

function setHighlight(element) {
    $(element).parent().removeClass('state-success').addClass('state-error');
}
function setUnhighlight(element) {
    $(element).parent().removeClass('state-error').addClass('state-success');

    if ($(element).hasClass('select2Element')) {
        $(element).parent().addClass('state-success');
    }
}

function interactiveButtons() {
    $(".btnAgregar").show(300);
    $(".btnAgregar").click(function () {
        $(".btn-registrar").show(200);
        $(".btnClose").show(200);
        $(".formSubmit").show(200);
        $(this).hide(200);
    });
    $(".btnClose").click(function () {
        $(".btnAgregar").show(200);
        $(".formSubmit").hide(200);
        $(".btn-registrar").hide(200);
        $(this).hide(200);
    });

}

function deleteRecord(id, urlAjax, dataAjax, dataTableList) {
    console.log("data :" + id)

    $
        .SmartMessageBox(
            {
                title: "&iexcl;Alerta!",
                content: "¿Esta seguro de eliminar este registro?",
                buttons: '[No][Si]'
            },
            function (ButtonPressed) {
                if (ButtonPressed === "Si") {
                    $
                        .ajax({
                            url: urlAjax,
                            data: "opc=delete&id=" + id + dataAjax,
                            type: "post",
                            success: function (objJson) {
                                objJson = JSON.parse(objJson);
                                var mensaje = objJson.message;
                                if (!objJson.status) {
                                    alert(objJson.mensaje);
                                    return;
                                } else {
                                    $.fn.dataTable
                                        .Api(dataTableList).ajax
                                        .reload();
                                    $
                                        .smallBox({
                                            title: "Se ha eliminado el registro con exito",
                                            content: "<i class='fa fa-clock-o'></i> <i>puede visualizar los cambios...</i>",
                                            color: "#296191",
                                            iconSmall: "fa fa-thumbs-up bounce animated",
                                            timeout: 6000
                                        });

                                }

                            }
                        });
                }

            });

}
var formData = '';
function submitForm(arg) {
    var callback = arg.success;
    var url = arg.url;
    var data = arg.data;
    var type = arg.type;
    var dataAditional = arg.aditionalData
    var ObjForm =arg.form;
    var dataTableList =arg.dataTableList;
    var resetForm =arg.resetForm;
    var id =arg.id;
    if (typeof ObjForm !=='undefined'){
        if (typeof opc === 'undefined') opc ='';
        if (typeof data === 'undefined') data = jsonSerialize(form);
        if (typeof type === 'undefined') type ='POST';
        //if (typeof id !== 'undefined') url = url+'/'+ encodeURIComponent(id);
        console.log("dataform :" + data);
        console.log(opc);
        console.log("aditionalData :" + dataAditional);
        /*if (!(formData == ObjForm.serialize())) {*/
            $.ajax({
                type: type,
                url: url,
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: 'json',
                success: function (objJson) {
                    if (objJson.message !== ''){
                        $.smallBox({
                            title: "Registrado!",
                            content: objJson.message,
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 6000
                        });
                    } else {
                        /*default message*/
                        $.smallBox({
                            title: "Registrado!",
                            content: "<i class='fa fa-clock-o'></i> <i>Se ha almacenado correctamente...</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 6000
                        });
                    }

                        callback(objJson);
                }
            });
       /* } else {
            $.bigBox({
                title: "Sin cambios!",
                content: "Debe ingresar valores diferentes a los actuales.",
                color: "#C46A69",
                icon: "fa fa-warning shake animated",
                number: "1",
                timeout: 6000
            });

        }*/
    }
}

function formResetValues(ObjForm) {
    ObjForm[0].reset();
    opc = "save"
}
function calcularEdad(fechaNacimiento) {
    /*Fecha innput */
    /* format 2016-12-11 yyyy-mm-dd*/
    if(fechaNacimiento!==''){
        var fechaActual = new Date();
        var diaActual = fechaActual.getDate();
        var mmActual = fechaActual.getMonth() + 1;
        var yyyyActual = fechaActual.getFullYear();
        var FechaNac = fechaNacimiento.split("/");
        var diaCumple = FechaNac[0];
        var mmCumple = FechaNac[1];
        var yyyyCumple = FechaNac[2];
        //retiramos el primer cero de la izquierda
        if (mmCumple.substr(0, 1) == 0) {
            mmCumple = mmCumple.substring(1, 2);
        }
        if (diaCumple.substr(0, 1) == 0) {
            diaCumple = diaCumple.substring(1, 2);
        }
        var edad = yyyyActual - yyyyCumple;
        if ((mmActual < mmCumple) || (mmActual == mmCumple && diaActual < diaCumple)) {
            edad--;
        }
        console.log("EDAD:" + edad);
        return edad;
    }  else{
        return 0;
    }
}

function showMessage(title,msg) {
    $.smallBox({
        title: title,
        //content: "<i class='fa fa-error'></i> <i>"+msg+"...</i>",
        content: msg,
        color: "#456b7b",
        iconSmall: "fa fa-danger fa-2x fadeInRight animated",
        timeout: 6000
    });
}
function showError() {
    $.smallBox({
        title: "Error",
        content: "<i class='fa fa-error'></i> <i>Error al mostrar componentes...</i>",
        color: "#921c19",
        iconSmall: "fa fa-danger fa-2x fadeInRight animated",
        timeout: 6000
    });
}
function removeItem(arg){
     var callfunction = arg.success;
     var url = arg.url;
     var data = arg.data;
     var type = arg.type;
     var id = arg.id;
        if (typeof type ==='undefined') type ='GET';
        if (typeof id !=='undefined') url =url+'/'+encodeURIComponent(id);
        $.ajax({
            url:url,
            type: type,
            data: data,
            success: function (objJson) {
                $.smallBox({
                    title: "Eliminado!",
                    content: "<i class='fa fa-clock-o'></i> <i>Se ha eliminado correctamente...</i>",
                    color: "#659265",
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 6000
                });
                if (typeof callfunction === 'function'){
                    callfunction(objJson);
                }
            }
        }).fail(function(jqXHR, textStatus) {
            showError();
        });
}
function get(arg){
    var callfunction = arg.success;
    var url = arg.url;
    var data = arg.datos;
    var type = arg.type;
    var id = arg.id;
    if (typeof name ==='undefined') name ='name';
    //if (typeof id !== 'undefined') url = url+ '/' + encodeURIComponent(id);
    if (typeof type ==='undefined') type ='GET';
    $.ajax({
        url:url,
        type: type,
        data:data,
        success:function (objJson) {
            if (typeof callfunction === "function") {
                callfunction(objJson);
            }
        }

    }).fail(function(jqXHR, textStatus) {
        showError();
    });

}
function getSelectItems(arg) {
    var callfunction = arg.success;
    var select = arg.select;
    var url = arg.url;
    var data = arg.datos;
    var chosen_select = arg.chosen_select;
    var type = arg.type;
    var id=arg.id;
    var name=arg.name;

    if (typeof name ==='undefined') name ='name';
    if (typeof id ==='undefined') id ='id';
    if (typeof type ==='undefined') type ='GET';

    var text_html = "";
    select.empty();
    select.removeClass("chosen-select");
    select.append("<option  value='' >Cargando...</option>");
    $.ajax({
        url:url,
        type: type,
        data:data,
        success:function (objJson) {
            select.empty();
            /* if(objJson.rpta === -1) {
             alert(objJson.mensaje);
             return;
             }*/
            var list = objJson;
            if (list.length > 0) {
                select.append("<option value=''>[Seleccione]</option>");
                if (chosen_select) {
                    for (var i = 0; i < list.length; i++) {
                        if (id == list[i][id]) {
                            text_html += "<option selected value='" + list[i][id]+ "'>" + list[i][name] + "</option>";
                        } else {
                            text_html += "<option value='" + list[i][id] + "'>"+ list[i][name] + "</option>";
                        }
                    }
                } else {
                    for (var i = 0; i < list.length; i++) {
                        text_html += "<option value='" + list[i][id] + "'>"+ list[i][name] + "</option>";
                    }
                }
            } else {
                select.append("<option value=''>[]</option>");
            }
            select.append(text_html);
            text_html = "";
            if (chosen_select) {
                select.addClass("chosen-select");
                $(".chosen-select").trigger("chosen:updated");
                var config = {
                    '.chosen-select': {
                        no_results_text: 'Oops, nada encontrado!',
                        allow_single_deselect: true
                    },
                    '.chosen-select-width': {
                        width: "95%"
                    }
                }
                for (var selector in config) {
                    $(selector).chosen(config[selector]);
                }
            }
            if (typeof callfunction === "function") {
                callfunction(list);
            }

        }
    }).fail(function(jqXHR, textStatus) {
        showError()
    });
    if (chosen_select) {
        /* sirve para validar cuando es required */
        $.validator.setDefaults({
            ignore: ":hidden:not(select)"
        })
    }
}

function list_select(callFunction, objSelect, url, datos, opc, id) {
    var text_html = "";
    objSelect.empty();
    objSelect.removeClass("chosen-select");
    objSelect.append("<option  value='' >Cargando...</option>");
    $.post(url, datos, function (objJson) {
        //objJson = JSON.parse(objJson);
        objSelect.empty();
        if (objJson.rpta === -1) {
            alert(objJson.mensaje);
            return;
        }
        var lista = objJson.lista;
        if (lista.length > 0) {
            objSelect.append("<option value=''>[Seleccione]</option>");
            if (opc === "1" | opc === "4") {
                for (var i = 0; i < lista.length; i++) {
                    if (id == lista[i].id) {
                        text_html += "<option selected value='" + lista[i].id
                            + "'>" + lista[i].nombre + "</option>";
                    } else {
                        text_html += "<option value='" + lista[i].id + "'>"
                            + lista[i].nombre + "</option>";
                    }
                }
            } else {
                for (var i = 0; i < lista.length; i++) {
                    text_html += "<option value='" + lista[i].id + "'>"
                        + lista[i].nombre + "</option>";
                }
            }
        } else {
            objSelect.append("<option value=''>[]</option>");
        }
        objSelect.append(text_html);
        text_html = "";
        if (opc === "3" | opc === "4") {
            objSelect.addClass("chosen-select");
            $(".chosen-select").trigger("chosen:updated");
            var config = {
                '.chosen-select': {
                    no_results_text: 'Oops, nada encontrado!',
                    allow_single_deselect: true
                },
                '.chosen-select-width': {
                    width: "95%"
                }
            }
            for (var selector in config) {
                $(selector).chosen(config[selector]);
            }
        }
        callFunction(lista);
    });
    if (opc === "3" | opc === "4") {
        /* sirve para validar cuando es required */
        $.validator.setDefaults({
            ignore: ":hidden:not(select)"
        })
    }

}
function list_selectJavaBeans(objSelect, url, datos, id_select, opcion_select,
                              opc, id) {
    var text_html = "";
    objSelect.empty();
    objSelect.removeClass("chosen-select");
    objSelect.append("<option  value='' >Cargando...</option>");
    $.post(url, datos, function (objJson) {
        objJson = JSON.parse(objJson);
        objSelect.empty();
        if (objJson.rpta == -1) {
            alert(objJson.mensaje);
            return;
        }
        var lista = objJson.data;
        if (lista.length > 0) {
            objSelect.append("<option value=''>[Seleccione]</option>");
            if (opc == "1" | opc == "4") {
                for (var i = 0; i < lista.length; i++) {
                    if (id == lista[i][id_select]) {
                        text_html += "<option selected value='"
                            + lista[i][id_select] + "'>"
                            + lista[i][opcion_select] + "</option>";
                    } else {
                        text_html += "<option value='" + lista[i][id_select]
                            + "'>" + lista[i][opcion_select] + "</option>";
                    }
                }
            } else {
                for (var i = 0; i < lista.length; i++) {
                    text_html += "<option value='" + lista[i][id_select] + "'>"
                        + lista[i][opcion_select] + "</option>";
                }
            }
        } else {
            objSelect.append("<option value=''>[NO DATA]</option>");
        }
        objSelect.append(text_html);
        text_html = "";
        if (opc == "3" | opc == "4") {
            objSelect.addClass("chosen-select");
            $(".chosen-select").trigger("chosen:updated");
            var config = {
                '.chosen-select': {
                    no_results_text: 'Oops, nada encontrado!',
                    allow_single_deselect: true
                },
                '.chosen-select-width': {
                    width: "95%"
                }
            }
            for (var selector in config) {
                $(selector).chosen(config[selector]);
            }
        }

    });
    if (opc == "3" | opc == "4") {
        /* sirve para validar cuando es required */
        $.validator.setDefaults({
            ignore: ":hidden:not(select)"
        });
    }

}