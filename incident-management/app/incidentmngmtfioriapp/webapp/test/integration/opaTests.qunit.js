sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/sap/incidentmngmtfioriapp/test/integration/FirstJourney',
		'com/sap/incidentmngmtfioriapp/test/integration/pages/IncidentsList',
		'com/sap/incidentmngmtfioriapp/test/integration/pages/IncidentsObjectPage'
    ],
    function(JourneyRunner, opaJourney, IncidentsList, IncidentsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/sap/incidentmngmtfioriapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheIncidentsList: IncidentsList,
					onTheIncidentsObjectPage: IncidentsObjectPage
                }
            },
            opaJourney.run
        );
    }
);