class DistanceService{
    constructor(google){
        this.distanceService = new google.maps.DistanceMatrixService();
        this.request =  {
            origins: ["20 Gibson St, South Bunbury WA 6230", "54 Stockley Rd, Bunbury WA 6230"],
            destinations: [{
              lat: -33.35661033966308,
              lng:  115.64092024094921
          }, {
              lat: -32.066713137449916, 
              lng: 115.84644894861471
          }],
            travelMode: 'DRIVING',
          };
    }

    calcDistance = () =>{
        this.distanceService.getDistanceMatrix(this.request).then((response) => {
                // put response
                console.log("here " + response);
            }
        )
    }

}
module.exports.default = DistanceService;