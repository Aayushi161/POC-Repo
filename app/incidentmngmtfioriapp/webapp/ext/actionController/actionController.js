sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onClosedInnc: function(oEvent) {
            var that = this;

            $.ajax({
                url: "/odata/v4/processor/showClosedIncidents",
                method: "POST",
                success: function(oData) {
                    console.log(oData);
                    if (oData.value.length > 0) {
                        var sMessage = "Closed Incidents:\n";
                        oData.value.forEach(function(incident) {
                            sMessage += `ID: ${incident.ID}, Title: ${incident.title}, Status: ${incident.status_code}, Urgency: ${incident.urgency_code}\n`;
                        });
                        sap.m.MessageBox.information(sMessage);
                    } else {
                        sap.m.MessageBox.show("No closed incidents found.");
                    }
                },
                error: function(oError) {
                    sap.m.MessageBox.show("Error fetching closed incidents");
                }
            });
        }
    };
});
