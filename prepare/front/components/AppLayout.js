import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu } from "antd";

const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>스터디 인피니티</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/login"><a>로그인</a></Link>
                </Menu.Item>
            </Menu>
            {children}
        </div>
    );
};

AppLayout.proptypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;