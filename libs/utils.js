export function toPage(url) {
    if (navigator.userAgent.includes('TelegramXAPP')) {
        android.startNewActivity(true, `${window.location.host}/#${url}`);
    } else {
        uni.navigateTo({
            url: url
        });
    }
}