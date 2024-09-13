
const cds = require('@sap/cds')

class ProcessorService extends cds.ApplicationService {
// Registering custom event handlers
  init() {
    this.on('showClosedIncidents', async () => {
      const closedIncidents = await SELECT.from(this.entities.Incidents).where({ status_code: 'C' });
      return closedIncidents;
    });

    this.before("UPDATE", "Incidents", (req) => this.onUpdate(req));
    //this.before("CREATE", "Incidents", (req) => this.changeUrgencyDueToSubject(req.data));
    //this.on("CREATE", "Incidents", async(req)=> this.validationError(req.data));

   
    return super.init();
  }

  // async validationError(req) {
  //   const { f1, f2  } = req.data;
  //   console.log("*********"+f1);
  //   if (!f1 || !f2) {
  //     return req.reject(`Please Enter all mandatory fields`);
  //   }
  //   // Proceed with record creation
  // };

  /** Custom Validation */
  async onUpdate (req) {
    const { status_code } = await SELECT.one(req.subject, i => i.status_code).where({ID: req.data.ID})
    if (status_code === 'C')
      return req.reject(`Can't modify a closed incident`)
  }
       
}


// Validation on creation of incidents
//External Module
module.exports = { ProcessorService }
