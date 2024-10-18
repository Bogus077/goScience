export type UploadMarksFileRequest = {
  formData: FormData;
};

export type UploadMarksTxtRequest = {
  marks: KidMarks[];
};

export type UploadMarksTxtResponse = {
  marks: KidMarks[];
};

export type UploadMarksFileResponse = {
  uploadPath: string;
};

export type DownloadMarksResponse = {
  marksList: UploadMarksTxtResponse[];
  dateList: Date[];
};

export type KidMarks = {
  kid: string;
  subjects: {
    subject: string;
    marks: {
      mark: string | number;
      month: string;
      date: string;
    }[];
    average: string;
  }[];
};
