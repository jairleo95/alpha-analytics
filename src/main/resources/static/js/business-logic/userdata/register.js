/**
 * Created by santjair on 3/25/2018.
 */

/*form variables*/
var form;
var endpoint = 'users';
var urlCrud = '';
var userRecords = $('.users-datatable');
var type ='POST';
var id = '';
var updateMode = false;

/*modal variables*/
var modalObject = $('.modal-users');
var modalBody = $(".areaModal");

function initFormUser() {
    form = $('.form-user-register');
    urlCrud = endpoint + '/' + encodeURIComponent(id)+ '/';
    console.log('enter to initFormUser');
    $('.birthDate').datepicker({
        locale: 'es',
        format: 'D/MM/YYYY',
        beforeShow: function() {
            setTimeout(function () {
                $('.ui-datepicker').css('z-index', 99999999999999);
            }, 0);
        }
    });
    form.bootstrapValidator({
        message: 'Este valor es inválido',
        framework: 'bootstrap',
        excluded: ':disabled',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }, fields: {
            fullName: {
                message: 'Ingrese sus nombres',
                validators: {
                    notEmpty: {
                        message: 'Los nombres son requeridos y no puede estar vacio'
                    },
                    stringLength: {
                        max: 50,
                        message: 'Los nombres no pueden tener mas de 50 caracteres.'
                    },
                    regexp: {
                        regexp: onlyLettersWithSpacesRegex,
                        message: 'Los nombres solo pueden contener letras'
                    }
                }
            },
            lastName: {
                message: 'Ingrese sus apellidos',
                validators: {
                    notEmpty: {
                        message: 'Los apellidos son requeridos y no puede estar vacio'
                    },
                    stringLength: {
                        max: 50,
                        message: 'Los apellidos no pueden tener mas de 50 caracteres.'
                    },
                    regexp: {
                        regexp: onlyLettersWithSpacesRegex,
                        message: 'Los Apellidos solo pueden contener letras'
                    }
                }
            },username:{
                message: 'Ingrese un nombre de usuario',
                validators: {
                    notEmpty:{
                        message: 'El nombre de usuario no puede estar vacio'
                    },
                    stringLength:{
                        min: 5,
                        max: 100,
                        message: 'El nombre de usuario debe tener mas de 5 y menos de 100 caracteres'
                    },
                    remote:{
                        url: 'users/validate',
                        data: function(validator) {
                            return {
                                isRegister: !updateMode
                            };
                        },
                        message: 'El nombre de usuario ya esta registrado'
                    },
                    regexp: {
                        regexp: usernameRegex,
                        message: 'Debe ingresar un nombre de usuario'
                    }
                }
            }
            ,email: {
                message: 'Ingrese un email',
                validators: {
                    notEmpty: {
                        message: 'El email no puede estar vacio'
                    },
                    stringLength: {
                        min: 6,
                        max: 50,
                        message: 'El email de usuario debe tener más de 6 y menos de 50 caracteres.'
                    },
                    regexp: {
                        regexp: emailRegex,
                        message: 'Debe ingresar un email'
                    }
                }
            }, password: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña no puede estar vacio'
                    },
                    stringLength: {
                        min: 8,
                        max: 20,
                        message: 'La contraseña de usuario debe tener más de 8 y menos de 20 caracteres'
                    },
                    regexp: {
                        regexp: strongPasswordRegex,
                        message: 'La contraseña debe tener letras (A-Z, a-z), por lo menos numeros (0-9) y por lo menos caracteres especiales (@&%”.).'
                    }
                    /* identical: {
                     field: 'confirmPassword',
                     message: 'The password and its confirm are not the same'
                     }*/
                }
            },
            confirmPassword: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña no puede estar vacio'
                    },
                    identical: {
                        field: 'password',
                        message: 'La contraseña y su confirmación no son los mismos'
                    }
                }
            },
            gender: {
                validators: {
                    notEmpty: {
                        message: 'El género es obligatorio.'
                    }
                }
            },
            cellphone: {
                validators: {
                    notEmpty: {
                        message: 'El número de contácto es obligatorio.'
                    }, callback: {
                        message: 'Ingrese el formtamo correcto, Ejemp: +51-0955250060',
                        callback: cellphoneRegexCallback
                    }
                }
            },
            documentType: {
                validators: {
                    notEmpty: {
                        message: 'Seleccione un tipo de documento'
                    }
                }
            },
            documentNumber: {
                validators: {
                    notEmpty: {
                        message: 'El número de documento es obligatorio.'
                    },
                    stringLength: {
                        min: 8,
                        max: function (value, validator, $field) {
                            var d = $('.documentType').val();
                            var x = (d === '1' ? 8 : 10);
                            return x;
                        }
                    },
                    callback: fvCallbackDocumentNumberByDocumentType
                }
            }, birthdate: {
                validators: {
                    notEmpty: {
                        message: 'La fecha de nacimiento es obligatorio.'
                    }, date: {
                        format: 'DD/MM/YYYY',
                        message: 'The date is not a valid'
                    }/*,
                    callback: {
                        message: 'Su edad es menor a 18 años',
                        callback: function (data) {
                            var age = calcularEdad(data);
                            return (age < 18 ? false : true);
                        }
                    }*/
                }
            }

        }
    }).on('success.validator.bv', function (e, data) {
        //console.log(data.result.message)

        /*   form.data('bootstrapValidator').updateMessage('cellphone', 'notEmpty', 'el celular no puede ser null')
         */
        /*example*/
        /* if (data.field === 'birthdate' && data.validator === 'date' && data.result.date) {
         console.log('::enter to succes.validator')
         console.log(data.validator)
         // The eventDate field passes the date validator
         // We can get the current date as a Javascript Date object
         var currentDate = data.result.date,
         day         = currentDate.getDay();

         // If the selected date is Sunday
         if (day === 0) {
         // Treat the field as invalid
         data.fv
         .updateStatus(data.field, data.fv.STATUS_INVALID, data.validator)
         .updateMessage(data.field, data.validator, 'Please choose a day except Sunday');
         } else {
         // Reset the message
         data.fv.updateMessage(data.field, data.validator, 'The date is not valid');
         }
         }*/
    }).on('success.form.bv', function (e) {
        /* do submitting with ajax*/
        e.preventDefault();
        save();
    });
    $('.birthDate').on('dp.change dp.show', function (e) {
        // Revalidate the date when user change it
        form.bootstrapValidator('revalidateField', $('.birthDate'));
    });
}
function save(){
    var data = jsonSerialize(form);
    data.birthdate = new Date(data.birthdate).toISOString();
    submitForm({form: form,url: urlCrud, data:data, id:id, type:type, success:function () {
        resetFormUser();
        reloadRegisters();
    }});
}
function initTable() {
    var responsiveHelper_dt_basic = undefined;
    var breakpointDefinition = {
        tablet: 1024,
        phone: 480
    };
    userRecords.DataTable({
        "ajax": {
            "url": endpoint+'/', "type": "GET",'dataSrc': ''
        },
        "columns": [
            {
                "orderable": false,
                "data": null,
                "defaultContent": ""
            },
            {
                "data": function (data) {
                            return data.fullName + " " + data.lastName;
                        }
            },
            {"data": "username"},
            {'data':'email'},
            {'data':'cellphone'},
          /*  {'data':'birthdate'},*/
            {
                "orderable": false,
                "data": null,
                "defaultContent": ""
            }
        ],
        "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
        "t" +
        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
        "autoWidth": true,
        "preDrawCallback": function () {
            // Initialize the responsive datatables helper once.
            if (!responsiveHelper_dt_basic) {
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('.users-datatable'), breakpointDefinition);
            }
        },
        "rowCallback": function (row, data, index) {
            responsiveHelper_dt_basic.createExpandIcon(row);
            console.log(":enter to rowCallback");
            $('td:eq(0)', row).html(index+1);

            var htmlTD = '';
            htmlTD += '<div class="btn-group">'
                + '<button class="btn btn-primary dropdown-toggle bounceIn animated" data-toggle="dropdown">'
                + '<i class="fa fa-gear fa-lg"></i>'
                + '</button>'
                + ' <ul class="dropdown-menu">';
            htmlTD += '   <li>'
                + '<a href="javascript:void(0);" data-id="'+data.id+'" class="btn-update"><i class="fa fa-pencil"></i> Editar</a>'
                + '<a href="javascript:void(0);" data-id="'+data.id+'" class="btn-remove"><i class="fa fa-trash"></i> Delete</a>'
                + '<a href="javascript:void(0);" data-id="'+data.id+'" class="btn-password"><i class="fa fa-lock"></i> Password</a>'
                + '</li>';
            htmlTD += ' </ul>'
                + '</div>';
            $('td:eq(5)', row).html(htmlTD);
        },
        "drawCallback": function (oSettings) {
            responsiveHelper_dt_basic.respond();
            $('.btn-update').click(function () {
                id = $(this).data('id');
                showUser(id);
            });
            $('.btn-remove').click(function () {
                id = $(this).data('id');

                $('.dialog_simple').dialog('open');
                return false;
            });
            $('.users-datatable tbody tr td').dblclick(function () {
                var id = $(this).parent().find('.btn-update').data('id');
                showUser(id)
            });
            $('.btn-password').click(function () {
                id = $(this).data('id');
                initModal('Change password');
                modalBody.load('change-pwd', function () {
                    initFormPWDChange();
                });
            });
        }
    });
}
function initFormPWDChange(){
    form = $('.form-change-password');
    type = 'PUT';
    urlCrud = endpoint + '/'+ encodeURIComponent(id)+ '/pwd/' ;
    form.bootstrapValidator({
     message:'This values is invalid',
        framework:'bootstrap',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },fields:{
            userPassword: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña no puede estar vacio'
                    },
                    stringLength: {
                        min: 8,
                        max: 20,
                        message: 'La contraseña de usuario debe tener más de 8 y menos de 20 caracteres'
                    },
                    regexp: {
                        regexp: strongPasswordRegex,
                        message: 'La contraseña debe tener letras (A-Z, a-z), por lo menos numeros (0-9) y por lo menos caracteres especiales (@&%”.).'
                    }
                }
            },
            confirmPassword: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña no puede estar vacio'
                    },
                    identical: {
                        field: 'password',
                        message: 'La contraseña y su confirmación no son los mismos'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        /* do submitting with ajax*/
        e.preventDefault();
        changePWD();
    });
};

