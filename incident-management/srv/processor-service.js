const cds = require('@sap/cds')

class ProcessorService extends cds.ApplicationService {
// Registering custom event handlers
  init() {
    this.before("UPDATE", "Incidents", (req) => this.onUpdate(req));
    //this.before("CREATE", "Incidents", (req) => this.changeUrgencyDueToSubject(req.data));
    this.on("CREATE", "Incidents", async(req)=> this.validationError(req.data));

    return super.init();
  }

  validationError(data) {
    const { f1, f2  } = req.data;
    if (!f1 || !f2) {
      throw new Error('Field1 and Field2 are required.');
    }
    // Proceed with record creation
  };

  /** Custom Validation */
  async onUpdate (req) {
    const { status_code } = await SELECT.one(req.subject, i => i.status_code).where({ID: req.data.ID})
    if (status_code === 'C')
      req.subject.status_code= status_code;
      return req.reject(`Can't modify a closed incident`);
  }
}


// Validation on creation of incidents
//External Module
module.exports = { ProcessorService }
