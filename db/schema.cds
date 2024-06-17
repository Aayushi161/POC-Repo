namespace sap.capire.incidents;

using
{
    User,
    cuid,
    managed,
    sap.common.CodeList
}
from '@sap/cds/common';

/**
 * Incidents created by Customers.
 */
entity Incidents : cuid, managed
{
    customer : Association to one Customers;
    title : String
        @title : 'Title';
    urgency : Association to one Urgency default 'M';
    status : Association to one Status default 'N';
    conversation : Composition of many 
    {
        key ID : UUID;
        timestamp : type of managed:createdAt
            @cds.on.insert : $now
            @readonly
            @title : '{i18n>CreatedAt}'
            @Core.Immutable
            @UI.HiddenFilter;
        author : type of managed:createdBy
            @cds.on.insert : $user
            @readonly
            @title : '{i18n>CreatedBy}'
            @Core.Immutable
            @UI.HiddenFilter;
        message : String;
    };
}

/**
 * Customers entitled to create support Incidents.
 */
entity Customers : managed
{
    key ID : String;
    firstName : String;
    lastName : String;
    email : EMailAddress;
    phone : PhoneNumber;
    incidents : Association to many Incidents on incidents.customer = $self;
}

entity Status : CodeList
{
    key code : String enum
    {
        new = 'N';
        assigned = 'A';
        in_process = 'I';
        on_hold = 'H';
        resolved = 'R';
        closed = 'C';
    };
    criticality : Integer;
}

entity Urgency : CodeList
{
    key code : String enum
    {
        high = 'H';
        medium = 'M';
        low = 'L';
    };
}

type EMailAddress : String;

type PhoneNumber : String;

entity Entity1
{
    key ID : UUID;
    Name : String(100);
}