function changePWD(){
    console.log('*** Enter to changePWD function');
    var data = jsonSerialize(form);
    console.log('submitForm[form:'+form+', url:'+urlCrud+', data:'+data+', type:'+type)+']';
    submitForm({form: form,url: urlCrud, data:data, id:id, type:type,success: function () {
        //resetFormUser();
        resetFormPWD();
        //alert('modificado!')
    }});
}
function resetFormPWD(){
    updateMode = false;
    type = 'POST';
    id ='';
    form.bootstrapValidator('resetForm',true);
    modalObject.modal('toggle');
}
function initModal(title){
    modalObject.modal({keyboard: false, backdrop: 'static'});
    modalObject.modal('show');
    $('.modal-title').text(title);
    $('.close-form').click(function () {
        console.log('closing modal...');
        urlCrud = '';
    });
}
function showUser(){
    initModal('Edit User');
    modalBody.load('form-user', function () {
        initFormUser();
        console.log('user:'+id);
        get({url:urlCrud, id:id, success:function(x){
            prepareForUpdate(x);
        }});
    });
}
function reloadRegisters() {
    $.fn.dataTable.Api(userRecords).ajax.reload();
}
function resetFormUser(){
    updateMode = false;
    type = 'POST';
    id ='';
    urlCrud = '';
    var password = $('[name="password"]');
    var confirmPassword= $('[name="confirmPassword"]');
        password.parent().parent().show();
        confirmPassword.parent().parent().show();
        $('.btn-cancel').remove();
        form.bootstrapValidator('addField', password);
        form.bootstrapValidator('addField', confirmPassword);
        form.bootstrapValidator('resetForm',true);
}
function prepareForUpdate(x){
    //resetFormUser();
    /*setting data to form*/
    var actionButtons =$('.action-buttons');
    var fullName = $('[name="fullName"]');
    var lastName = $('[name="lastName"]');
    var username = $('[name="username"]');
    var email = $('[name="email"]');
    var password = $('[name="password"]');
    var confirmPassword= $('[name="confirmPassword"]');
    var gender = $('input[name=gender]');
    var documentType = $('select[name=documentType]');
    var documentNumber = $('input[name=documentNumber]');
    var cellphone = $('[name="cellphone"]');
    var birthdate = $('[name="birthdate"]');
    fullName.val(x.fullName);
    lastName.val(x.lastName);
    username.val(x.username);
    email.val(x.email);
    //password.val(x.password);
    //gender.val(x.gender);
    documentType.val(x.documentType);
    documentNumber.val(x.documentNumber);
    cellphone.val(x.cellphone);
    birthdate.val(x.birthdate);
    //console.log('date:'+new Date(x.birthdate));
    birthdate.datepicker("setDate",new Date(x.birthdate));
    //edit mode
    password.parent().parent().hide();
    confirmPassword.parent().parent().hide();
    actionButtons.append('<button class="btn btn-default btn-cancel pull-left" type="button">Cancel</button>');
    actionButtons.find('.btn-submit').text('Update');
    $('.radio_gender_'+x.gender).prop('checked',true);

    /*removing pwd field validator*/
    form.bootstrapValidator('removeField', password);
    form.bootstrapValidator('removeField', confirmPassword);

    /*settings variables*/
    updateMode = true;
    type = 'PUT';
    //id = x.id;
    urlCrud = endpoint + '/'+id+'/';

    /*eventse*/
    $('.btn-cancel').click(function () {
        resetFormUser();
    });
}
function initEvents() {
    /*
     * CONVERT DIALOG TITLE TO HTML
     * REF: http://stackoverflow.com/questions/14488774/using-html-in-a-dialogs-title-in-jquery-ui-1-10
     */
    $.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
        _title : function(title) {
            if (!this.options.title) {
                title.html("&#160;");
            } else {
                title.html(this.options.title);
            }
        }
    }));
    $('.btn-create').click(function () {
        initModal(' Create User');
        modalBody.load('form-user', function () {
            initFormUser();
        });
    });
    $('.dialog_simple').dialog({
        autoOpen : false,
        width : 300,
        resizable : false,
        modal : true,
        title : "<div class='widget-header'><h4><i class='fa fa-warning'></i> Delete this item?</h4></div>",
        buttons : [{
            html : "<i class='fa fa-trash-o'></i>&nbsp; Delete",
            "class" : "btn btn-danger",
            click : function() {
                var obj =$(this);
                console.log('user:'+id);
                removeItem({url:urlCrud,id:id, type:'DELETE',success: function (x) {
                    obj.dialog("close");
                    console.log(x);
                    reloadRegisters();

                }})
            }
        }, {
            html : "<i class='fa fa-times'></i>&nbsp; Cancel",
            "class" : "btn btn-default",
            click : function() {
                $(this).dialog("close");
            }
        }]
    });
}

var pagefunction = function () {
    pageSetUp();
        initTable();
        initEvents();
};
loadScript('../js/plugin/datatables/jquery.dataTables.min.js',function () {
    loadScript('../js/plugin/datatables/dataTables.colVis.min.js',function () {
        loadScript('../js/plugin/datatables/dataTables.tableTools.min.js',function () {
            loadScript('../js/plugin/datatables/dataTables.bootstrap.min.js',function () {
                loadScript('../js/plugin/datatable-responsive/datatables.responsive.min.js',function () {
                    loadScript("../js/jsForm/jsForm.js", pagefunction);
                });
            });
        });
    }); 
});
