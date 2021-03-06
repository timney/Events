﻿define(['plugins/router', 'durandal/app', 'data/user', 'knockout', 'services/helpers'],
    function (router, app, user, ko, helpers) {
        var ctor =  {
            router: router,
            hasUser: user.loggedIn,
            username: user.username,
            user: null,
            activate: function () {
                router.map([
                    { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: false },
                    { route: 'login', moduleId: 'viewmodels/login', nav: true },
                    { route: 'signup', moduleId: 'viewmodels/signup', nav: true },
                    { route: 'home', moduleId: 'viewmodels/home', nav: false },
                    { route: 'add', moduleId: 'viewmodels/addevent', nav: false },
                    { route: 'edit/:id', moduleId: 'viewmodels/editevent', nav: false }
                ]).buildNavigationModel();

                Parse.initialize("ARNwlSZzw0NMbXd1NlOU7Zy8zZ33D4qcGr7mQxWM", "MZiPsqFFxJoC9mgikwqYJgnaGi05grAYLuGxsPQv");

                app.on('app:error').then(function(title, message){
                    toastr.error(message, title);
                });
                app.on('app:success').then(function(title, message){
                    toastr.success(message, title);
                });

                var currentUser = user.current();
                if(currentUser != null){
                    ctor.username(currentUser.attributes.username);
                }

                return router.activate();
            },
            logout: function(){
                user.logout();
                this.hasUser(false);
                this.username(null);
                router.navigate('');
            }
        };
        return ctor;
    });