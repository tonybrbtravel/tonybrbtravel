import { showNotification } from '../components/BRBNotification/ShowNotification';

export const getBase64 = (file: File) => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    resolve(fileReader.result);
  };
  fileReader.onerror = (error) => {
    reject(error);
  };
});

export const errorMessage = (error: Error) => {
  showNotification.error({ title: 'Error', content: error.message });
};

export const dateFormat = (date:Date) => {
  const createdAt = new Date(date);
  const dd = createdAt.getDate();
  const mm = createdAt.getMonth() + 1;
  let displayDate; let
    displayMonth;

  const yyyy = createdAt.getFullYear();
  if (dd < 10) {
    displayDate = `0${dd}`;
  } else {
    displayDate = dd;
  }
  if (mm < 10) {
    displayMonth = `0${mm}`;
  } else {
    displayMonth = mm;
  }
  const formatedDate = `${displayDate}/${displayMonth}/${yyyy}`;

  return formatedDate;
};
