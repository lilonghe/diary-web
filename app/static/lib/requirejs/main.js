require.config({
    paths: {
        jquery: '/static/lib/jquery.min',
        config: '/static/js/config/config',
        utils: '/static/js/utils'
    },
    shim:{
        'config':{
            exports: 'config'
        },
        'utils':{
            exports: 'utils'
        }
    }
});

require(['../../page/'+MODULE_CONFIG.module+'/'+MODULE_CONFIG.page], function() { });