public class emailEngagement {
    @AuraEnabled
    public static List<Object> relatedRecords(String recordId){
        String unId = getAllMetadata(recordId);
           ConnectApi.CdpQueryInput input = new ConnectApi.CdpQueryInput();  
           input.sql = 'SELECT ssot__IndividualId__c, ssot__EngagementChannelActionId__c, ssot__EngagementChannelId__c, ssot__EmailFromName__c FROM ssot__EmailEngagement__dlm Where ssot__IndividualId__c IN (SELECT SourceRecordId__c from UnifiedLinkssotIndividualUnif__dlm where UnifiedRecordId__c=\'' + unId +'\')';
           ConnectApi.CdpQueryOutput Output2 = ConnectApi.CdpQuery.queryANSISql(input);
           System.debug(Output2.data);
           return Output2.data;
       }

    private static String getAllMetadata(String recordId){
        //String recordId='1AL005226404540GAA';
        String qu='SELECT ssot__Id__c from UnifiedssotIndividualUnif__dlm Where Id=\'' + recordId +'\'';
        List<SObject> results = Database.query(qu);
        return results.isEmpty() ? null : (String) results[0].get('ssot__Id__c');
    }
  }