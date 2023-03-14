const API_URL = 'http://obox.test/api';

const fetchUsersOnline = async () => {
    const resp = await fetch(`${API_URL}/get-online-users.php`)
        .then((r) => r.json())
        .catch((err) => onErr(err));
    if (resp.success) {
        onSuccess(resp.data);
    } else {
        onErr(resp.msg || 'An error has occurred');
    }
};

const onSuccess = async (data) => {
    let layoutEl = await fetch(`/html/fragments/users.html`).then((r) => r.text());
    layoutEl = layoutEl.replace(/{usersOnline}/g, data.length);
    const userEl = [];
    data.forEach((item) => {
        //TODO: finish element
        const str = `<div class='g-col-4 d-flex flex-column'><p>Name : ${item.name}</p></div>`;
        userEl.push(str);
    });
    layoutEl = layoutEl.replace(/{content}/g, userEl.join(''));
    document.getElementById('content').innerHTML = layoutEl;
};

const onErr = async (msg) => {
    clearInterval(interval);
    let el = await fetch(`/html/fragments/error.html`).then((r) => r.text());
    el.replace('{msg}', msg);
    document.getElementById('content').innerHTML = el;
};

const interval = setInterval(fetchUsersOnline, 3000);

fetchUsersOnline();
