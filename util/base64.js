// encode to base 64

export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            let extention = file.name.split('.').pop();
            let base64 = fileReader.result.split(',')[1];
            resolve(base64 + '_' + extention);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};


