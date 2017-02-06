$(document).ready(function () {
    $('#newsletter').submit(function () {
        var $this     = $(this),
            $response = $('#response'),
            $mail     = $('#signup-email'),
            testmail  = /^[^0-9][A-z0-9._%+-]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/,
            hasError  = false;

        $response.find('p').remove();

        if (!testmail.test($mail.val())) {
            $response.html('<p class="error">Please enter a valid email</p>');
            hasError = true;
        }

        if (hasError === false) {

            $response.html('<i class="fa fa-spinner fa-pulse fa-lg fa-fw"></i>');
            $response.find('p').remove();
            $response.addClass('loading');

            $.ajax({
                type: "POST",
                dataType: 'json',
                cache: false,
                url: $this.attr('action'),
                data: $this.serialize()
            }).done(function (data) {
                $response.removeClass('loading');
                $response.html('<p>'+data.message+'</p>');
            }).fail(function(data) {
                $response.removeClass('loading');
                console.log(data.responseText);
                $response.html('<p>An error occurred, please try again</p>');
            })
        }


        return false;
    });
});


function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

jQuery.fn.center = function() {
    var window2 = $(window).height();
    var width = $(window).width();
    var tile = $(".tile").height() + 100;
    var split = (window2 - tile) / 2;
    this.css("margin-top", split + "px");
    $(".twitter").css("top", split + "px");
    $(".ibg-bg").css("height", window2 + "px");
    $(".ibg-bg").css("width", width + "px");
    return this;
};


jQuery.fn.tileWrapper = function() {

    var twitter = $("#twitter").height();
    var updates = $("#updates").height();

    if (twitter > updates) {
        var height = twitter + 100;
    } else {
        var height = updates + 100;
    }
    $(this).css("min-height", height);
};
var deadline = new Date(Date.parse(new Date("2017-03-05T23:49:00")));
initializeClock('clockdiv', deadline);

$('.click').click(function() {
    window.location = "home.php";
});