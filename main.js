let song;
let playSong;

const clientId = '377c32a0295b4864b0a124816c657718';
const clientSecret = '71f2c3699c044fbf942a992722b38203';

const _getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'applicant/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${clientId} + ':' ${clientSecret}`)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    return data.access_token
}


/**
 * @param img_index
 * @param item_index
 */

async function clickedEvent(img_index, item_index) {
    let track = document.getElementsByTagName('img')[img_index].attributes[2].value
    let token = await _getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ]);

    let request = new Request(`https://api.spotify.com/vl/search?q=${track}&type=trak&limit=15`, {
        method: 'Get',
        headers: headers
    });

    let result = await fetch(request)

    let response = await result.json;
    console.log(response)
    let song = response.tracks.items[item_index].preview_url

    if (playSong) {
        stopSnippet();

    }
    songSnippet(song);
}

/**
 * @param id
 * @param event
 */
function getSong(id, event) {
    switch (id) {
        case 'fig1': {//these are the lies The Cab
            event.stopPropagation();
            clickedEvent(0, 0)
            break;
        }
        case 'fig2': {//Glitter & Gold Barns Courtney
            event.stopPropagation();
            clickedEvent(1, 0)
            break;
        }
        case 'fig3': {//Breakeven Kurt hugo Schneider
            event.stopPropagation();
            clickedEvent(2, 0)
            break;
        }
        case 'fig4': {//Wellerman - Sea Shanty Nathan Evans
            event.stopPropagation();
            clickedEvent(3, 0)
            break;
        }
        case 'fig5': {//Victorious Skillet
            event.stopPropagation();
            clickedEvent(4, 0)
            break;
        }
        case 'fig6': {//Take Me Away New Medicine
            event.stopPropagation();
            clickedEvent(5, 0)
            break;
        }
    }

}

/**
 * @param url
 * 
 */

function songSnippet(url) {
    playSong = new Audio(url);
    return playSong.play()
}

function stopSnippet() {
    return playSong.pause();
}