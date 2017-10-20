// TODO: Move to observor patteren. This is a quick hack.
MOCK = true;

if (MOCK) {
    BASE_URL = 'http://localhost';
    VIDEO_URL = BASE_URL + ':8000/static/img.jpg';
}
else {
    BASE_URL = 'http://192.168.1.80';
    VIDEO_URL = BASE_URL + ':8080/?action=stream';
}
module.exports = {
    BASE_URL: BASE_URL,
    VIDEO_URL: VIDEO_URL,
    ML_URL: 'http://192.168.56.101',
    CUSTOM_EVENT: {},
};
