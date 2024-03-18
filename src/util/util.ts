import { Platform } from "react-native";

export const createFormData = (photo: any, body:any = {}) => {
    const data = new FormData();
  
    const img = photo.assets[0];
  
    data.append('image', {
      name: img.fileName,
      type: img.type,
      uri: Platform.OS === 'ios' ? img.uri.replace('file://', '') : img.uri,
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    return data;
  };