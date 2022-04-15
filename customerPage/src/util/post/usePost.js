import axios from "axios";
import { useState } from "react"

const usePost = (validatePost) => {
    const [values, setValues] = useState({
        title: '',
        organization: '',
        expectation: '',
        expirationDate: '',
        type: '',
        content: ''
    });
    const [errors, setErrors] = useState({});
    const [row, setRow] = useState(1);
    const [files, setFiles] = useState([]);
    const [desc, setDesc] = useState([]);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    const handleTypeChange = e => {
        setValues({
            ...values,
            type: e.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let err = validatePost(values);
        setErrors(err);
        if (Object.keys(err).length === 0) {
            const formData = new FormData();
            for (const element of files) {
                formData.append(`files`, element);
            }
            formData.append("title", values.title);
            formData.append("organization", values.organization);
            formData.append("expectation", values.expectation);
            formData.append("expirationDate", values.expirationDate);
            formData.append("type", values.type);
            formData.append("content", values.content);
            formData.append("description", desc);

            axios({
                method: 'POST', url: "http://localhost:8080/post/create", data: formData, headers: {"Navigation": "http://localhost:3001/createpost-success"}
            }).then((res) => {
                if (res.status == 200) {
                    window.location.href = "http://localhost:3001/createpost-success";
                }

            });
        }
    }

    const handleTxtAreaChange = (e) => {
        const previousRow = e.target.rows;
        e.target.rows = 1;
        const currentRow = (e.target.scrollHeight - 43 + 19) / 19;
        if (previousRow === currentRow) {
            e.target.rows = currentRow;
        }
        setRow(currentRow);
        setValues({
            ...values,
            content: e.target.value
        });
    }

    const handleUpload = (e) => {
        if (e.target.files.length !== 0) {
            let items = [];
            let description = [];
            for (const element of e.target.files) {
                items.push(element);
                description.push('');
            }

            setFiles(items);
            setDesc(description);
        }
    };
    const handleDescChange = (e) => {
        let des = [...desc];
        des[e.target.name] = e.target.value;
        setDesc(des);
    }
    return { values, errors, row, files, desc, handleChange, handleTypeChange, handleSubmit, handleTxtAreaChange, handleUpload, handleDescChange };
};

export default usePost;