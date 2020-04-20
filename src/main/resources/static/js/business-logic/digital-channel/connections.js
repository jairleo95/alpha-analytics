/**
 * Created by santjair on 3/26/2018.
 */
/*form variables*/
var form;
var endpoint = 'channels/access';
var urlCrud = '';
var type ='POST';
var id = '';
var updateMode = false;

/*buttons*/
var fbButton = $('.btn-add-fb');
var gaButton = $('.btn-add-ga');
var ytButton = $('.btn-add-yt');

/*columns*/
var fbCol = $('.fb-column');
var gaCol = $('.ga-column');
var ytCol = $('.yt-column');
/*form section*/
var settingsCol = $('.access-settings');
var cancelBtn = $('.btn-cancel-settings');

/*add and remove classes*/
var originalPos ='col-lg-4 col-sm-6';
var centerPos= 'col-lg-8 col-sm-12 col-lg-offset-2';

const social = {
    FACEBOOK: 'FB',
    YOUTUBE: 'YT',
    TWITTER: 'TW',
    GOOGLE_ANALYTICS: 'GA'
}
var socialType;

function initForm() {
    form =  $('.form-access-settings');
    console.log('***Enter to initFormUser() function***');
    urlCrud = endpoint + '/';
       form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            pageId: {
                validators: {
                    notEmpty: {
                        message: 'Page ID is required.'
                    },
                    stringLength: {
                        max: 225,
                        message: 'The pagId must be less than 225 characters long'

                    }
                }
            },
            appId: {
                validators: {
                    notEmpty: {
                        message: 'App ID is required.'
                    },
                    stringLength: {
                        max: 225,
                        message: 'The App Id must be less than 225 characters long'

                    }
                }
            },
            appSecret: {
                validators: {
                    notEmpty: {
                        message: 'App Key Secret is required.'
                    },
                    stringLength: {
                        max: 225,
                        message: 'The App Key Secret must be less than 225 characters long'
                    }
                }
            },
            address: {
                validators: {
                    notEmpty: {
                        message: 'API Address is required.'
                    },
                    stringLength: {
                        max: 225,
                        message: 'The API Address must be less than 225 characters long'
                    }
                }
            }

        }
    }).on('success.form.bv', function (e) {
        /* do submitting with ajax*/
        e.preventDefault();
        save();
    });
}
function save(){
    console.log('***Enter to save() function***');
    var data = jsonSerialize(form);
    data["digitalChannel"] = {};
    data["digitalChannel"]['id'] = id;
    console.log('[save] data:');
    console.log(data);
    console.log('[save] updateMode flag:'+updateMode);
    console.log('[save] id:'+id);

    submitForm({form: form,url: urlCrud, data:data, id:id, type:type, success:function () {
        if (updateMode){
            //showDetails()
            //reloadRegisters()
        }else {
            //resetFormUser();
            //reloadRegisters();
        }
    }});

}
function initFBButton(status) {
    //if (status) {
    if (true) {
        //$(".fbButton").removeAttr("disabled");
        $(".fbButton").click(function () {
            doLogin();
        });
    } else {
        //$(".fbButton").removeAttr("disabled");
        $(".fbButton").click(function () {
            checkLoginState();
        });
    }
}
function doLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            statusChangeCallback(response);
            FB.api('/me', function (response) {
                console.log('Good to see you, ' + response.name + '.');
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'email,public_profile'});
}
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // console.log("user token: " + response.authResponse.accessToken);
    if (response.status === 'connected') {
        initFBButton(true);
        // $("#status").append('user token: ' + response.authResponse.accessToken + '<br>');
        $('.stringToken').val(response.authResponse.accessToken);
        $('.expirationDate').text(response.authResponse.expiresIn);
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook...';
        initFBButton(true);
    }
}
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}
function testAPI() {
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        showMessage('Message','Thanks for logging in, ' + response.name + '!');
    });
}
function resetDOM(){
    fbCol.show();
    ytCol.show();
    gaCol.show();
    fbButton.parent().show();
    gaButton.parent().show();
    ytButton.parent().show();
    fbCol.removeClass(centerPos).addClass(originalPos);
    ytCol.removeClass(centerPos).addClass(originalPos);
    gaCol.removeClass(centerPos).addClass(originalPos);
    settingsCol.hide();
    form.bootstrapValidator("resetForm",true);
}
function initEvents(){
    fbButton.click(function () {
        //clean form
        socialType = social.FACEBOOK;
       ytCol.hide();
       gaCol.hide();
       settingsCol.show();
       fbButton.parent().hide();
       fbCol.removeClass(originalPos).addClass(centerPos);
       settingsCol.removeClass(originalPos).addClass(centerPos);
       //id = 1;
       id = 'M42s7VMt3rg=';

    });
    gaButton.click(function () {
        socialType = social.GOOGLE_ANALYTICS;
        fbCol.hide();
        ytCol.hide();
        gaButton.parent().hide();
        settingsCol.show();
        gaCol.removeClass(originalPos).addClass(centerPos);
        settingsCol.removeClass(originalPos).addClass(centerPos);

    });
    ytButton.click(function () {
        socialType = social.YOUTUBE;
        fbCol.hide();
        gaCol.hide();
        settingsCol.show();
        ytButton.parent().hide();
        ytCol.removeClass(originalPos).addClass(centerPos);
        settingsCol.removeClass(originalPos).addClass(centerPos);
        id = 'vau8W9ja0pI=';
        //id = 2;
    });
    cancelBtn.click(function () {
        socialType = '';
       resetDOM();
    });
}
function initFBAPI(){
     window.fbAsyncInit = function () {
        FB.init({
            appId: '1681043245552069',
            cookie: true, // enable cookies to allow the server to access
            // the session
            xfbml: true, // parse social plugins on this page
            version: 'v2.5' // use graph api version 2.5
        });
        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.
       /* FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });*/
    };
    // Load the SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    $(".fbButton").click(function () {
        if (socialType === social.FACEBOOK){
            doLogin();
        }else if (socialType === social.GOOGLE_ANALYTICS) {
            console.log('click to google analytics');
        } else if (socialType === social.YOUTUBE){
            console.log('click to youtube analytics');
        }else {
            console.log('social not found');
        }

    });
}
function getConnections(){
    urlCrud = endpoint + '/';
    //get for facebook
    //id = 'M42s7VMt3rg=';
    get({url:urlCrud,id:'M42s7VMt3rg=', success:function(x){
        console.log('getConnections().get().success');
        console.log(x);
        console.log('Iterate connections...');
        var html = '';
        for (var cnn in x ){
            console.log('item:'+x[cnn].address);
                html  += '<div class="well well-light">'
               // +'<button class="btn btn-default btn-circle btn-lg btn-add-fb" type="button"><i class="glyphicon glyphicon-plus"></i></button>'
                +'<label> Address: '+x[cnn].address+'</label><br>'
                +'<label> AppID: '+x[cnn].appId+'</label>'
                //+'<label> Creation Date: '+x[cnn].appId+'</label>'
                +'</div>';
        }
        $('.fb-column').append(html);
    }})
    //get for youtube

    //get for google analytics
}

var pagefunction = function () {
    pageSetUp();
        initEvents();
        initForm();
        initFBAPI();
        getConnections();
};
loadScript('../js/jsForm/jsForm.js', function () {
    loadScript('../js/plugin/bootstrapvalidator/bootstrapValidator.min.js', pagefunction);
});