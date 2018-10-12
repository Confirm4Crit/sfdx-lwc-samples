public with sharing class GalleryApexController {

    @AuraEnabled(Cacheable=true)
    public static ActivityHistory[] getActivityHistory(Id accountId, Integer max) {
        // W-4320896 - workaround integer conversion issues
        max = Integer.valueOf(max);
        List<Account> accounts = [SELECT
            (SELECT StartDateTime, IsHighPriority, Subject, Description, CallDurationInSeconds, WhoId
                FROM ActivityHistories
                WHERE ActivitySubtype = 'Call'
                ORDER BY ActivityDate DESC NULLS LAST, LastModifiedDate DESC
                LIMIT :max)
            FROM Account
            WHERE Id = :accountId];

        List<ActivityHistory> histories = new List<ActivityHistory>();
        for (Account account : accounts) {
            for (ActivityHistory ah : account.ActivityHistories) {
                histories.add(ah);
            }
        }
        return histories;
    }

    @AuraEnabled
    public static void logCall(Id accountId, String subject, String comments, Integer duration) {
        // W-4320896 - workaround integer conversion issues
        duration = Integer.valueOf(duration);
        Task task = new Task(Type='Call',
            ActivityDate=Date.today(),
            TaskSubtype='Call',
            Status='Completed',
            WhatId=accountId,
            Subject=subject,
            CallDurationInSeconds=duration,
            Description=comments
        );
        insert task;
    }
}
