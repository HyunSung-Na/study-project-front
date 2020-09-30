import {Form, Input, Button, notification} from "antd";
import {useCallback} from "react";
import styled from 'styled-components';
import useInput from "../hooks/useInput";
import AppLayout from "../components/AppLayout";
import axios from 'axios';
import {ACCESS_TOKEN} from "../constants";

const ButtonWrapper = styled.div`
    margin-top: 10px;
`;

const FormWrapper = styled(Form)`
    padding: 10px;
    width: 60%;
    margin-left: 20%;
    margin-top: 20px;
`

const Login = () => {
    const [principal, onChangePrincipal] = useInput('');
    const [credentials, onChangeCredentials] = useInput('');

    const onSubmitForm = useCallback(() => {
        console.log(principal, credentials);
        const loginRequest = Object.assign({}, principal, credentials);
        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
        axios.request({
            method: 'POST',
            url: 'http://localhost:8080/api/auth',
            headers: headers,
            data: {
                "principal": principal,
                "credentials": credentials
            }
        }).then(response => {
                localStorage.setItem(ACCESS_TOKEN, "apiToken");
                console.log(response)
            }).catch(error => {
            if(error.status === 401) {
                notification.error({
                    message: 'study App',
                    description: 'Your Username or Password is incorrect. Please try again!'
                });
            } else {
                notification.error({
                    message: 'study App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }, [principal, credentials]);

    return (
        <AppLayout>
            <FormWrapper onFinish={onSubmitForm}>
                <div>
                    <label htmlFor="user-id">이메일</label>
                    <br />
                    <Input name="user-id" value={principal} onChange={onChangePrincipal} required />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <br />
                    <Input name="password" type="password" value={credentials} onChange={onChangeCredentials} required />
                </div>
                <ButtonWrapper>
                    <Button type="primary" htmlType="sumit" loading={false}>로그인</Button>
                </ButtonWrapper>
            </FormWrapper>
        </AppLayout>
    )
}

export default Login;