import axios from 'axios'
import * as express from 'express'
import * as multer from 'multer'
// ===================================================
const app = express();
// Configuring Multer to use files directory for storing files :
// >> this is important because we'll need to access file path
const storage = multer.diskStorage({
  destination: './uploads',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
// ===================================================

export function uploadSuccess({ data }) {
  return {
    type: 'UPLOAD_DOCUMENT_SUCCESS',
    data,
  };
}

export function uploadFail(error) {
  return {
    type: 'UPLOAD_DOCUMENT_FAIL',
    error,
  };
}

export function uploadFileRequest({ fileData, name, extrapayload, URL }) {
  const data = new FormData();
  data.append('file', fileData);
  data.append('name', name);
  data.append('extraPayload', extrapayload);
  data.append('url', URL);

  console.log("user typed /provided name of file", name);
  console.log("name of file", fileData.fieldname);
  console.log("encoding of file", fileData.encoding);
  console.log("mine type of file", fileData.mine);
  console.log("size of file (bytes)", fileData.size);

  return (dispatch) => {
    axios.post('/uploads', data)
      .then(response => {
        dispatch(uploadSuccess(response))
        // ===================================================
        // express route where we receive files from the client and pass it into multer middleware
        app.post('/uploads', upload.single('file'), (req, res) => {
         const file = req.fileData; // file passed from client
         const meta = req.body; // all other values passed from the client, like name, etc..
         const url= req.URL;
         const extraPayload = req.extrapayload;
         // send the data to our REST API
         axios({
            ...extraPayload,
            baseURL: url,
            headers: {'Content-Type': 'multipart/form-data'},
            method: 'post',
            data: {
              file,
              name: meta.name,
            },
          })
           .then(payload => res.status(200).json(payload.data.data))
           .catch((error) => res.status(500).json(error.response.data));
        });
      })
      .catch(error => dispatch(uploadFail(error)))
  };
}
