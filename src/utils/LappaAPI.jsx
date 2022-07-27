export const getToken = async (dataForm) => {
     try {
          let response = await fetch(`https://validacion.hgtsa.com.ar/app/login`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(dataForm),
          });
          let data = await response.json();
          return data;
     } catch (error) {
          return "error";
     }
};

export const checkToken = async (tokenData) => {
     try {
          let response = await fetch(`https://validacion.hgtsa.com.ar/app/check`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(tokenData),
          });
          let data = await response.json();
          return data;
     } catch (error) {
          return 'error'
     }
};


export const getDriver = async (driverData) => {
     try {
          let response = await fetch(`https://validacion.hgtsa.com.ar/app/data`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(driverData),
          });
          let data = await response.json();
          return data;
     } catch (error) {
          return 'error'
     }
};

export const getLocations = async (locationData) => {
     try {
          let response = await fetch(`https://validacion.hgtsa.com.ar/app/data`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(locationData),
          });
          let data = await response.json();
          return data;
     } catch (error) {
          return 'error'
     }
};

export const getBills = async (billData) => {
     try {
          let response = await fetch(`https://validacion.hgtsa.com.ar/app/data`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(billData),
          });
          let data = await response.json();
          return data;
     } catch (error) {
          return 'error'
     }
};

export const changeMail = async (mailData) => {
     try {
          let response = await fetch(`https://validacion.hgtsa.com.ar/app/data`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(mailData),
          });
          let data = await response.json();
          return data;
     } catch (error) {
          return 'error'
     }
};

export const changePassword = async (passwordData) => {
     try {
          let response = await fetch(`https://validacion.hgtsa.com.ar/app/data`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(passwordData),
          });
          let data = await response.json();
          return data;
     } catch (error) {
          return 'error'
     }
};

export const resetPassword = async (number) => {
     let response = await fetch(`https://validacion.hgtsa.com.ar/lappa/resetearconntrasena`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(number),
     });
     let data = await response.json();
     return data;
};

export const resetPasswordToken = async (number) => {
     let response = await fetch(`https://validacion.hgtsa.com.ar/lappa/reset_segunda_etapa`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(number),
     });
     let data = await response.json();
     return data;
};


export const getBill = async (id) => {
     let response = await fetch(`https://validacion.hgtsa.com.ar/app/data`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
     });
     let data = await response.json();
     return data;
};

export const sendData = async (dataSend) => {
     let response = await fetch(`https://validacion.hgtsa.com.ar/app/data`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(dataSend),
     });
     let data = await response.json();
     return data;
};


export const sendForm = async (formData) => {
     try {
          let response = await fetch(`https://validacion.hgtsa.com.ar/app/data`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(formData),
          });
          let data = await response.json();
          return data;
     } catch (error) {
          return 'error' 
     }
};

export const getOptions = async () => {
     try {
          let response = await fetch(`https://validacion.hgtsa.com.ar/lappa/tipificacion`, {
               method: "GET",
          });
          let data = await response.json();
          return data;
     } catch (error) {
          return 'error' 
     }
};