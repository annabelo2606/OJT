apple.controller('singleLesson', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$q', 'userService', 'Upload', 'server',
    function($rootScope, $scope, $state, $stateParams, $http, $q, userService, Upload, server) {

        $scope.students = [];
        $scope.lessonNum = $stateParams["lessonNum"];
        $scope.lessonId = $stateParams["lessonId"];
        $scope.statuses = [];

        var data = {};
        data.lessonid = $scope.lessonId;
        server.requestPhp(data, "GetStudentsAttendance").then(function(data) {
            $scope.students = data;
        });
        data = {};
        server.requestPhp(data, "GetAttendanceStatuses").then(function(data) {
            $scope.statuses = data;
        });

        $scope.UpdateCheckStudentStatus = function(student, lessonid) {
            var data = {};
            data.lessonid = lessonid;
            data.student = student;
            console.log(data);
            server.requestPhp(data, 'UpdateCheckStudentStatus').then(function(data) {});
        };

        $scope.AddCheckStudentStatus = function(student, lessonid) {
            var data = {};
            data.lessonid = lessonid;
            data.student = student;
            console.log(data);
            server.requestPhp(data, 'AddCheckStudentStatus').then(function(data) {});
        };

        $scope.UpdateStudentAttendanceStatus = function(student) {
            if (student.checkstudentid === null) {
                $scope.AddCheckStudentStatus(student, $scope.lessonId);
            } else {
                $scope.UpdateCheckStudentStatus(student, $scope.lessonId);
            }
        }

        $scope.goBack = function() {
            window.history.back();
        };

    }
]);