class UploadActions {

  constructor() {
    this.generateActions(
      'uploadSuccess', 'uploadFail'
    );
  }

  uploadFile(data) {
    // You need to return a fn in actions
    // to get alt instance as second parameter to access
    // `alt-resolver` and the ApiClient
    console.log('1111111111111111111111111111111');
    console.log(data.filename);
    console.log(data.filetype);
    return (dispatch, alt) =>
      // We use `alt-resolver` from the boilerplate
      // to indicate the server we need to resolve
      // this data before server side rendering
      alt.resolve(async () => {
        try {
          alt.getActions('requests').start();
          const response = await alt.request({ url: '/users', method: 'POST', data: { content: data }, dataType: 'json' });
          this.uploadSuccess(response);
        } catch (error) {
          this.uploadFail({ error });
        }
        alt.getActions('requests').stop();
      });
  }
}

export default UploadActions;
