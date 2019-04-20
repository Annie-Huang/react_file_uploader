import React, { Fragment, useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();

        // Because we got this in server.js: const file = req.files.file;
        formData.append('file', file);
    };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">
                        {filename}
                    </label>
                </div>
            </form>

            <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
        </Fragment>
    )
};

export default FileUpload;
