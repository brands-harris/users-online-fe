const API_URL = 'http://obox.test/api';

const fetchUsersOnline = async () => {
    const resp = await fetch(`${API_URL}/get-online-users.php`)
        .then((r) => r.json())
        .catch((err) => onErr(err));
    if (resp.success) {
        const el = await fetch(`html/fragments/error.html`).then((r) => r.text());
        el.replace('{msg}', resp.message);
        document.getElementById('content').innerHTML = el;
    } else {
        onErr(resp.msg || 'An error has occurred');
    }
};
const renderUserEl = (data) => {
    //
};

const interval = setInterval(fetchUsersOnline, 3000);

const onErr = async (msg) => {
    clearInterval(interval);
    const el = await fetch(`/html/fragments/error.html`).then((r) => r.text());
    el.replace('{msg}', msg);
    document.getElementById('content').innerHTML = el;
};

fetchUsersOnline();
