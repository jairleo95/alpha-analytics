var opc = "save";
	var dataAditional = "";
	var formData = "";
	var fieldUniqueSave = "fieldUniqueSave";
	var idRow = "";
	var urlCrudForm = "../usuario/executeCrudUsuario.htm";
	// PAGE RELATED SCRIPTS
	var responsiveHelper_dt_basic = undefined;
	var responsiveHelper_datatable_fixed_column = undefined;
	var responsiveHelper_datatable_col_reorder = undefined;
	var responsiveHelper_datatable_tabletools = undefined;

	var breakpointDefinition = {
		tablet : 1024,
		phone : 480
	};

	function loadFormUsuario() {
		$("#from").datepicker({
			defaultDate : "+1w",
			changeMonth : true,
			numberOfMonths : 3,
			prevText : '<i class="fa fa-chevron-left"></i>',
			nextText : '<i class="fa fa-chevron-right"></i>',
			dateFormat : 'dd/mm/yy',
			onClose : function(selectedDate) {
				$("#to").datepicker("option", "minDate", selectedDate);
			}

		});
		$("#to").datepicker({
			defaultDate : "+1w",
			changeMonth : true,
			numberOfMonths : 3,
			prevText : '<i class="fa fa-chevron-left"></i>',
			nextText : '<i class="fa fa-chevron-right"></i>',
			dateFormat : 'dd/mm/yy',
			onClose : function(selectedDate) {
				$("#from").datepicker("option", "maxDate", selectedDate);
			}
		});
		function listPersona() {
			$.ajax({
				url : "../usuario/executeCrudUsuario.htm",
				data : "opc=listPersona",
				type : "POST",
				success : function(objJson) {
					var select = $(".persona");
					objJson = JSON.parse(objJson);
					select.empty();
					if (objJson.rpta === -1) {
						alert(objJson.mensaje);
						return;
					}
					var lista = objJson.data;

					var textHtml = '';
					select.append("<option value=''>[Seleccione]</option>");
					for (var t = 0; t < lista.length; t++) {
						textHtml += '<option value="'+lista[t].idPersona+'">'
								+ lista[t].descNombre + ' '
								+ lista[t].apePaterno + ' '
								+ lista[t].apeMaterno + '</option>';
					}
					select.append(textHtml);
					select.select2();
				}
			});
		}

		listPersona();

		var table1 = $('#dt_basic')
				.DataTable(
						{
							"ajax" : {
								"url" : "../usuario/executeCrudUsuario.htm",
								"type" : "POST",
								"dataSrc" : "data",
								"data" : {
									"opc" : "Listar"
								}
							},
							"columns" : [ {
								"data" : "personaBean.idPersona"
							}, {
								"data" : "nombres"
							}, {
								"data" : "varUsuario"
							}, {
								"data" : "varClave",
								"defaultContent" : ""
							}, {
								"data" : "fecInicio"
							}, {
								"data" : "fecFin"
							}, {

								"orderable" : false,
								"data" : null,
								"defaultContent" : ""
							} ],
							"sDom" : "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>"
									+ "t"
									+ "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
							"oLanguage" : {
								"sSearch" : '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
							},
							"autoWidth" : true,
							"preDrawCallback" : function() {
								// Initialize the responsive datatables helper once.
								if (!responsiveHelper_dt_basic) {
									responsiveHelper_dt_basic = new ResponsiveDatatablesHelper(
											$('#dt_basic'),
											breakpointDefinition);
								}
							},
							"rowCallback" : function(row, data, index) {
								responsiveHelper_dt_basic.createExpandIcon(row);
								$('td:eq(0)', row).html(index + 1);
								console.log(data.personaBean.idPersona);
								$('td:eq(6)', row)
										.html(
												'<button class="btn btn-success btn-xs btnEditar" value="' + data.personaBean.idPersona+ '" ><i class="fa fa-pencil" ></i></button> '
														+ '<button class="btn btn-danger btn-xs btnEliminar" value="' + data.personaBean.idPersona  + '" ><i class="fa fa-times"></i></button>');

							},
							"drawCallback" : function(oSettings) {
								responsiveHelper_dt_basic.respond();
								// var api = this.api();
								console.log("Enter to drawCallBack")
								$(".btnEditar")
										.click(
												function() {
													var id = $(this).val();
													idRow = $(this).val();
													console.log("idEdit : "
															+ idRow)
													opc = "findById";
													$
															.ajax({
																url : "../usuario/executeCrudUsuario.htm",
																data : "opc="
																		+ opc
																		+ "&id="
																		+ id,
																type : "POST",
																success : function(
																		objJson) {
																	objJson = JSON
																			.parse(objJson);
																	var mensaje = objJson.message;
																	var item = objJson.showItem;
																	$(
																			".persona, .select2")
																			.hide();
																	$(
																			".persona")
																			.attr(
																					"disabled",
																					true);
																	$(
																			".personaReadOnly")
																			.show(
																					200);
																	$(
																			".personaReadOnly")
																			.empty();
																	$(
																			".personaReadOnly")
																			.append(
																					"<option>"
																							+ item["nombres"]
																							+ "</option>");
																	$(".user")
																			.val(
																					item["varUsuario"]);
																	$('#from')
																			.datepicker(
																					'setDate',
																					item["fecInicio"]);
																	$('#to')
																			.datepicker(
																					'setDate',
																					item["fecFin"]);
																	formData = $(
																			".formSubmit")
																			.serialize();
																	$(
																			".btnAgregar")
																			.click();
																	opc = "edit";
																	dataAditional = "&id="
																			+ id;
																	fieldUniqueSave = "fieldUniqueEdit";
																}
															});
												});
								$(".btnEliminar")
										.click(
												function() {
													idRow = $(this).val();
													console.log("idEdit : "
															+ idRow)
													deleteRecord(
															idRow,
															"../usuario/executeCrudUsuario.htm",
															"", $("#dt_basic"));

													listPersona()
												});
							}
						});
		$('.persona').change(function() {
			$(this).valid();
		});

		function resetForm() {
			$(".select2").show(200);
			$(".persona").removeAttr("disabled");
			$(".personaReadOnly").hide();
			listPersona();
		}

	}

	function loadDatatableUsuario() {

		$('.formSubmit').validate(
				{
					// Rules for form validation
					rules : {
						user : {
							required : true,
							regex : usernameRegex,
							userUnique : true
						},
						password : {
							required : true,
							minlength : 6,
							maxlength : 20,
							regex : passwordStrengthRegex
						},
						passwordConfirm : {
							required : true,
							minlength : 6,
							maxlength : 20,
							equalTo : '#password',
							regex : passwordStrengthRegex
						},
						fin : {
							required : true
						},
						inicio : {
							required : true
						}
					},
					ignore : '',
					messages : {
						descripcion : "Ingrese una descripcion del producto",
						modelo : "Ingrese un modelo",
						codigoArticulo : {
							required : "Ingrese un código"
						},
						user : {
							required : "Seleccione una persona.",
						}
					},
					success : "valid",
					submitHandler : function() {

						saveFormAjax($('.formSubmit'),
								"../usuario/executeCrudUsuario.htm",
								dataAditional, $("#dt_basic"), resetForm);
					},
					highlight : function(element, errorClass) {
						setHighlight(element)

					},
					unhighlight : function(element, errorClass) {
						setUnhighlight(element)
					},
					errorPlacement : function(error, element) {
						if (element.parent('.input-group').length) {
							error.insertAfter(element.parent()); // radio/checkbox?
						} else if (element.hasClass('persona')) {
							error.insertAfter(element.next('span')); // select2
						} else {
							error.insertAfter(element); // default
						}
					}
				});
		$.validator.addMethod("regex", function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		}, "Please check your input.");
		jQuery.validator.addMethod("userUnique", function(value, element) {
			console.log(" row :" + idRow);
			return this.optional(element)
					|| validateFieldUnique(value, urlCrudForm, fieldUniqueSave,
							"&id=" + idRow);
		}, "Valor ya existe!");

		$(".btn-registrar").click(function() {
			$(".formSubmit").submit();
		});

	}