class UploadStore {

  constructor() {
    this.bindActions(this.alt.getActions('upload'));

    this.collection = [];
    this.error = null;
  }

/*  onUploadFile(data) {
    console.log('1111111111111111111111111111111');
    console.log(data.filename);
    console.log(data.filetype);
  }*/

  onUploadSuccess({ data }) {
    return {
      type: 'UPLOAD_DOCUMENT_SUCCESS',
      data
    };
  }

  onUploadFail(error) {
    return {
      type: 'UPLOAD_DOCUMENT_SUCCESS',
      error
    };
  }

}

export default UploadStore;
