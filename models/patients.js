class Patient {
  constructor() {
    (this.fullname = String),
      (this.email = String),
      (this.age = Number),
      (this.full_address = String),
      (this.address_locality = String),
      (this.address_latlng = { lat: Number, lng: Number }),
      (this.conditions = Object),
      (this.appointments = Object);
  }
}

module.exports = {
  Patient,
};
