class Appointment {
  constructor() {
    (this.modality = ""),
      (this.date = ""),
      (this.specialty = ""),
      (this.appt_address = ""),
      (this.appt_address_latlng = {
        lat: "",
        lng: "",
      });
  }
}

export default Appointment;
