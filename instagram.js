function openWindow() {
    const clientID = '1133493423650865'
    const redirect_uri = `https://127.0.0.1:8050/instagram`
    const scopes = ['user_profile', 'user_media']

    window.open(`https://api.instagram.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirect_uri}&scope=${scopes.join(',')}&response_type=code`)
}

$(document).ready(() => {
    $.ajax({
        url: "https://127.0.0.1:8050/instagram_user",
    })
        .done(function (data) {
            console.log(data)
            if (console && console.log) {
                console.log("Sample of data:", data.slice(0, 100));
            }
        })
        .fail(function() {
            $('<button onclick="openWindow()" type="button" class="btn btn-dark">Instagram</button>').appendTo('#instagram');
        })
});