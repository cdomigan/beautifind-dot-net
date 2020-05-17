import firebase from "~/lib/firebase";

const api = {
  getService: (businessId, serviceId) => {
    return firebase.firestore().doc('/businesses/'+businessId+'/services/'+serviceId).get().then((docSnapshot)  => {
      return Promise.resolve(docSnapshot.data());
    });
  },
  getServicesForBusiness: (businessId) => {
    return firebase.firestore().collection('/businesses/'+businessId+'/services').get().then((querySnapshot)  => {
      const services = [];
      querySnapshot.forEach(function (doc) {
        const result = doc.data();
        result.id = doc.id;
        services.push(result);
      });
      return Promise.resolve(services);
    });
  },
  deleteService: (businessId, serviceId) => {
    return firebase.firestore().collection('/businesses/'+businessId+'/services').doc(serviceId).delete();
  },
  getBusiness: (businessId) => {
    return firebase.firestore().doc('/businesses/'+businessId).get().then((docSnapshot)  => {
      return Promise.resolve(docSnapshot.data());
    });
  }
}

export default api;