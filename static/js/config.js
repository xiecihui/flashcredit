/**
 * @introduction  requirejs-config配置
 */

require.config({
    waitSeconds: 0,
    baseUrl: 'static/js',
    urlArgs: "time=" +  (new Date()).getTime(),
    paths: {
        jquery: 'lib/jquery/zepto.min',
        jquerynew: 'lib/jquery/jquery-1.11.3.min',
        selectAdd:'widget/selectadd',
        uai:'widget/uai',
        dropload: 'widget/dropload',
        layerui: 'controller/layerUi'
    }
});
