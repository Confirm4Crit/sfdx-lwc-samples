({
    init: function(cmp) {
        // date-time formatter
        cmp._formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
    },

    handleCustomEvent: function(cmp, evt) {
        var now = cmp._formatter.format(Date.now());
        var type = evt.getName();
        var payload = evt.getParam('data') || '';

        var str = cmp.get('v.receivedEvents');
        str = now + ', event type: ' + type + ', payload: ' + payload + '\n' + str;
        cmp.set('v.receivedEvents', str);
    },
});
