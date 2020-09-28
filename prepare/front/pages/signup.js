import React, {useCallback, useState} from 'react';
import AppLayout from "../components/AppLayout";
import {Checkbox, Form, Input, Button, notification} from "antd";
import styled from 'styled-components';
import Head from "next/head";
import useInput from "../hooks/useInput";
import {signup} from "../util/APIUtils";
import axios from 'axios';
import {ACCESS_TOKEN} from "../constants";

const ErrorMessage = styled.div`
       color: red;
`;

const Signup = () => {
    const [email, onChangeEmail] = useInput('');
    const [user_name, onChangeName] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');


    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, []);

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }


        const joinRequest = {
            name: user_name,
            email: email,
            password: password
        };
        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }

        console.log(joinRequest)
        axios.request({
            method: 'POST',
            url: 'http://localhost:8080/api/user/join',
            headers: headers,
            data: {
                "name": user_name,
                "principal": email,
                "credentials": password
            }
        }).then(response => {
                notification.success({
                    message: 'study App',
                    description: "Thank you! You're successfully registered. Please Login to continue!",
                });
            }).catch(error => {
                console.log(joinRequest)
            notification.error({
                message: 'study App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });

    }, [password, passwordCheck, user_name, email, password]);

    return (
        <>
            <AppLayout>
                <Head>
                    <title>회원가입 | NodeBird</title>
                </Head>
                <Form onFinish={onSubmit}>
                    <div>
                        <label htmlFor="user-id">이메일</label>
                        <br />
                        <Input name="user-id" value={email} required onChange={onChangeEmail} />
                    </div>
                    <div>
                        <label htmlFor="user-name">이름</label>
                        <br />
                        <Input name="user-name" value={user_name} required onChange={onChangeName} />
                    </div>
                    <div>
                        <label htmlFor="user-password">비밀번호</label>
                        <br />
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                    </div>
                    <div>
                        <label htmlFor="user-password-check">비밀번호체크</label>
                        <br />
                        <Input name="user-password-check"
                               type="password"
                               value={passwordCheck} required
                               onChange={onChangePasswordCheck} />
                        {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    </div>
                    <div>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>스터디 활동을 열심히 할 것을 다짐합니다.</Checkbox>
                        {termError && <ErrorMessage>약관에 동의 하셔야 합니다.</ErrorMessage>}
                    </div>
                    <div style={{ margin: 10 }}>
                        <Button type="primary" htmlType="submit">가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
};

export default Signup;