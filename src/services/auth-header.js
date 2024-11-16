

const authHerder = () => {
    let admin = JSON.parse(sessionStorage.getItem('admin'));

    if (admin && admin.token) {
        return { Authorization: `Bearer ${admin.token}` };
    } else {
        return {};
    }
}

export default authHerder;
