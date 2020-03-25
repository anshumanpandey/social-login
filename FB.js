
window.fbAsyncInit = function () {
    FB.init({
        appId: '541432119845295',
        cookie: true,
        xfbml: true,
        version: 'v6.0'
    });

    FB.AppEvents.logPageView();

    FB.getLoginStatus(function (response) {
        onFBsucceed(response);
    });

};

function onFBsucceed(response) {
    const FBStatus = $('#FBStatus')
    FBStatus.text(`Your facebook status is <code>${response.status}</code>. Login!`);
    if (response.status === 'connected') {
        FB.api('/me', function (response) {
            console.log(response);
            $(`<h5>Welcome ${response.name}</h5>`).appendTo('#facebook')
            $(`<h5>Your FB ID is ${response.id}</h5>`).appendTo('#facebook')
        });
    }
}

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));