'use strict';

angular.module('myApp.earth', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/earth', {
            templateUrl: 'earth/earth.html',
            controller: 'EarthCtrl'
        });
    }])

    .controller('EarthCtrl', ['$scope', 'chronosjsCourierSupervisor', function ($scope, chronosjsCourierSupervisor) {
        createHomers(chronosjsCourierSupervisor);

        function getAngle(el) {
            var st = window.getComputedStyle(el, null);
            var tr = st.getPropertyValue("-webkit-transform") ||
                st.getPropertyValue("-moz-transform") ||
                st.getPropertyValue("-ms-transform") ||
                st.getPropertyValue("-o-transform") ||
                st.getPropertyValue("transform");


            var values = tr.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var c = values[2];
            var d = values[3];

            var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

            if (angle < 0) {
                angle = 360 + angle;
            }

            return angle;
        }

        var sunImage = document.querySelector('.sun');
        $scope.deg = getAngle(sunImage);

        setInterval(function () {
            var data = getAngle(sunImage);
            $scope.deg = data;
            $scope.$apply();
            chronosjsCourierSupervisor.applyAll("trigger", {
                appName: "EarthCtrl",
                eventName: "rotation",
                data: data
            });
        }, 100);

    }]);


function createHomers(chronosjsCourierSupervisor) {
    var widgetUrl = getCrossDomainWidgetUrl();
    chronosjsCourierSupervisor.createCourier({
        id: "homer1",
        url: widgetUrl,
        top: "0px",
        left: "0px"
    });

    chronosjsCourierSupervisor.createCourier({
        id: "homer2",
        url: widgetUrl,
        top: "350px",
        left: "0px"
    });

    chronosjsCourierSupervisor.createCourier({
        id: "homer3",
        url: widgetUrl,
        top: "700px",
        left: "0px"
    });

    chronosjsCourierSupervisor.createCourier({
        id: "homer4",
        url: widgetUrl,
        top: "0px",
        left: "720px"
    });

    chronosjsCourierSupervisor.createCourier({
        id: "homer5",
        url: widgetUrl,
        top: "700px",
        left: "720px"
    });

    chronosjsCourierSupervisor.createCourier({
        id: "homer6",
        url: widgetUrl,
        top: "0px",
        left: "1290px"
    });

    chronosjsCourierSupervisor.createCourier({
        id: "homer7",
        url: widgetUrl,
        top: "350px",
        left: "1290px"
    });

    chronosjsCourierSupervisor.createCourier({
        id: "homer8",
        url: widgetUrl,
        top: "700px",
        left: "1290px"
    });
}

function getCrossDomainWidgetUrl() {
    var current = window.location.hostname.toLowerCase();
    var different;

    if (-1 !== current.indexOf("localhost")) {
        different = window.location.protocol + "//127.0.0.1";
    }
    else if (-1 !== current.toLowerCase().indexOf("127.0.0.1")) {
        different = window.location.protocol + "//localhost";
    }
    else if (-1 !== current.toLowerCase().indexOf("webyoda.github.io") &&
             -1 !== window.location.protocol.toLowerCase().indexOf("http:")) {
        different = "webyoda.github.io";
    }
    else {
        different = window.location.protocol + "//" + current;
    }

    return different + (window.location.port ? ":" + window.location.port : "") + "/choose-your-channels/demo/earth-distributed/app/components/homer/homer_frame.html";
}