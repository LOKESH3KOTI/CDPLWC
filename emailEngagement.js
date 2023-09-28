import { LightningElement, wire,track, api} from 'lwc';
import relatedRecords from '@salesforce/apex/emailEngagement.relatedRecords';
import { CurrentPageReference } from 'lightning/navigation';
const COLUMNS = [ 
    {label: 'Action Id', fieldName: 'ssot__EngagementChannelActionId__c', type: 'text'},
    {label: 'Email From Address', fieldName: 'ssot__EmailFromAddr__c', type: 'text'},
    {label: 'Engagement Date', fieldName: 'ssot__EngagementDateTm__c', type: 'text'},
    {label: 'Subject Line', fieldName: 'ssot__SubjectLineTxt__c', type: 'text'}
];
export default class EmailEngagement extends LightningElement 
 {
    columns=COLUMNS;
    @api recordId;
    @track conError;
    @track record=[];
    @api cdpRecordId;
    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        console.log(JSON.stringify(currentPageReference));
        // const unifId=document.evaluate("//*[@class='slds-form-element__static']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
        // console.log('unification',unifId);
        if(currentPageReference && currentPageReference.attributes.cdpRecordId)
        {
            const recordId= currentPageReference.attributes.cdpRecordId;
            console.log('recordId',recordId);
            console.log('unification');
            relatedRecords({recordId})
        .then(result=>{
            this.record=[...result];
            console.log(result);
            var keys=Object.keys(result[0]);
            console.log('keys',keys);
            for(var j=0;j<result.length;j++)
 {

 result[j][keys[2]]=(result[j][keys[2]]).substring(0,10);

 }
        })
        .catch(error=>{
            this.conError=error;
            console.log('error',error);
        })
    
        }
    }
    }