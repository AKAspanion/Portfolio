export default {
    methods: {
        textHover(event, end = false, _mobile = false) {
            if (!_mobile) {
                let _style = `translate3d(0px, 0px, 0px)`;
                let windowTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (!end) {
                    let targetPos = event.target.getBoundingClientRect();
                    let xThreshold =
                        1 -
                        (targetPos.x + targetPos.width - event.pageX) /
                        targetPos.width,
                        yThreshold =
                        1 -
                        (targetPos.y + windowTop + targetPos.height - event.pageY) /
                        targetPos.height;
                    _style = `translate3d(${Math.floor(
                    xThreshold * (targetPos.width / 4)
                )}px, ${Math.floor(
                    yThreshold * (targetPos.height / 2)
                )}px, 0px)`;
                }
                event.target.style.transform = _style;
            }
        },
        iconHover(e, _container, _main, _mobile = false) {
            if (!_mobile) {
                let windowTop =
                    document.documentElement.scrollTop || document.body.scrollTop;
                let mainDom = document.querySelector(_main);
                let containerDom = document.querySelector(_container);
                let targetPos = containerDom.getBoundingClientRect();
                let xPos = 0,
                    yPos = 0;
                if (
                    e.pageX >= targetPos.left &&
                    e.pageY - windowTop >= targetPos.top &&
                    e.pageX <= Math.floor(targetPos.left + targetPos.width) &&
                    e.pageY - windowTop <= Math.floor(targetPos.top + targetPos.height)
                ) {
                    xPos = e.pageX - targetPos.right + 40;
                    yPos = e.pageY - windowTop - targetPos.bottom + 40;
                }
                mainDom.style.transform = `translate3d(${xPos}px, ${yPos}px, 0px)`;
            }
        },
        isInViewport(e, padding = 48) {
            const scroll = window.scrollY || window.pageYOffset
            let el = document.querySelector(e);
            if (el) {
                const boundsTop = el.getBoundingClientRect().top + scroll
                const viewport = {
                    top: scroll,
                    bottom: scroll + window.innerHeight,
                }
                const bounds = {
                    top: boundsTop + padding,
                    bottom: boundsTop + el.clientHeight,
                }
                return (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
                    (bounds.top <= viewport.bottom && bounds.top >= viewport.top);
            } else {
                return false;
            }
        }
    }
};