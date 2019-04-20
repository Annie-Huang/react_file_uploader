import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');

    // What sends back from the backend will be an object with: fileName and fielPath (from server.js)
    // res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    const [uploadedFile, setUploadedFile] = useState({});

    const [message, setMessage] = useState('');

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();

        // Because we got this in server.js: const file = req.files.file;
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const {fileName, filePath} = res.data;
            setUploadedFile({fileName, filePath});

        } catch(err) {

            if(err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                // Trying to print the msg from server.js: res.status(400).json({msg: 'No file uploaded'});
                setMessage(err.response.data.msg);
            }
        }
    };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                        {filename}
                    </label>
                </div>

                <input
                    type="submit"
                    value="Upload"
                    className="btn btn-primary btn-block mt-4"
                />
            </form>

            { uploadedFile ? (
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <h3 className="text-center">{ uploadedFile.fileName }</h3>
                        <img style={{width: '100%'}} src={uploadedFile.filePath} alt="" />
                    </div>
                </div>
            ): null }
        </Fragment>
    )
};

export default FileUpload;
