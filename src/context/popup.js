const openPopup = (url, target, w, h, callback) => {
    const left = (window.screen.width / 2) - (w / 2);
    const top = (window.screen.height / 2) - (h / 2);
    const winObj = window.open(
        url,
        target,
        'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, ' +
        'copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    const loop = setInterval(function () {
        if (winObj.closed) {
            clearInterval(loop);
            callback();
        }
    }, 1000);
};

export {
    openPopup
};
