function openWindow() {
    const clientID = '1133493423650865'
    const scopes = ['user_profile', 'user_media']

    window.open(`https://api.instagram.com/oauth/authorize?client_id=${clientID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(',')}&response_type=code`)
}

$(document).ready(() => {
    $.ajax({
        url: `${window.location.origin}/instagram_user`,
    })
        .done(function (data) {
            console.log(data)
            $('#instagram').html(`
            <h3>Instagram ID: ${data.id}</h3>
            <h3>Instagram username: ${data.username}</h3>
            `);

        })
        .fail(function() {
            $('#instagram').html('<button onclick="openWindow()" type="button" class="btn btn-dark">Instagram</button>');
        })
});