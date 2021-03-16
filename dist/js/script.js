$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});

$(function () {
    $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
});



// NAVBAR THEME
const themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
};

const theme = localStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
        localStorage.setItem('theme', tmp),
        tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];

    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
};

(function () {
    // Init
    var container = document.getElementById("container"),
        inner = document.getElementById("inner");

    // Mouse
    var mouse = {
        _x: 0,
        _y: 0,
        x: 0,
        y: 0,
        updatePosition: function (event) {
            var e = event || window.event;
            this.x = e.clientX - this._x;
            this.y = (e.clientY - this._y) * -1;
        },
        setOrigin: function (e) {
            this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
            this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
        },
        show: function () {
            return "(" + this.x + ", " + this.y + ")";
        }
    };

    // Track the mouse position relative to the center of the container.
    mouse.setOrigin(container);

    //----------------------------------------------------

    var counter = 0;
    var refreshRate = 10;
    var isTimeToUpdate = function () {
        return counter++ % refreshRate === 0;
    };

    //----------------------------------------------------

    var onMouseEnterHandler = function (event) {
        update(event);
    };

    var onMouseLeaveHandler = function () {
        inner.style = "";
    };

    var onMouseMoveHandler = function (event) {
        if (isTimeToUpdate()) {
            update(event);
        }
    };

    //----------------------------------------------------

    var update = function (event) {
        mouse.updatePosition(event);
        console.log(mouse.x + " " + mouse.y);
        updateTransformStyle(
            (mouse.y / inner.offsetHeight / 2).toFixed(2),
            (mouse.x / inner.offsetWidth / 2).toFixed(2)
        );
    };

    var updateTransformStyle = function (x, y) {
        var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        inner.style.transform = style;
        inner.style.webkitTransform = style;
        inner.style.mozTranform = style;
        inner.style.msTransform = style;
        inner.style.oTransform = style;
    };

    //--------------------------------------------------------

    document.onmousemove = onMouseMoveHandler;
    document.onmouseleave = onMouseLeaveHandler;
    document.onmouseenter = onMouseEnterHandler;
})();
